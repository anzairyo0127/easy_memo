export enum FILE_EVENTS {
  OPEN_DIALOG = "open_dialog",
  SAVE_DIALOG = "save_dialog",
  OPEN_FILE = "open_file",
  SAVE_FILE = "save_file"
};

export interface FileInfoType {
  fileText: string;
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
};

type ChangeFileTextAction = {
  type: "changeFileText",
  fileText: string;
};

export type Action = ChangeFileTextAction;

export interface FileStore{
  filePath: string;
  fileText: string;
};
