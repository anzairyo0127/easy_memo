import React from "react";

import { useMemoContext, useMemoDispatchContext } from "./Context";

const TextArea: React.FC = () => {
  const state = useMemoContext();
  const dispatch = useMemoDispatchContext();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: "setFileText", fileText: e.target.value });
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
        spellCheck={false} 
      />
    </div>
  )
};

export default TextArea;