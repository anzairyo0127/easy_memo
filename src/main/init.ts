import ElectronStore from "electron-store";
import { app } from 'electron';

import { ConfigStore } from "../interfaces";

export const initConfig = (configStore: ElectronStore<ConfigStore>) => {
  configStore.set("local", app.getLocale());
  configStore.set("tab_char", "space");
  configStore.set("tab_num", 2);
  return null;
};
