import { app, Menu } from 'electron';
import { openFileFromMenu, saveFileFromMenu } from "./file";
import { I18n } from '../language';

const createMenu = (i18n: I18n) => {
  const nameSpace = "menu_bar";
  const fileMenu = () => {
    const label = "file_menu";
    return {
      label: i18n.t(`${nameSpace}.${label}.label`),
      submenu: [
        {
          label: i18n.t(`${nameSpace}.${label}.open`),
          accelerator: 'CmdOrCtrl+O',
          click: () => { openFileFromMenu() },
        },
        {
          label: i18n.t(`${nameSpace}.${label}.save`),
          accelerator: 'CmdOrCtrl+S',
          click: () => { saveFileFromMenu(false) },
        },
        {
          label: i18n.t(`${nameSpace}.${label}.save_as`),
          accelerator: 'CmdOrCtrl+Shift+S',
          click: () => { saveFileFromMenu(true) },
        },
        {
          label: i18n.t(`${nameSpace}.${label}.close`),
          accelerator: 'CmdOrCtrl+Q',
          click: () => { app.quit() },
        }
      ]
    }
  };

  const toolMenu = () => {
    const label = "tool_menu";
    return {
      label: i18n.t(`${nameSpace}.${label}.label`),
      submenu: [
        {
          label: i18n.t(`${nameSpace}.${label}.gen_uuid`),
          click: () => { console.log("aaaaaaa") },
        }
      ]
    }
  };

  return Menu.buildFromTemplate(
    [
      fileMenu(),
      toolMenu(),
    ]
  );
};

export default createMenu;
