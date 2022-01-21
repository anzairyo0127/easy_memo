import React from "react";
import { HashRouter, Routes, Link } from "react-router-dom";
import { Route } from "react-router";

import styled from "styled-components";

import Main from "./Main";
import Language from "./Language";
import Text from "./Text";

const { configApi, i18n } = window;

const ConfigApp: React.FC = () => {
  const menus = [
    {
      link: "",
      key: "top",
      element: <Main />
    },
    {
      link: "language",
      key: "language",
      element: <Language />
    },
    {
      link: "text",
      key: "text",
      element: <Text />
    },
  ];

  const ConfigBody = styled.div`
  `;

  const ConfigNav = styled.nav`
    float: left;
    width: 24%;
  `;

  const ConfigContent = styled.div`
    float: left;
    width: 76%;
  `;

  const ConfigNavButton = styled.button`
  `;

  return (
    <ConfigBody>
      <HashRouter>
        <ConfigNav>
          {menus.map(menu => <p key={`p_${menu.key}`}><Link key={`link_${menu.key}`} to={`/${menu.link}`}>{i18n.t(`config.config_menu.${menu.key}.label`)}</Link></p>)}
          <ConfigNavButton onClick={configApi.windowHide}>
            {i18n.t("config.config_menu.close.label")}
          </ConfigNavButton>
        </ConfigNav>
        <ConfigContent>
          <Routes>
            {menus.map(menu => <Route key={`route_${menu.key}`} path={`/${menu.link}`} element={menu.element} />)}
          </Routes>
        </ConfigContent>
      </HashRouter>
    </ConfigBody>
  );
};

export default ConfigApp;
