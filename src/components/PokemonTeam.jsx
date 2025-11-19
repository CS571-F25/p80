import React from "react";
import PokemonCard from "./PokemonCard";
import EmptySlot from "./EmptySlot";
import { useEffect, useState, useContext } from "react";
import PokemonContext from "../context/pokemonContext";
import { Container, Row, Col } from "react-bootstrap";

const PokemonTeam = ({ pokemon }) => {
  const [selectedPokemon, setSelectedPokemon] = useContext(PokemonContext);
  const [pokemonToDisplay, setPokemonToDisplay] = useState([]);

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
            color: "#ad343e",
            fontWeight: "bold",
            fontSize: "48px",
            textTransform: "uppercase",
          }}
        >
          Your Team
        </h1>
        <Row>
          {pokemonToDisplay.map((p) => (
            <Col key={p.id} xs={12} sm={12} md={6} lg={4} xl={4}>
              <PokemonCard {...p} t={"Remove Pokémon"} />
            </Col>
          ))}
          {Array.from({ length: emptySlots }).map((_, index) => (
            <Col key={`empty-${index}`} xs={12} sm={12} md={6} lg={4} xl={4}>
              <EmptySlot />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default PokemonTeam;
