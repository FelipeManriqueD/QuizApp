import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

const marginDefault = 0;

const NavBar = styled.nav`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  display: flex;
`;

const MenuLink = styled.div`
  text-decoration: none;
  margin: ${marginDefault} 10px;
`;
const Menu = (props) => {
    console.log(props)
  return (
    <React.Fragment>
      <div className="header item">
        <Link to="/">Logo</Link>
      </div>
      <div className="right item">
        <Link to="/admin">
          <MenuLink>Login</MenuLink>
        </Link>
        <Link to="/quiz">
          <MenuLink>Quiz</MenuLink>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Menu;
