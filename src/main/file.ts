import fs from "fs";
import crypto from "crypto";

import { ipcMain, dialog } from "electron";
import chardet from "chardet";
import iconv from "iconv-lite";
import { isBinary, isText } from "istextorbinary";

import { FILE_EVENTS } from "../interfaces";
import { mainWindow, title } from "./main";
import { fileStore } from "./store";

const setFilePath = (filePath: string) => {
  fileStore.set("filePath", filePath);
  mainWindow.setTitle(`${title} - ${filePath}`);
};

export const openFile = (filePath: string) => {
  try {
    // if (!isText(filePath)) throw Error(`${filePath} is not text file`);
    const fileTextBuffer = fs.readFileSync(filePath);
    const encodeType = chardet.detect(fileTextBuffer) as string;
    const fileText = iconv.decode(fileTextBuffer, encodeType);
    fileStore.set("encodeType", encodeType);
    fileStore.set("fileText", fileText);
    fileStore.set("fileTextAsHash", crypto.createHash("sha256").update(fileText).digest("hex"));
    setFilePath(filePath);
    mainWindow.webContents.send(FILE_EVENTS.OPEN_DIALOG, {fileText, encodeType});
  } catch (e) {
    console.log(e);
    dialog.showErrorBox("ファイル読み込みエラー", 
`ファイルの読み込みに失敗しました。
-------message-------
${e}`)
  };
};

export const openFileFromMenu = async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openFile", "showHiddenFiles"],
    filters: [
      {name: "text", extensions: ["txt", "rtf", "text", "json", "yml", "yaml", "md", "htm", "html", "css", "scss", "sass", "js", "ts", "vue", "tsx", "csv", "xml", "asp", "rs", "py", "c", "cpp", "coffee", "cs", "go", "java", "xhtml", "jsx", "lua", "sql", "pl", "php", "scala", "vbs"]},
      {name: "all", extensions: ["*"]}
    ]
  });
  if (result.canceled) return;
  const filePath = result.filePaths[0];
  openFile(filePath);
};

export const saveFileFromMenu = (isSaveAs:boolean) => {
  mainWindow.webContents.send(FILE_EVENTS.SAVE_DIALOG, isSaveAs);
};

ipcMain.on(FILE_EVENTS.TEXT_CHANGE, (_, fileText) => {
  fileStore.set("fileText", fileText);
});

ipcMain.on(FILE_EVENTS.SAVE_FILE, async (_, isSaveAs:boolean) => {
  const fileText = fileStore.get("fileText");
  let fileEncodeType = fileStore.get("encodeType");
  if (!fileEncodeType) {
    fileStore.set("encodeType", "UTF-8");
    fileEncodeType = "UTF-8";
    mainWindow.webContents.send(FILE_EVENTS.OPEN_DIALOG, {fileText, encodeType: fileEncodeType});
  }
  let filePath = fileStore.get("filePath");
  if (isSaveAs || !filePath) {
    const result = await dialog.showSaveDialog(mainWindow, {
      properties: ["showOverwriteConfirmation"],
      filters: [{name: "all", extensions: ["*"]}]
    });
    if (result.canceled) {
      return;
    } else {
      filePath = result.filePath as string;
    }
  };
  try {
    fs.writeFileSync(filePath, iconv.encode(fileText, fileEncodeType));
    fileStore.set("fileTextAsHash", crypto.createHash("sha256").update(fileText).digest("hex"));
    setFilePath(filePath);
  } catch(e) {
    console.log(e);
    dialog.showErrorBox("ファイル書き込みエラー", 
    `ファイルの書き込みに失敗しました。
-------message-------
${e}`)
  };
});

ipcMain.on(FILE_EVENTS.SET_ENCODE_TYPE, (event, encodeType: string) => {
  fileStore.set("encodeType", encodeType);
  const fileText = fileStore.get("fileText");
  const encodeText = iconv.decode(Buffer.from(fileText), encodeType, {});
  fileStore.set("fileText", encodeText);
  mainWindow.webContents.send(FILE_EVENTS.OPEN_DIALOG, {fileText: encodeText, encodeType});
});

ipcMain.handle(FILE_EVENTS.GET_ENCODE_TYPE, (event) => {
  return fileStore.get("encodeType");
});

ipcMain.handle(FILE_EVENTS.LOAD_FILE, (event, filePath: string) => {
  openFile(filePath);
});