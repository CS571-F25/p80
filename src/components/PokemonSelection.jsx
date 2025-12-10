import React from "react";
import PokemonCard from "./PokemonCard";
import { useEffect, useState, useContext, useCallback } from "react";
import PokemonContext from "../context/pokemonContext";
import { Container, Row, Col, Pagination, Form } from "react-bootstrap";

const weaknesses = {
  normal: ["fighting"],
  fire: ["water", "ground", "rock"],
  water: ["electric", "grass"],
  electric: ["ground"],
  grass: ["fire", "ice", "poison", "flying", "bug"],
  ice: ["fire", "fighting", "rock", "steel"],
  fighting: ["flying", "psychic", "fairy"],
  poison: ["ground", "psychic"],
  ground: ["water", "grass", "ice"],
  flying: ["electric", "ice", "rock"],
  psychic: ["bug", "ghost", "dark"],
  bug: ["fire", "flying", "rock"],
  rock: ["water", "grass", "fighting", "ground", "steel"],
  ghost: ["ghost", "dark"],
  dragon: ["ice", "dragon", "fairy"],
  dark: ["fighting", "bug", "fairy"],
  steel: ["fire", "fighting", "ground"],
  fairy: ["poison", "steel"],
};

const PokemonSelection = ({ pokemon }) => {
  const [selectedPokemon] = useContext(PokemonContext);
  const [pokemonToDisplay, setPokemonToDisplay] = useState([]);

  // Load searchQuery and targetType from localStorage on mount
  const [targetType, setTargetType] = useState(() => {
    const saved = localStorage.getItem("pokemonFilterType");
    return saved || "";
  });
  const [searchQuery, setSearchQuery] = useState(() => {
    const saved = localStorage.getItem("pokemonSearchQuery");
    return saved || "";
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Save searchQuery to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("pokemonSearchQuery", searchQuery);
  }, [searchQuery]);

  // Save targetType to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("pokemonFilterType", targetType);
  }, [targetType]);

  const filteredPokemon = useCallback(() => {
    let newFilter = pokemon.filter(
      (p) => !selectedPokemon.some((s) => s === p.id)
    );

    if (searchQuery) {
      newFilter = newFilter.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (targetType) {
      const effectiveTypes = weaknesses[targetType.toLowerCase()];
      if (effectiveTypes) {
        newFilter = newFilter.filter(
          (p) =>
            p.types &&
            p.types.some((t) => effectiveTypes.includes(t.toLowerCase()))
        );
      }
    }

    setPokemonToDisplay(newFilter);
  }, [pokemon, selectedPokemon, targetType, searchQuery]);

  useEffect(() => {
    filteredPokemon();
    setCurrentPage(1);
  }, [filteredPokemon]);

  const totalPages = Math.ceil(pokemonToDisplay.length / pageSize);
  const startIdx = (currentPage - 1) * pageSize;
  const paginatedPokemon = pokemonToDisplay.slice(
    startIdx,
    startIdx + pageSize
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .pagination {
          font-family: 'Press Start 2P', cursive !important;
        }

        .pagination .page-link {
          background: rgba(0, 0, 0, 0.6) !important;
          border: 2px solid #8a42d8 !important;
          color: #d19cff !important;
          font-family: 'Press Start 2P', cursive !important;
          font-size: 12px !important;
          margin: 0 5px !important;
          border-radius: 8px !important;
          padding: 10px 15px !important;
          box-shadow: 0 0 8px #8a42d8 !important;
          transition: all 0.2s ease !important;
        }

        .pagination .page-link:hover {
          background: linear-gradient(135deg, #4b1b73, #8a42d8) !important;
          color: white !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 0 15px #d19cff !important;
        }

        .pagination .page-item.active .page-link {
          background: linear-gradient(135deg, #4b1b73, #8a42d8) !important;
          border-color: #d19cff !important;
          color: white !important;
          box-shadow: 0 0 15px #d19cff, inset 0 0 10px rgba(255, 255, 255, 0.2) !important;
          text-shadow: 0 0 5px #fff !important;
        }

        .pagination .page-item.disabled .page-link {
          background: rgba(0, 0, 0, 0.3) !important;
          border-color: #555 !important;
          color: #666 !important;
          opacity: 0.5 !important;
          cursor: not-allowed !important;
        }

        .type-select {
          font-family: 'Press Start 2P', cursive !important;
          font-size: 12px !important;
          background: rgba(0, 0, 0, 0.6) !important;
          color: #d19cff !important;
          border: 2px solid #8a42d8 !important;
          box-shadow: 0 0 8px #8a42d8 !important;
          padding: 10px !important;
          border-radius: 8px !important;
        }

        .type-select:focus {
          box-shadow: 0 0 15px #d19cff !important;
          border-color: #d19cff !important;
          outline: none !important;
          background: rgba(0, 0, 0, 0.6) !important;
          color: #d19cff !important;
        }

        .type-select option {
          background: #000000;
          color: #d19cff;
        }

        .search-input {
          font-family: 'Press Start 2P', cursive !important;
          font-size: 12px !important;
          background: rgba(0, 0, 0, 0.6) !important;
          color: #d19cff !important;
          border: 2px solid #8a42d8 !important;
          box-shadow: 0 0 8px #8a42d8 !important;
          padding: 10px !important;
          border-radius: 8px !important;
        }

        .search-input:focus {
          box-shadow: 0 0 15px #d19cff !important;
          border-color: #d19cff !important;
          outline: none !important;
          background: rgba(0, 0, 0, 0.6) !important;
          color: #d19cff !important;
        }

        .search-input::placeholder {
          color: #8a42d8 !important;
          opacity: 0.7 !important;
        }
      `}</style>

      <div>
        <Container>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <Col xs={12} sm={12} md={6} lg={4} style={{ textAlign: "center" }}>
              <Form.Control
                type="text"
                className="search-input"
                placeholder="Search Pokemon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "30px",
            }}
          >
            <Col xs={12} sm={12} md={6} lg={4} style={{ textAlign: "center" }}>
              <Form.Select
                className="type-select"
                value={targetType}
                onChange={(e) => setTargetType(e.target.value)}
              >
                <option value="">Show All Pokemon</option>
                <option disabled>--- Find Counter For ---</option>
                {Object.keys(weaknesses)
                  .sort()
                  .map((t) => (
                    <option key={t} value={t}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>

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
    </>
  );
};

export default PokemonSelection;
