import React from "react";

import { useMemoContext } from "./Context";

const MemoInfo: React.FC = () => {
  const state = useMemoContext();

  return (
    <div className="content-foot">
      <p className="memo-info">
        <span>Encode:{!!state.fileEncodeType ? state.fileEncodeType : "-"}</span>
        <span>count:{state.fileText.length}</span>
        <span>count(without white space):{state.fileText.replace(/\s/g, "").length}</span>
      </p>
    </div>
  )
};

export default MemoInfo;