import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--ads-v2-color-bg);
  min-height: 0;
  width: 100%;
  position: relative;

  .scroll-container {
    height: calc(100vh - 50px - 112px);
    overflow: auto;
  }
`;

export default function UserListPage() {
  // const { carousel, footer, header } = props;

  return (
    <Container
      className="upgrade-page-container"
      data-testid="t--upgrade-page-container"
    >
      用户
    </Container>
  );
}

