import path from 'path';
import { app, BrowserWindow, session, Menu } from 'electron';

import { configStore, fileStoreInit } from "./store";
import { setGlobalShortCut } from "./shortcuts";
import createMenu from "./menuBar";
import { I18n } from '../locales/language';
import { confirmFileChange } from "./file";
import { setConfig } from "./config";
import { initConfig } from "./init";

const indexHtml = "dist/index.html";
const configHtml = "dist/config.html";

export const title = "EZ-Memo";
export let mainWindow: BrowserWindow;
export let configWindow: BrowserWindow;
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

const setConfigWindow = (parent: BrowserWindow) => {
  return new BrowserWindow({
    show: false,
    modal: true,
    parent: parent,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    frame: false,
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
      await session.defaultSession.loadExtension(path.resolve("./electron_extension"), { allowFileAccess: true, });
      console.log('React Devtools loaded...');
    } catch (e) {
      console.error(e);
    }
  }

/* 
  if (!configStore.has("local")) {
    configStore.set("local", app.getLocale());
  };
*/

  initConfig(configStore);
  configWindow = setConfigWindow(mainWindow);
  configWindow.loadFile(configHtml);
  setConfig(configWindow);

  i18n = new I18n({lang: configStore.get("local")});
  Menu.setApplicationMenu(createMenu(i18n));
  fileStoreInit();
  setGlobalShortCut();
  createWindow();
  configWindow.title = "";
  configWindow.hide();
  if (process.env.NODE_ENV === 'development') {
    configWindow.webContents.openDevTools({ mode: "detach" });
  };
});

app.once('window-all-closed', () => app.quit());
