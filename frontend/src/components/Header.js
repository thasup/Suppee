import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>Suppee</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => navigate("/cart")}>
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/login")}>
                <i className="fas fa-user"></i> Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
