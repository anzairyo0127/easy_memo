import { ipcMain, BrowserWindow } from "electron";

import * as I from "../interfaces";

export let configWindowShow: () => void;
export let configWindowHide: () => void;

export const setConfig = (configWindow: BrowserWindow) => {
  configWindowShow = () => {
    configWindow.show();
  };

  configWindowHide = () => {
    configWindow.hide();
  };

  ipcMain.handle(I.CONFIG_EVENTS.WINDOW_SHOW, (_) => {
    configWindowShow();
  });

  ipcMain.handle(I.CONFIG_EVENTS.WINDOW_HIDE, (_) => {
    configWindowHide();
  });

  

};
