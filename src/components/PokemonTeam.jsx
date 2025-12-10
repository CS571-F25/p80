import React from "react";
import PokemonCard from "./PokemonCard";
import EmptySlot from "./EmptySlot";
import { useEffect, useState, useContext } from "react";
import PokemonContext from "../context/pokemonContext";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PokemonTeam = ({ pokemon }) => {
  const [selectedPokemon, setSelectedPokemon] = useContext(PokemonContext);
  const [pokemonToDisplay, setPokemonToDisplay] = useState([]);
  const navigate = useNavigate();

  const filterPokemon = () => {
    const newFilter = pokemon.filter((p) =>
      selectedPokemon.some((s) => s === p.id)
    );
    setPokemonToDisplay(newFilter);
  };

  useEffect(() => {
    filterPokemon();
    console.log(selectedPokemon);
  }, [pokemon, selectedPokemon]);

  const emptySlots = 6 - pokemonToDisplay.length;

  return (
    <div>
      <Container>
        <h1
          style={{
            textAlign: "center",
            margin: "30px",
            fontFamily: "'Press Start 2P', cursive",
            color: "#d19cff",
            fontSize: "32px",
            textTransform: "uppercase",
            textShadow: `
              0 0 3px #fff,
              0 0 8px #8a42d8,
              0 0 14px #8a42d8
            `,
          }}
        >
          Your Team
        </h1>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button
            onClick={() => navigate("/battle")}
            style={{
              padding: "15px 30px",
              borderRadius: "12px",
              border: "3px solid #8a42d8",
              background: "linear-gradient(135deg, #4b1b73, #8a42d8)",
              color: "white",
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "14px",
              textShadow: "0 0 3px #fff, 0 0 6px #d19cff",
              boxShadow: "0 0 8px #8a42d8",
              cursor: "pointer",
            }}
          >
            ⚔️ Battle Now!
          </button>
        </div>

        <Row style={{ justifyContent: "center" }}>
          {pokemonToDisplay.map((p) => (
            <Col
              key={p.id}
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <PokemonCard {...p} t={"Remove Pokémon"} />
            </Col>
          ))}
          {Array.from({ length: emptySlots }).map((_, index) => (
            <Col
              key={`empty-${index}`}
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <EmptySlot />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default PokemonTeam;
