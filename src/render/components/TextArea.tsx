import React, {CSSProperties} from "react";

import { useMemoContext, useMemoDispatchContext } from "./Contexts/MemoContext";

const TextArea: React.FC = () => {
  const style: CSSProperties = {
    // backgroundColor : "#000000",
  };
  const memoState = useMemoContext();
  const memoDispatch = useMemoDispatchContext();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    memoDispatch({ type: "setFileText", fileText: e.target.value });
  };

  const onDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    const file = e.dataTransfer.files[0];
    window.fileApi.loadFileData(file.path);
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