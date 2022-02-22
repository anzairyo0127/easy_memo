import React from "react";
import { HashRouter, Routes, Link } from "react-router-dom";
import { Route } from "react-router";

import styled from "styled-components";

import Main from "./Main";
import Language from "./Language";
import Text from "./Text";

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
`;

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
    display: flex;
  `;

  const ConfigNav = styled.nav`
    min-width: 10em;
    max-width: 18em;
    overflow-wrap: break-word;
    border-right: 1px solid #000000;
  `;

  const ConfigContent = styled.div`
    width: 100%;
  `;

  const ConfigNavButton = styled.div`
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  `;

  return (
    <ConfigBody>
      <HashRouter>
        <ConfigNav>
          {menus.map(menu => <p key={`p_${menu.key}`}><StyledLink key={`link_${menu.key}`} to={`/${menu.link}`}>{i18n.t(`config.config_menu.${menu.key}.label`)}</StyledLink></p>)}
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
