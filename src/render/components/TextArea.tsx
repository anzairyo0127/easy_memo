import React, {CSSProperties} from "react";

import { useMemoContext, useMemoDispatchContext } from "./Context";

const TextArea: React.FC = () => {
  const style: CSSProperties = {
    // backgroundColor : "#000000",
  };
  const state = useMemoContext();
  const dispatch = useMemoDispatchContext();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: "setFileText", fileText: e.target.value });
  };

  const onDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    const file = e.dataTransfer.files[0];
    console.log(file)
    window.fileApi.loadFileData(file.path);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
        value={state.fileText} 
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