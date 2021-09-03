import { globalShortcut, BrowserWindow } from "electron"

export const setGlobalShortCut = () => {
};

export const resetGlobalShortCut = () => {
  globalShortcut.unregisterAll();
};
