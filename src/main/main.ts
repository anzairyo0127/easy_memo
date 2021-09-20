import os from 'os';
import path from 'path';
import { app, BrowserWindow, session, Menu, dialog } from 'electron';

import { fileStore, configStore, fileStoreInit } from "./store";
import { setGlobalShortCut } from "./shortcuts";
import createMenu from "./menuBar";
import { I18n } from '../locales/language';
import { confirmFileChange } from "./file";
 
const extPath = "./electron_extension";
const indexHtml = "dist/index.html";

export const title = "EZ-Memo";
export let mainWindow: BrowserWindow;
export let i18n: I18n;

const setBrowserWindow = () => {
  return new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    title,
  });
};

const createWindow = () => {
  mainWindow = setBrowserWindow();
  mainWindow.on("close", (e) => {
    if (confirmFileChange()) {
      return;
    } else {
      e.preventDefault();
    };
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  };
  mainWindow.loadFile(indexHtml);
};

app.whenReady().then(async () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      await session.defaultSession.loadExtension(path.join(os.homedir(), extPath), { allowFileAccess: true, });
      console.log('React Devtools loaded...');
    } catch (e) {
      console.error(e);
    }
  }

  if (!configStore.has("local")) {
    configStore.set("local", app.getLocale());
  };

  i18n = new I18n({lang: configStore.get("local")});
  Menu.setApplicationMenu(createMenu(i18n));
  fileStoreInit();
  setGlobalShortCut();
  createWindow();
});

app.once('window-all-closed', () => app.quit());
