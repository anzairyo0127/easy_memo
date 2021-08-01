import React, { useEffect } from "react";

import { useMemoContext, useMemoDispatchContext } from "./Context";

const TextArea: React.FC = () => {
  const state = useMemoContext();
  const dispatch = useMemoDispatchContext();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: "changeFileText", fileText: e.target.value });
  };

  return (
    <div className="content-body">
      <textarea value={state.fileText} onChange={onChange} spellCheck={false} />
    </div>
  )
};

export default TextArea;