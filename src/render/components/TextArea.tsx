import React, {CSSProperties ,useEffect} from "react";

import { useMemoContext, useMemoDispatchContext } from "./Contexts/MemoContext";

const { tool, fileApi, configApi } = window;

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

  const onKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    memoDispatch({type: "pushKey", keyEvent: e});
    switch (e.code) {
      case "Tab":
        e.preventDefault();
        const tabChar = await configApi.get("tab_char") === "tab" ? "\t" : " ";
        document.execCommand("insertText", false, (tabChar).repeat(await configApi.get("tab_num")));
        return;
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