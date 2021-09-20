import { MemoState, Action, } from "../../../interfaces";
import { createContext, Dispatch, useContext } from "react";

type MemoDispatch = Dispatch<Action>;
export const MemoContext = createContext<MemoState | undefined>(undefined)
export const MemoDispatchContext = createContext<MemoDispatch | undefined>(undefined);

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

export const defaultMemoState = { fileText: "", fileEncodeType: "UTF-8", keyHistory: [], keyEvent: null  };
export const memoStateReducer = (state: MemoState, action: Action): MemoState => {
  const c = Object.assign({}, state);
  switch (action.type) {
    case "setFileText":
      c.fileText = action.fileText;
      return c;
    case "setFileEncodeType":
      c.fileEncodeType = action.fileEncodeType;
      return c;
    case "pushKey":
      c.keyEvent = action.keyEvent;
      return c;
    default:
      return state;
  }
};
