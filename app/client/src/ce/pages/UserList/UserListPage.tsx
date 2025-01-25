import React from "react";
import styled from "styled-components";
import {Table, Button, Input, Text} from "@appsmith/ads";
import {createMessage, UPGRADE} from "../../constants/messages";
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


export const OperationWrapper = styled.div`
  max-width: 40rem;
  display: flex;
  gap: 16px; /* 设置子元素之间的间距，例如 16px */
  margin-bottom: 24px;
`;

const columns = [
  {
    title: "用户名",
    dataIndex: "name",
  },
  {
    title: "邮箱",
    dataIndex: "email",
  },
  {
    title: "操作",
    dataIndex: "address",
    render: (value: { city: string }) => `${value.city}`,
    sortBy: "city",
  },
];

const fakeData = [
  {
    key: "1",
    name: "Ash",
    email: "Ash@163.com",
    address: { city: "New York" },
  },
  {
    key: "2",
    name: "Jane",
    email: "Jane@163.com",
    address: { city: "Los Angeles" },
  },
  {
    key: "3",
    name: "Doe",
    email: "Doe@163.com",
    address: { city: "Chicago" },
  },
];

export default function UserListPage() {
  // const { carousel, footer, header } = props;
  const onClickNewUser =()=>{
    console.log("onClickNewUser")
  }


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
        <OperationWrapper>
          <Input  size="md"  className="space-y-4" placeholder={"输入搜索"} ></Input>
          <Button data-testid="t--button-upgrade" onClick={onClickNewUser} size="md">
            搜索
          </Button>
          <Button data-testid="t--button-upgrade" onClick={onClickNewUser} size="md">
            新增用户
          </Button>
        </OperationWrapper>
        <Table columns={columns} data={fakeData} isSortable />
      </SettingsFormWrapper>
    </Wrapper>
  );
}

