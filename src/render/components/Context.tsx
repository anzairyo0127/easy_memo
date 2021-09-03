import React, { useReducer, createContext, Dispatch, useContext, useEffect } from "react";

import { MemoState, Action, FileInfoType } from "../../interfaces";

const { fileApi } = window;

type MemoDispatch = Dispatch<Action>;

const reducer = (state: MemoState, action: Action): MemoState => {
  const c = Object.assign({}, state);
  switch (action.type) {
    case "setFileText":
      c.fileText = action.fileText;
      return c;
    case "setFileEncodeType":
      c.fileEncodeType = action.fileEncodeType;
      return c;
    default:
      return state;
  }
};

const defaultState = { fileText: "", fileEncodeType: "UTF-8" };

const MemoContext = createContext<MemoState | undefined>(undefined)

const MemoDispatchContext = createContext<MemoDispatch | undefined>(undefined);

export const useMemoContext = () => {
  const context = useContext(MemoContext);
  if (!context) throw new Error(`nothing MemoContext = ${context}`);
  return context;
};

export const useMemoDispatchContext = () => {
  const context = useContext(MemoDispatchContext);
  if (!context) throw new Error(`nothing MemoDispatchContext = ${context}`);
  return context;
};

export const Context: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  useEffect(() => {
    fileApi.readFileData((fileInfo: FileInfoType) => {
      dispatch({ type: "setFileText", fileText: fileInfo.fileText });
      dispatch({ type: "setFileEncodeType", fileEncodeType: fileInfo.encodeType })
    });
    fileApi.saveFileData();
  }, []);

  useEffect(() => {
    fileApi.setText(state.fileText);
  }, [state.fileText]);

  useEffect(() => {
    fileApi.setEncodeType(state.fileEncodeType);
  }, [state.fileEncodeType]);

  return (
    <MemoDispatchContext.Provider value={dispatch}>
      <MemoContext.Provider value={state}>
        {children}
      </MemoContext.Provider>
    </MemoDispatchContext.Provider>
  )
};

export default Context;
