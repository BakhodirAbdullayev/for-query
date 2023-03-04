import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";

const Container = styled.div`
  max-width: 1240px;
  padding: 0 20px;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 100px;
  position: fixed;
  z-index: 99;
  background: #fff;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;
const Bottom = styled.div`
  width: 100%;
  height: 80px;
`;
const NavLogo = styled(Link)`
  font-size: 30px;
  font-weight: 600;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;
const Links = styled(Right)`
  transition: 0.3s;
  @media screen and (max-width: 500px) {
    width: 100%;
    position: fixed;
    top: 80px;
    left: ${(p) => (p.toggle ? 0 : "-100%")};
    height: calc(100vh - 80px);
    flex-direction: column;
    background-color: #e5b8f4;
    z-index: 999;
    padding-top: 40px;
  }
`;

const NavbarLink = styled(NavLink)`
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 3px;

  &.active {
    color: #005036;
    background-color: #a5bcc6;
  }
`;
const BtnGrp = styled(Right)``;
const Toggle = styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 26px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: none;
  place-items: center;
  @media screen and (max-width: 500px) {
    display: grid;
  }
`;

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const changeToggle = () => {
    setToggle((p) => !p);
  };

  return (
    <>
      <Container>
        <NavLogo to="/">Logo</NavLogo>

        <Right>
          <Links toggle={toggle}>
            <NavbarLink onClick={changeToggle} to="/users">
              Users
            </NavbarLink>
            <NavbarLink onClick={changeToggle} to="/lists">
              Lists
            </NavbarLink>
            <NavbarLink onClick={changeToggle} to="/createuser">
              Create
            </NavbarLink>
          </Links>

          <BtnGrp>
            {/* <Dark></Dark> */}
            <Toggle onClick={changeToggle}>
              <HiOutlineBars3 />
            </Toggle>
          </BtnGrp>
        </Right>
      </Container>
      <Bottom></Bottom>
    </>
  );
};

export default Navbar;
