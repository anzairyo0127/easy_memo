import { ipcMain } from "electron";
import ElectronStore from "electron-store";

import { FileStore, ConfigStore, CONFIG_EVENTS } from "../interfaces";

export const fileStore = new ElectronStore<FileStore>();
export const configStore = new ElectronStore<ConfigStore>();

export const fileStoreInit = () => {
  fileStore.delete("fileText");
  fileStore.delete("filePath");
  fileStore.delete("fileTextAsHash");
  fileStore.delete("encodeType");
};

ipcMain.handle(CONFIG_EVENTS.GET, (event, key: string) => {
  return configStore.get(key);
});

ipcMain.handle(CONFIG_EVENTS.SET, (event, key: string, value: string) => {
  return configStore.set(key, value);
});

ipcMain.handle(CONFIG_EVENTS.HAS, (event, key: string) => {
  return configStore.has(key);
});
