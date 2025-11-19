import React from "react";
import { Link, Outlet } from "react-router";
import { Container, Nav, Navbar } from "react-bootstrap";
import pokemon_logo from "../assets/Poké_Ball_icon.svg";

const PokemonLayout = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Navbar.Brand as={Link} to="/">
            <img
              alt="Pokemon Logo"
              src={pokemon_logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
          <Nav style={{ display: "flex", alignItems: "center" }}>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/choose-pokemon">
              Select Pokemon
            </Nav.Link>
            <Nav.Link as={Link} to="/view-pokemon-team">
              My Team
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default PokemonLayout;
