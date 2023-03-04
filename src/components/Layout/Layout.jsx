import React from "react";
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";

const Container = styled.div`
  max-width: 1240px;
  padding: 0 20px;
  margin: 0 auto;
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <Navbar />
      {children}
    </Container>
  );
};

export default Layout;
