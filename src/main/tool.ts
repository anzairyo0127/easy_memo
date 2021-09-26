import { ipcMain, dialog } from "electron";
import { v4 } from "uuid";

import { mainWindow } from "./main";
import { TOOL_EVENTS } from "../interfaces";

export const insertUuid = () => {
  mainWindow.webContents.send(TOOL_EVENTS.INSET_TEXT, v4())
};