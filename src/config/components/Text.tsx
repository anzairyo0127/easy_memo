import React, { ChangeEvent, useEffect, useState } from "react";

const { configApi } = window;

const TextSetting: React.FC = () => {
  const [tabChar, setTabChar] = useState("");
  const [tabNum, setTabNum] = useState("2");

  useEffect(() => {
    (async () => {
      setTabChar(await configApi.get("tab_char") as string);
      setTabNum(await configApi.get("tab_num") as string);
    })();
  }, [tabChar, tabNum]);

  const onChangeForTabChar = async (self: ChangeEvent<HTMLInputElement>) => {
    const v = self.target.value;
    await configApi.set("tab_char", v);
    setTabChar(v);
    return;
  };

  const onChangeForTabNum = async (self: ChangeEvent<HTMLInputElement>) => {
    const v = self.target.value;
    const n = Number(v) || 2;
    await configApi.set("tab_num", n);
    setTabNum(v);
  };

  return (
    <>
      <p>
        タブキーを押したとき: {tabChar}
        <label htmlFor="tab-char-tab"><input type="radio" onChange={onChangeForTabChar} value="tab" checked={tabChar === "tab"} id="tab-char-tab" />タブ文字</label>
        <label htmlFor="tab-char-space" ><input type="radio" onChange={onChangeForTabChar} value="space" checked={tabChar === "space"} id="tab-char-space" />空白文字</label>
      </p>
      <p>
        何個分: {tabNum}<label htmlFor="tab-num"><input type="text" onChange={onChangeForTabNum} value={tabNum} id="tab-num" pattern="[0-9]+"/></label>
      </p>
    </>
  );
};

export default TextSetting;
