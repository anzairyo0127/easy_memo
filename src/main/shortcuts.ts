import { globalShortcut } from "electron"

export const setGlobalShortCut = () => {
};

export const resetGlobalShortCut = () => {
  globalShortcut.unregisterAll();
};
