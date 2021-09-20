import { contextBridge, ipcRenderer } from "electron";
import uuid from "uuid";
import crypto from "crypto";
import { I18n } from "../locales/language";

import { FILE_EVENTS, CONFIG_EVENTS, FileInfoType } from "../interfaces";

(async () => {
  const local = await ipcRenderer.invoke(CONFIG_EVENTS.GET, "local");
  const i18n = new I18n({lang: local});
  contextBridge.exposeInMainWorld(
    "fileApi", {
      readFileData: (callBack: Function) => ipcRenderer.on(FILE_EVENTS.OPEN_DIALOG, (_, fileInfo: FileInfoType) => callBack(fileInfo)),
      saveFileData: () => { 
        ipcRenderer.on(FILE_EVENTS.SAVE_DIALOG, (_, isSaveAs: boolean) => {
          ipcRenderer.send(FILE_EVENTS.SAVE_FILE, isSaveAs);
        });
      },
      setText: (text: string) => {
        ipcRenderer.send(FILE_EVENTS.TEXT_CHANGE, text);
      },
      setEncodeType: async (encodeType: string) => {
        await ipcRenderer.invoke(FILE_EVENTS.SET_ENCODE_TYPE, encodeType);
      },
      getEncodeType: async (callBack: Function) => {
        callBack(await ipcRenderer.invoke(FILE_EVENTS.GET_ENCODE_TYPE))
      },
      loadFileData: async (filePath: string) => {  
        await ipcRenderer.invoke(FILE_EVENTS.LOAD_FILE, filePath)
      },
      resetEncodeText: async () => {
        await ipcRenderer.invoke(FILE_EVENTS.RE_ENCODE_TEXT)
      },
    }, 
  );
  
  contextBridge.exposeInMainWorld(
    "configApi", {
      get: async (key: string) => await ipcRenderer.invoke(CONFIG_EVENTS.GET, key),
      set: async (key: string, value: any) => await ipcRenderer.invoke(CONFIG_EVENTS.SET, key, value),
      has: async (key: string) => await ipcRenderer.invoke(CONFIG_EVENTS.HAS, key),
    }
  );
  
  contextBridge.exposeInMainWorld(
    "tool", {
      generateUuidv4: () => uuid.v4(),
      toUpperCase: (str: string) => str.toUpperCase(),
      toLowerCase: (str: string) => str.toLowerCase(),
      toHash256: (str: string) => crypto.createHash("sha256").update(str).digest('hex'),
      deleteNewline: (str: string) => str.replace(/\r?\n/g, ""),
      deleteSpace: (str: string) => str.replace("[ 　]", ""),
    }
  );

  contextBridge.exposeInMainWorld(
    "i18n", {
      t: (key: string) => i18n.t(key)
    }
  )
})();
