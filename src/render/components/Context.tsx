import React, { useReducer, useEffect } from "react";

import { defaultMemoState, memoStateReducer } from "./Contexts/MemoContext";
import { FileInfoType } from "../../interfaces";
import { MemoContext, MemoDispatchContext, } from "./Contexts/MemoContext";

const { fileApi, tool } = window;

export const Context: React.FC = ({ children }) => {
  const [memoState, dispatch] = useReducer(memoStateReducer, defaultMemoState);
  useEffect(() => {
    fileApi.readFileData((fileInfo: FileInfoType) => {
      dispatch({ type: "setFileText", fileText: fileInfo.fileText });
      dispatch({ type: "setFileEncodeType", fileEncodeType: fileInfo.encodeType })
    });
    fileApi.saveFileData();
  }, []);

  useEffect(() => {
    fileApi.setText(memoState.fileText);
  }, [memoState.fileText]);

  useEffect(() => {
    fileApi.setEncodeType(memoState.fileEncodeType);
  }, [memoState.fileEncodeType]);

  return (
    <MemoDispatchContext.Provider value={dispatch}>
      <MemoContext.Provider value={memoState}>
        {children}
      </MemoContext.Provider>
    </MemoDispatchContext.Provider>
  )
};

export default Context;
