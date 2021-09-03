import { I18n } from "./language";

export enum FILE_EVENTS {
  OPEN_DIALOG = "open_dialog",
  SAVE_DIALOG = "save_dialog",
  OPEN_FILE = "open_file",
  SAVE_FILE = "save_file",
  LOAD_FILE = "load_file",
  TEXT_CHANGE = "text_change",
  SET_ENCODE_TYPE = "set_encode_type",
  GET_ENCODE_TYPE = "get_encode_type",
};

export enum TOOL_EVENTS {
  GEN_UUID_FROM_MENU = "gen_uuid_from_menu",
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
  setEncodeType: (encodeType: string) => void;
  loadFileData: (filePath: string) => void,
};

interface ConfigApi {
  get: (key: string) => any;
  set: (key: string, value: any) => void;
  has: (key: string) => boolean;
  i18n: I18n,
}

declare global {
  interface Window {
    fileApi: FileApi;
    configApi: ConfigApi;
  }
}

export interface MemoState {
  fileText: string;
  fileEncodeType: string;
};

type SetFileTextAction = {
  type: "setFileText",
  fileText: string;
};

type SetFileEncodeType = {
  type: "setFileEncodeType",
  fileEncodeType: string;
}

export type Action = SetFileTextAction | SetFileEncodeType;

export interface FileStore{
  filePath: string;
  fileText: string;
  fileTextAsHash: string;
  encodeType: string;
};
