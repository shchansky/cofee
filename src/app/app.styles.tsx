import styled from "styled-components";

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const Header = styled.h1``;

export const Body = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 200px 1fr;
`;

export const Content = styled.div``;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 4px;

  a {
    text-decoration: none;
    color: black;
  }

  .active {
    color: red;
  }
`;
