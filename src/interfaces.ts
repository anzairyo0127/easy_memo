export enum FILE_EVENTS {
  OPEN_DIALOG = "open_dialog",
  SAVE_DIALOG = "save_dialog",
  OPEN_FILE = "open_file",
  SAVE_FILE = "save_file",
  TEXT_CHANGE = "text_change",
};

export interface FileInfoType {
  fileText: string;
  encodeType: string;
};

interface FileApi {
  readFileData: (callBack: Function) => void;
  saveFileData: () => void;
  setText: (fileText: string) => void;
};

declare global {
  interface Window {
    fileApi: FileApi;
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
