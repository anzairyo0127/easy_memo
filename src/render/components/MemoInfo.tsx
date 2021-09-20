import { resolve } from "path";
import React, { useEffect, useState } from "react";

// import CharCount from "../svg/char_count.svg";
// import CharCount2 from "../svg/char_count2.svg";

import { useMemoContext, useMemoDispatchContext } from "./Contexts/MemoContext";

const { fileApi, tool } = window;

const keycodes = require("keycodes");

const EncodeTypeSelector: React.FC = () => {
  const memoState = useMemoContext();
  const memoDispatch = useMemoDispatchContext();

  const encodeTypes = [
    'UTF-8',        'UTF-16 LE',
    'UTF-16 BE',    'UTF-32 LE',
    'UTF-32 BE',    'ISO-2022-JP',
    'ISO-2022-KR',  'ISO-2022-CN',
    'Shift_JIS',    'Big5',
    'EUC-JP',       'EUC-KR',
    'GB18030',      'ISO-8859-1',
    'ISO-8859-2',   'ISO-8859-5',
    'ISO-8859-6',   'ISO-8859-7',
    'ISO-8859-8',   'ISO-8859-9',
    'windows-1250', 'windows-1251',
    'windows-1252', 'windows-1253',
    'windows-1254', 'windows-1255',
    'windows-1256', 'KOI8-R'
  ];

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fileEncodeType = e.target.value;
    await new Promise(resolve => {
      resolve(memoDispatch({type: "setFileEncodeType", fileEncodeType}));
    }).then(async () => {
      await fileApi.resetEncodeText();
    });
  };

  return (
    <select className="memo-info-encode-type-selector" onChange={onChange} value={memoState.fileEncodeType}>
      {encodeTypes.map(encodeType => {
        return (<option key={`option-encodetype-${encodeType}`} value={encodeType} >{encodeType}</option>)
      })}
    </select>
  );
};


const MemoInfo: React.FC = () => {
  const memoState = useMemoContext();
  const [keyHistory, setKeyHistory] = useState<string[]>([])
  useEffect(() => {
    if (keyHistory.length > 4) {
      keyHistory.shift();
    };
    keyHistory.push(keycodes(memoState.keyEvent?.keyCode) as string)
    setKeyHistory(keyHistory);
  }, [memoState.keyEvent])

  return (
    <div className="content-foot">
      <p className="memo-info">
        <span>{keyHistory.join(" ")}</span>
        <EncodeTypeSelector />
        <span>{memoState.fileText.length}</span>
        <span>{memoState.fileText.replace(/\s/g, "").length}</span>
      </p>
    </div>
  )
};

export default MemoInfo;