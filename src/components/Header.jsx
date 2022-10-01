import React, { useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Logo } from "../assets";
import authServcice from "../services/authService";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    authServcice.getCurrentUser() ? true : false
  );

  const handleLogout = () => {
    setIsLoggedIn(false);
    authServcice.logout();
  };

  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="/">
          <img src={Logo} alt="Logo" width={"250px"} />
        </Navbar.Brand>

        {isLoggedIn && <Button onClick={handleLogout}>Logout</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
