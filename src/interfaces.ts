export enum FILE_EVENTS {
  CREATE_NEW = "create_new_file",
  OPEN_DIALOG = "open_dialog",
  SAVE_DIALOG = "save_dialog",
  OPEN_FILE = "open_file",
  SAVE_FILE = "save_file",
  LOAD_FILE = "load_file",
  TEXT_CHANGE = "text_change",
  SET_ENCODE_TYPE = "set_encode_type",
  GET_ENCODE_TYPE = "get_encode_type",
  RE_ENCODE_TEXT = "re_encode_text",
};

export enum CONFIG_EVENTS {
  GET = "config_get",
  SET = "config_set",
  HAS = "config_has",
}

export enum TOOL_EVENTS {
  INSET_TEXT = "insert_text",
}

export interface FileInfoType {
  fileText: string;
  encodeType: string;
};

interface FileApi {
  readFileData: (callBack: Function) => void;
  saveFileData: () => void;
  setText: (fileText: string) => void;
  getEncodeType: Promise<(callBack: Function) => void>;
  setEncodeType: (encodeType: string) => Promise<void>;
  loadFileData: (filePath: string) => Promise<void>,
  resetEncodeText: () => Promise<void>,
};

interface ConfigApi {
  get: (key: string) => any;
  set: (key: string, value: any) => void;
  has: (key: string) => boolean;
}

interface ToolApi {
  onToolInsertText: (callback: Function) => void;
}

interface I18nApi {
  t: (key: string) => string;
}

declare global {
  interface Window {
    fileApi: FileApi;
    configApi: ConfigApi;
    tool: ToolApi;
    i18n: I18nApi;
  }
}

export interface MemoState {
  fileText: string;
  fileEncodeType: string;
  keyEvent: React.KeyboardEvent<HTMLTextAreaElement> | null;
};

type SetFileTextAction = {
  type: "setFileText",
  fileText: string;
};

type SetFileEncodeType = {
  type: "setFileEncodeType",
  fileEncodeType: string;
};

type PushKey = {
  type: "pushKey",
  keyEvent: React.KeyboardEvent<HTMLTextAreaElement>;
};

export type Action = SetFileTextAction | SetFileEncodeType | PushKey;

export interface FileStore {
  filePath: string;
  fileText: string;
  fileTextAsHash: string;
  encodeType: string;
};

export interface ConfigStore {
  local: string;
};
