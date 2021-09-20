import { ipcMain, dialog } from "electron";
import uuid from "uuid";

import { mainWindow } from "./main";
import { TOOL_EVENTS } from "../interfaces";

const insertUuid = () => {
  mainWindow.webContents.send(TOOL_EVENTS.GEN_UUID_FROM_MENU, uuid.v4())
};