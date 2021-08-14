import { contextBridge, ipcRenderer } from "electron";
import { FILE_EVENTS, FileInfoType } from "./interfaces";

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
  }
);
