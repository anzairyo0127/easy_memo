import React, {CSSProperties ,useEffect} from "react";

import { useMemoContext, useMemoDispatchContext } from "./Contexts/MemoContext";

const { tool, fileApi } = window;

const TextArea: React.FC = () => {
  const style: CSSProperties = {
    // backgroundColor : "#000000",
  };
  const memoState = useMemoContext();
  const memoDispatch = useMemoDispatchContext();

  useEffect(() => {
    tool.onToolInsertText((text: string) => { document.execCommand("insertText", false, text); });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    memoDispatch({ type: "setFileText", fileText: e.target.value });
  };

  const onDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    const file = e.dataTransfer.files[0];
    fileApi.loadFileData(file.path);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    memoDispatch({type: "pushKey", keyEvent: e});
    switch (e.code) {
      case "Tab":
        const space = 4;
        document.execCommand("insertText", false, " ".repeat(space));
      default:
        return;
    };
  };

  return (
    <div className="content-body">
      <textarea 
        value={memoState.fileText} 
        onChange={onChange} 
        onKeyDown={onKeyDown}
        onDrop={onDrop}
        spellCheck={false} 
        style={style}
      />
    </div>
  )
};

export default TextArea;