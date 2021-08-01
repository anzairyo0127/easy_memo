import fs from "fs";

import { ipcMain, dialog } from "electron";

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
    const fileText = fs.readFileSync(filePath, { encoding: "utf-8" });
    fileStore.set("fileText", fileText);
    setFilePath(filePath);  
    mainWindow.webContents.send(FILE_EVENTS.OPEN_DIALOG, fileText);
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

ipcMain.on(FILE_EVENTS.SAVE_FILE, async (_, fileText: string, isSaveAs:boolean) => {
  fileStore.set("fileText", fileText);
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
    fs.writeFileSync(filePath, fileText, { encoding: "utf-8" });
    setFilePath(filePath);
  } catch(e) {
    console.log(e);
    dialog.showErrorBox("ファイル書き込みエラー", 
    `ファイルの書き込みに失敗しました。
-------debug_message-------
${e}`)
  };
});
