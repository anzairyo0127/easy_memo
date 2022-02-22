import React from "react";

const { i18n } = window;

const MainSetting: React.FC = () => {
  return (
    <div>
      <p>{i18n.t("config.main_page.main")}</p>
    </div>
  );
};

export default MainSetting;
