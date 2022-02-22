/*未使用 */
import { contextBridge, ipcRenderer } from "electron";

import { CONFIG_EVENTS, } from "../interfaces";

contextBridge.exposeInMainWorld(
  "configApi", {
    windowShow: async () => {
      await ipcRenderer.invoke(CONFIG_EVENTS.WINDOW_SHOW);
    },
    windowHide: async () => {
      await ipcRenderer.invoke(CONFIG_EVENTS.WINDOW_HIDE);
    },
    get: async (key: string) => {
      return await ipcRenderer.invoke(CONFIG_EVENTS.GET, key);
    },
    set: async (key: string, value: any) => {
      await ipcRenderer.invoke(CONFIG_EVENTS.SET, key, value);
    },
    has: async (key: string) => {
      return await ipcRenderer.invoke(CONFIG_EVENTS.HAS, key);
    },

  }
)
