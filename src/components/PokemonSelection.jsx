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
      `}</style>

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
    </>
  );
};

export default PokemonSelection;