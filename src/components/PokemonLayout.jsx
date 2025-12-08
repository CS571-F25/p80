import React from "react";
import { Link, Outlet } from "react-router";
import { Container, Nav, Navbar } from "react-bootstrap";
import pokemon_logo from "../assets/Poké_Ball_icon.svg";

const PokemonLayout = () => {
  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .game-navbar {
          background: #000000 !important;
          border-bottom: 2px solid #5b2e87;
          box-shadow: 0 0 15px #5b2e87;
        }

        .game-nav-link {
          font-family: 'Press Start 2P', cursive;
          font-size: 12px;
          color: #ffffff !important;
          text-shadow:
            0 0 2px #fff,
            0 0 6px #5b2e87,
            0 0 12px #5b2e87;
          margin: 0 18px;
          transition: 0.2s ease;
        }

        .game-nav-link:hover {
          color: #e0aaff !important;
          text-shadow:
            0 0 4px #fff,
            0 0 10px #8a42d8,
            0 0 18px #8a42d8;
          transform: scale(1.1);
        }

        .game-logo {
          filter: drop-shadow(0 0 6px #8a42d8);
        }

        body {
          background: radial-gradient(circle at center, #1a1a1a 0%, #000000 80%);
          min-height: 100vh;
          margin: 0;
          padding: 0;
        }

        .container {
          color: white;
        }
      `}</style>

      <Navbar className="game-navbar" variant="dark">
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
              className="game-logo d-inline-block align-top"
            />
          </Navbar.Brand>

          <Nav style={{ display: "flex", alignItems: "center" }}>
            <Nav.Link as={Link} to="/" className="game-nav-link">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/choose-pokemon" className="game-nav-link">
              Select Pokemon
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/view-pokemon-team"
              className="game-nav-link"
            >
              My Team
            </Nav.Link>

            <Nav.Link as={Link} to="/battle-history" className="game-nav-link">
              Battle History
            </Nav.Link>

            <Nav.Link as={Link} to="/random-team" className="game-nav-link">
              Random Team
            </Nav.Link>

            <Nav.Link as={Link} to="/type-matchups" className="game-nav-link">
              Type Chart
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
};

export default PokemonLayout;
