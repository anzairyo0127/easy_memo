import React from "react";

import { useMemoContext, useMemoDispatchContext } from "./Context";

const EncodeTypeSelector: React.FC = () => {
  const state = useMemoContext();
  const dispatch = useMemoDispatchContext();

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

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fileEncodeType = e.target.value;
    dispatch({type: "setFileEncodeType", fileEncodeType});
  };

  return (
    <select className="memo-info-encode-type-selector" onChange={onChange} defaultValue={"UTF-8"}>
      {encodeTypes.map(encodeType => {
        return (<option key={`option-encodetype-${encodeType}`} value={encodeType} >{encodeType}</option>)
      })}
    </select>
  );
};


const MemoInfo: React.FC = () => {
  const state = useMemoContext();

  return (
    <div className="content-foot">
      <p className="memo-info">
        <span>Encode:{!!state.fileEncodeType ? state.fileEncodeType : "-"}</span>
        <EncodeTypeSelector />
        <span>count:{state.fileText.length}</span>
        <span>count(without white space):{state.fileText.replace(/\s/g, "").length}</span>
      </p>
    </div>
  )
};

export default MemoInfo;