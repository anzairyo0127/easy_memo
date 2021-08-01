import { contextBridge, ipcRenderer } from "electron";
import { FILE_EVENTS } from "./interfaces";
import ElectronStore from "electron-store";

const s = new ElectronStore<{text:string}>();

contextBridge.exposeInMainWorld(
  "fileApi", {
    readFileData: (callBack: Function) => ipcRenderer.on(FILE_EVENTS.OPEN_DIALOG, (_, fileText: string) => callBack(fileText)),
    saveFileData: () => { 
      ipcRenderer.on(FILE_EVENTS.SAVE_DIALOG, (_, isSaveAs: boolean) => {
        ipcRenderer.send(FILE_EVENTS.SAVE_FILE, s.get("text"), isSaveAs);
      });
    },
    setText: (text: string) => {s.set("text", text)},
  }
);
