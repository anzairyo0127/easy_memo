import ElectronStore from "electron-store";

import { FileStore } from "../interfaces";

export const fileStore = new ElectronStore<FileStore>();

export const storeInit = () => {
  fileStore.clear();
};
