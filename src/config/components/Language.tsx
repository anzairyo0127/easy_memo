import React, { ChangeEvent, useEffect, useState } from "react";

const { configApi } = window;

const LanguageSetting: React.FC = () => {
  const [local, setLocal] = useState("");

  useEffect(() => {
    (async () => {
      setLocal(await configApi.get("local") as string);
    })();
  }, [local]);

  const onChange = async (self: ChangeEvent<HTMLInputElement>) => {
    const v = self.target.value;
    await configApi.set("local", v);
    setLocal(v);
  };

  return (
    <>
      <p>Language Setup. lang: {local}</p>
      <p>Reboot is required for adaptation.</p>
      <label htmlFor="language-ja"><input type="radio" onChange={onChange} value="ja" checked={local === "ja"} id="language-ja" />日本語</label>
      <label htmlFor="language-en" ><input type="radio" onChange={onChange} value="en" checked={local === "en"} id="language-en" />English</label>
    </>
  );
};

export default LanguageSetting;
