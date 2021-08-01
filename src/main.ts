import os from 'os';
import path from 'path';

import { app, BrowserWindow, session, Menu, } from 'electron';
import ElectronStore from "electron-store";

import { openFileFromMenu, saveFileFromMenu } from "./menu/file";

import { FileStore } from "./interfaces";

const extPath = '.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.14.0_0';
export const title = "EZ-Memo";

export let mainWindow: BrowserWindow;
export const fileStore = new ElectronStore<FileStore>();

const menu = Menu.buildFromTemplate(
  [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open..',
          accelerator: 'CmdOrCtrl+O',
          click: () => { openFileFromMenu() },
        },
        {
          label: 'Save..',
          accelerator: 'CmdOrCtrl+S',
          click: () => { saveFileFromMenu(false) },
        },
        {
          label: 'SaveAs..',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: () => { saveFileFromMenu(true) },
        }
      ]
    }
  ]
);

Menu.setApplicationMenu(menu);

const createWindow = () => {
  fileStore.clear();

  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    title,
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  };
  mainWindow.loadFile('dist/index.html');
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
  createWindow();
});

app.once('window-all-closed', () => app.quit());
