import fs from "fs";
import crypto from "crypto";

import { ipcMain, dialog } from "electron";
import chardet from "chardet";
import iconv from "iconv-lite";

import { FILE_EVENTS } from "../interfaces";
import { mainWindow, fileStore, title } from "../main";

const setFilePath = (filePath: string) => {
  fileStore.set("filePath", filePath);
  mainWindow.setTitle(`${title} - ${filePath}`);
};

export const openFileFromMenu = async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openFile"],
    filters: [{name: "all", extensions: ["*"]}]
  });
  if (result.canceled) return;
  const filePath = result.filePaths[0];
  try {
    const fileTextBuffer = fs.readFileSync(filePath);
    const encodeType =  chardet.detect(fileTextBuffer);
    const fileText = iconv.decode(fileTextBuffer, encodeType as string);
    fileStore.set("encodeType", encodeType as string);
    fileStore.set("fileText", fileText);
    fileStore.set("fileTextAsHash", crypto.createHash("sha256").update(fileText).digest("hex"));
    setFilePath(filePath);
    mainWindow.webContents.send(FILE_EVENTS.OPEN_DIALOG, {fileText, encodeType});
  } catch (e) {
    console.log(e);
    dialog.showErrorBox("ファイル読み込みエラー", `ファイルの読み込みに失敗しました。対応していないファイルかもしれません。
-------debug_message-------
${e}`)
  };
};

export const saveFileFromMenu = (isSaveAs:boolean) => {
  mainWindow.webContents.send(FILE_EVENTS.SAVE_DIALOG, isSaveAs);
};

ipcMain.on(FILE_EVENTS.TEXT_CHANGE, (_, fileText) => {
  fileStore.set("fileText", fileText);
});

ipcMain.on(FILE_EVENTS.SAVE_FILE, async (_, isSaveAs:boolean) => {
  const fileText = fileStore.get("fileText");
  const fileEncodeType = fileStore.get("encodeType");
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
-------debug_message-------
${e}`)
  };
});
