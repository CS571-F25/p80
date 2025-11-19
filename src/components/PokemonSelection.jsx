import React from "react";
import PokemonCard from "./PokemonCard";
import { useEffect, useState, useContext } from "react";
import PokemonContext from "../context/pokemonContext";
import { Container, Row, Col, Pagination } from "react-bootstrap";

const PokemonSelection = ({ pokemon }) => {
  const [selectedPokemon, setSelectedPokemon] = useContext(PokemonContext);
  const [pokemonToDisplay, setPokemonToDisplay] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const filteredPokemon = () => {
    const newFilter = pokemon.filter(
      (p) => !selectedPokemon.some((s) => s === p.id)
    );
    setPokemonToDisplay(newFilter);
  };

  useEffect(() => {
    filteredPokemon();
    setCurrentPage(1);
  }, [pokemon, selectedPokemon]);

  const totalPages = Math.ceil(pokemonToDisplay.length / pageSize);
  const startIdx = (currentPage - 1) * pageSize;
  const paginatedPokemon = pokemonToDisplay.slice(
    startIdx,
    startIdx + pageSize
  );

  return (
    <div>
      <Container>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {paginatedPokemon.map((p) => (
            <Col key={p.id} xs={12} sm={12} md={4} lg={4} xl={3}>
              <PokemonCard {...p} t={"Add Pokémon"} />
            </Col>
          ))}
        </Row>

        <Row
          className="mt-4"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Pagination>
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            />
          </Pagination>
        </Row>
      </Container>
    </div>
  );
};

export default PokemonSelection;
