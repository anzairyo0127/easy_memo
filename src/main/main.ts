import os from 'os';
import path from 'path';
import crypto from "crypto";
import { app, BrowserWindow, session, Menu, dialog } from 'electron';
import settings from "electron-app-settings";

import { fileStore, storeInit } from "./store";
import { setGlobalShortCut } from "./shortcuts";
import createMenu from "./menuBar";
import { I18n } from '../language';

const extPath = '.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.14.0_0';
const indexHtml ='dist/index.html';

export const title = "EZ-Memo";
export let mainWindow: BrowserWindow;

const onElectronClose = (e: Electron.Event) => {
  const nowText = fileStore.get("fileText");
  const nowTextHash = crypto.createHash("sha256").update(nowText).digest("hex");
  const fileTextAsHash = fileStore.get("fileTextAsHash");
  if (nowTextHash !== fileTextAsHash) {
    const choice = dialog.showMessageBoxSync(mainWindow, {
      type: "question",
      buttons: ["Yes", "No"],
      message: "Are you sure you want to discard changes?",
    });
    if (choice) {
      e.preventDefault();
    } else {
      return;
    }
  }
};

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

  mainWindow.on("close", onElectronClose);

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

  if (!settings.has("local")) {
    settings.set("local", app.getLocale());
  }
  const i18n = new I18n({lang: settings.get("local")});
  Menu.setApplicationMenu(createMenu(i18n));
  storeInit();
  setGlobalShortCut();
  createWindow();
});

app.once('window-all-closed', () => app.quit());
