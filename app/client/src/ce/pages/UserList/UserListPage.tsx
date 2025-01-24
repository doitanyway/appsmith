import React from "react";
import styled from "styled-components";
import {Callout, Divider, Icon, Text, Tooltip} from "@appsmith/ads";
import {
  ADMIN_AUTH_SETTINGS_SUBTITLE,
  ADMIN_AUTH_SETTINGS_TITLE,
  AUTHENTICATION_METHOD_ENABLED,
  createMessage
} from "../../constants/messages";
import EnterpriseTag from "../../../components/EnterpriseTag";
import {ActionButton} from "../../../pages/AdminSettings/Authentication/AuthPage";

// export const Container = styled.div`
//   background-color: var(--ads-v2-color-bg);
//   padding: var(--ads-v2-spaces-7);
//   min-height: 0;
//   width: 100%;
//   position: relative;
//
//   .scroll-container {
//     height: calc(100vh - 50px - 112px);
//     overflow: auto;
//   }
// `;

export const Wrapper = styled.div`
  flex-basis: calc(100% - ${(props) => props.theme.homePage.leftPane.width}px);
  padding: var(--ads-v2-spaces-7);
  height: calc(100vh - ${(props) => props.theme.homePage.header}px);
  overflow: auto;
`;

export const SettingsFormWrapper = styled.div`
  max-width: 40rem;
`;

export const SettingsHeader = styled(Text)``;

export const SettingsSubHeader = styled(Text)`
  margin-bottom: 24px;
`;



export default function UserListPage() {
  // const { carousel, footer, header } = props;

  return (
    <Wrapper>
      <SettingsFormWrapper>
        <SettingsHeader
          color="var(--ads-v2-color-fg-emphasis-plus)"
          kind="heading-l"
          renderAs="h1"
        >
          用户
        </SettingsHeader>
        <SettingsSubHeader
          color="var(--ads-v2-color-fg-emphasis)"
          kind="body-m"
          renderAs="h2"
        >
          用户配置
        </SettingsSubHeader>
      </SettingsFormWrapper>
    </Wrapper>
  );
}

