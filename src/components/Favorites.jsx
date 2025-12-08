import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PokemonCard from "./PokemonCard";

const Favorites = ({ pokemon }) => {
  const [favorites, setFavorites] = useState([]);
  const [favoritePokemon, setFavoritePokemon] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    const favorited = pokemon.filter((p) => favorites.includes(p.id));
    setFavoritePokemon(favorited);
  }, [favorites, pokemon]);

  const toggleFavorite = (pokemonId) => {
    let updated;
    if (favorites.includes(pokemonId)) {
      updated = favorites.filter((id) => id !== pokemonId);
    } else {
      updated = [...favorites, pokemonId];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const clearAllFavorites = () => {
    if (window.confirm("Remove all favorites?")) {
      setFavorites([]);
      localStorage.removeItem("favorites");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .favorites-container {
          min-height: 100vh;
          padding: 20px;
          font-family: 'Press Start 2P', cursive;
        }

        .favorites-title {
          text-align: center;
          color: #d19cff;
          font-size: 28px;
          margin: 30px 0;
          text-shadow: 0 0 5px #fff, 0 0 10px #8a42d8;
          text-transform: uppercase;
        }

        .favorites-header {
          background: rgba(0, 0, 0, 0.6);
          border: 3px solid #8a42d8;
          border-radius: 15px;
          padding: 20px;
          margin: 20px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 0 15px #8a42d8;
          flex-wrap: wrap;
          gap: 15px;
        }

        .favorites-count {
          color: #d19cff;
          font-size: 14px;
          text-shadow: 0 0 3px #fff;
          text-transform: uppercase;
        }

        .clear-favorites-btn {
          padding: 10px 20px;
          border-radius: 8px;
          border: 3px solid #f44336;
          background: rgba(244, 67, 54, 0.2);
          color: #f44336;
          font-family: 'Press Start 2P', cursive;
          font-size: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: uppercase;
        }

        .clear-favorites-btn:hover:not(:disabled) {
          background: rgba(244, 67, 54, 0.4);
          box-shadow: 0 0 15px #f44336;
          transform: scale(1.05);
        }

        .clear-favorites-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .empty-state {
          text-align: center;
          color: #999;
          padding: 60px 20px;
          font-size: 14px;
        }

        .empty-state-emoji {
          font-size: 48px;
          margin-bottom: 20px;
        }
      `}</style>

      <div className="favorites-container">
        <Container>
          <h1 className="favorites-title">⭐ My Favorite Pokémon</h1>

          <div className="favorites-header">
            <div className="favorites-count">
              Total Favorites: <strong>{favorites.length}</strong>
            </div>
            <button
              className="clear-favorites-btn"
              onClick={clearAllFavorites}
              disabled={favorites.length === 0}
            >
              🗑️ Clear All
            </button>
          </div>

          {favoritePokemon.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-emoji">⭐</div>
              <p>No favorites yet!</p>
              <p>Go to "Select Pokémon" and click the star icon to add favorites.</p>
            </div>
          ) : (
            <Row style={{ justifyContent: "center" }}>
              {favoritePokemon.map((p) => (
                <Col
                  key={p.id}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={4}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <PokemonCard {...p} t={"Remove from Favorites"} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>
    </>
  );
};

export default Favorites;
