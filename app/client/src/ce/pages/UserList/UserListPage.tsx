import React, {useState,useEffect} from "react";
import styled from "styled-components";
import {
  Table,
  Button,
  Input,
  Text,
  Modal,
  ModalHeader,
  ModalBody,
  Callout,
  ModalFooter,
  ModalContent
} from "@appsmith/ads";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import UserApi from "ce/api/UserApi";
import {AUTOCOMMIT_CONFIRM_DISABLE_MESSAGE, AUTOCOMMIT_DISABLE, createMessage} from "../../constants/messages";

const StyledModalContent = styled(ModalContent)`
  width: 640px;
`;

const StyledModalHeader = styled(ModalHeader)`
  margin: 0;
`;
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

export const PageWrapper = styled.div`
  max-width: 40rem;
  display: flex;
  gap: 16px; /* 设置子元素之间的间距，例如 16px */
  margin-top: 24px;
`;

interface User {
  key: string;
  name: string;
  email: string;
}

export default function UserListPage() {
  // const { carousel, footer, header } = props;
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);  // 假设接口返回总条数
  const [users, setUsers] = useState<User[]>([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [isAutocommitDisableModalOpen,setIsAutocommitDisableModalOpen] = useState(true)

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
      dataIndex: "actions",
      render: (index:any, record:any) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            size="sm"
            onClick={() => handleEdit(record)}
            aria-label="编辑用户"
            isIconButton
            startIcon="user-2"
          >
          </Button>
          <Button
            size="sm"
            onClick={() => handleDelete(record)}
            color="danger"
            aria-label="删除用户"
            isIconButton
            kind="error"
            startIcon="close-modal"
          >
          </Button>
        </div>
      ),
    },
  ];
  const onClickSearchUser = () => {
    setPageIndex(1);
    fetchUserPageList()
  };

  const handleEdit = (record:any) => {
    console.log("编辑用户:", record);
  };

  const handleDelete = (record:any) => {
    console.log("删除用户:", record);
  };

  const onPageChange =(page:any,pageSize:any)=>{
    console.log(`page change ${page} ,${pageSize} `);
    setPageIndex(page)
  }

  async function fetchUserPageList() {
    try {
      // 调用接口，传入 PageListRequest 参数 { page, size, email }
      const response = await UserApi.getUserPageList({
        page: pageIndex,
        size: pageSize,
        email: searchEmail,
      });
      // 假设接口返回的数据结构为 { data: 用户数组, total: 总条数 }
      console.log("fetchUserPageList",response.data)
      // @ts-ignore
      setPageIndex(response.data?.page)
      // @ts-ignore
      setTotal(response.data?.total)
      // @ts-ignore
      const us = response.data?.users.map(v =>{
        return {
          key: v.id,
          name: v.username,
          email: v.email
        }
      })
      setUsers(us)
    } catch (error) {
      console.error("获取用户列表失败：", error);
    }
  }

  useEffect(() => {
    fetchUserPageList();
  }, [pageIndex]);

  function handleModalOpenChange(open: boolean) {
    console.log("onModalClose",open)
  }

  let isToggleAutocommitLoading;
  const handleDisableAutocommit = () => {

  } ;
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
          <Input  size="md"  aria-label="Add" className="space-y-4"
                  placeholder={"输入搜索"}
                  value={searchEmail}
                  onChange={(value) => setSearchEmail(value)}
          ></Input>
          <Button data-testid="t--button-upgrade" onClick={() => onClickSearchUser()} size="md">
            搜索
          </Button>
        </OperationWrapper>
        <Table columns={columns} data={users} isSortable />
        <PageWrapper>
          <Pagination className="ant-pagination" current={pageIndex}  pageSize={pageSize} total={total} onChange={onPageChange} />
        </PageWrapper>
      </SettingsFormWrapper>
      <Modal
        onOpenChange={handleModalOpenChange}
        open={isAutocommitDisableModalOpen}
      >
        <StyledModalContent data-testid="t--autocommit-git-modal">
          <StyledModalHeader>
             标题
          </StyledModalHeader>
          <ModalBody>
            <Callout kind="warning">
              <Text>文字</Text>
            </Callout>
          </ModalBody>
          <ModalFooter>
            <Button
              className="t--autocommit-modal-cta-button"
              isLoading={isToggleAutocommitLoading}
              kind="primary"
              onClick={handleDisableAutocommit}
              size="md"
            >
              按钮
            </Button>
          </ModalFooter>
        </StyledModalContent>
      </Modal>
    </Wrapper>
  );
}

