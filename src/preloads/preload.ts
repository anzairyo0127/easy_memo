import { contextBridge, ipcRenderer } from "electron";
import settings from "electron-app-settings"
import uuid from "uuid";
import crypto from "crypto";

import { I18n } from "../language";
import { FILE_EVENTS, FileInfoType } from "../interfaces";

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
    setEncodeType: (encodeType: string) => {
      ipcRenderer.send(FILE_EVENTS.SET_ENCODE_TYPE, encodeType);
    },
    getEncodeType: async (callBack: Function) => {
      callBack(await ipcRenderer.invoke(FILE_EVENTS.GET_ENCODE_TYPE))
    },
    loadFileData: async (filePath: string) => {  
      await ipcRenderer.invoke(FILE_EVENTS.LOAD_FILE, filePath)
    }
  }, 
);

contextBridge.exposeInMainWorld(
  "configApi", {
    get: (key: string) => settings.get(key),
    set: (key: string, value: any) => settings.set(key, value),
    has: (key: string) => settings.has(key),
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
