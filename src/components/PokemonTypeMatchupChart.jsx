import React, { useState } from "react";
import { Container } from "react-bootstrap";

const PokemonTypeMatchupChart = () => {
  const [selectedType, setSelectedType] = useState("normal");

  const typeMatchups = {
    normal: { strong: [], weak: ["fighting"], resistant: [], vulnerable: ["fighting"] },
    fire: { strong: ["grass", "ice", "bug", "steel"], weak: ["water", "ground", "rock"], resistant: ["grass", "ice", "bug", "steel", "fairy"], vulnerable: ["water", "ground", "rock"] },
    water: { strong: ["fire", "ground", "rock"], weak: ["electric", "grass"], resistant: ["steel", "fire", "water"], vulnerable: ["electric", "grass"] },
    electric: { strong: ["water", "flying"], weak: ["ground"], resistant: ["flying", "steel", "electric"], vulnerable: ["ground"] },
    grass: { strong: ["water", "ground", "rock"], weak: ["fire", "ice", "poison", "flying", "bug"], resistant: ["ground", "water", "grass"], vulnerable: ["fire", "ice", "poison", "flying", "bug"] },
    ice: { strong: ["flying", "ground", "grass", "dragon"], weak: ["fire", "fighting", "rock", "steel"], resistant: ["ice"], vulnerable: ["fire", "fighting", "rock", "steel"] },
    fighting: { strong: ["normal", "ice", "rock", "dark", "steel"], weak: ["flying", "psychic", "fairy"], resistant: ["rock", "bug", "dark"], vulnerable: ["flying", "psychic", "fairy"] },
    poison: { strong: ["grass", "fairy"], weak: ["ground", "psychic"], resistant: ["grass", "poison", "bug", "fairy"], vulnerable: ["ground", "psychic"] },
    ground: { strong: ["fire", "electric", "poison", "rock", "steel"], weak: ["water", "grass", "ice"], resistant: ["poison", "rock"], vulnerable: ["water", "grass", "ice"] },
    flying: { strong: ["grass", "fighting", "bug"], weak: ["electric", "ice", "rock"], resistant: ["grass", "fighting", "bug"], vulnerable: ["electric", "ice", "rock"] },
    psychic: { strong: ["fighting", "poison"], weak: ["bug", "ghost", "dark"], resistant: ["fighting", "psychic"], vulnerable: ["bug", "ghost", "dark"] },
    bug: { strong: ["grass", "psychic", "dark"], weak: ["fire", "flying", "rock"], resistant: ["grass", "fighting", "ground"], vulnerable: ["fire", "flying", "rock"] },
    rock: { strong: ["fire", "ice", "flying", "bug"], weak: ["water", "grass", "fighting", "ground", "steel"], resistant: ["fire", "flying", "bug"], vulnerable: ["water", "grass", "fighting", "ground", "steel"] },
    ghost: { strong: ["psychic", "ghost"], weak: ["ghost", "dark"], resistant: ["poison", "bug"], vulnerable: ["ghost", "dark"] },
    dragon: { strong: ["dragon"], weak: ["ice", "dragon", "fairy"], resistant: ["grass", "fire", "water", "electric"], vulnerable: ["ice", "dragon", "fairy"] },
    dark: { strong: ["psychic", "ghost"], weak: ["fighting", "bug", "fairy"], resistant: ["ghost", "dark"], vulnerable: ["fighting", "bug", "fairy"] },
    steel: { strong: ["ice", "rock", "fairy"], weak: ["fire", "water", "ground"], resistant: ["normal", "flying", "rock", "bug", "steel", "grass", "psychic", "ice", "dragon", "fairy"], vulnerable: ["fire", "water", "ground"] },
    fairy: { strong: ["fighting", "bug", "dark"], weak: ["poison", "steel"], resistant: ["fighting", "bug", "dark"], vulnerable: ["poison", "steel"] },
  };

  const typeColors = {
    normal: "#A8A878", fire: "#F08030", water: "#6890F0", electric: "#F8D030",
    grass: "#78C850", ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0",
    ground: "#E0C068", flying: "#A890F0", psychic: "#F85888", bug: "#A8B820",
    rock: "#B8A038", ghost: "#705898", dragon: "#7038F8", dark: "#705848",
    steel: "#B8B8D0", fairy: "#EE99AC"
  };

  const matchup = typeMatchups[selectedType];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .matchup-container {
          min-height: 100vh;
          padding: 20px;
          font-family: 'Press Start 2P', cursive;
        }

        .matchup-title {
          text-align: center;
          color: #d19cff;
          font-size: 28px;
          margin: 30px 0;
          text-shadow: 0 0 5px #fff, 0 0 10px #8a42d8;
          text-transform: uppercase;
        }

        .type-selector {
          background: rgba(0, 0, 0, 0.6);
          border: 3px solid #8a42d8;
          border-radius: 15px;
          padding: 20px;
          margin: 20px 0;
          box-shadow: 0 0 15px #8a42d8;
        }

        .type-selector-label {
          color: #d19cff;
          font-size: 14px;
          margin-bottom: 15px;
          text-shadow: 0 0 3px #fff;
          text-transform: uppercase;
          text-align: center;
        }

        .type-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }

        .type-btn {
          padding: 10px 15px;
          border: 3px solid;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.4);
          color: white;
          font-family: 'Press Start 2P', cursive;
          font-size: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: uppercase;
          text-shadow: 0 0 3px #000;
        }

        .type-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 12px currentColor;
        }

        .type-btn.active {
          background: linear-gradient(135deg, rgba(75, 27, 115, 0.6), rgba(138, 66, 216, 0.6));
          border-color: #d19cff !important;
          box-shadow: 0 0 15px #d19cff;
          transform: scale(1.1);
        }

        .matchup-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin: 30px 0;
        }

        .matchup-card {
          background: rgba(0, 0, 0, 0.6);
          border: 3px solid #8a42d8;
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 0 15px #8a42d8;
        }

        .card-title {
          color: #d19cff;
          font-size: 14px;
          text-shadow: 0 0 3px #fff;
          margin-bottom: 15px;
          text-transform: uppercase;
          border-bottom: 2px solid #8a42d8;
          padding-bottom: 10px;
        }

        .type-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .type-tag {
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: bold;
          text-transform: uppercase;
          color: white;
          text-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .empty-state {
          color: #999;
          font-size: 11px;
          font-style: italic;
          padding: 10px;
          text-align: center;
        }

        .selected-type-display {
          background: linear-gradient(135deg, rgba(75, 27, 115, 0.3), rgba(138, 66, 216, 0.3));
          border: 3px solid #8a42d8;
          border-radius: 15px;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
          box-shadow: 0 0 20px #8a42d8;
        }

        .selected-type-name {
          color: #d19cff;
          font-size: 24px;
          text-shadow: 0 0 5px #fff, 0 0 10px #8a42d8;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .selected-type-color {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin: 0 auto;
          border: 3px solid white;
          box-shadow: 0 0 15px currentColor;
        }
      `}</style>

      <div className="matchup-container">
        <Container>
          <h1 className="matchup-title">⚔️ Pokémon Type Matchups</h1>

          <div className="type-selector">
            <div className="type-selector-label">Select a Type</div>
            <div className="type-buttons">
              {Object.keys(typeMatchups).map((type) => (
                <button
                  key={type}
                  className={`type-btn ${selectedType === type ? "active" : ""}`}
                  onClick={() => setSelectedType(type)}
                  style={{
                    borderColor: typeColors[type],
                    backgroundColor: selectedType === type ? typeColors[type] : "rgba(0, 0, 0, 0.4)",
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="selected-type-display">
            <div className="selected-type-name">{selectedType}</div>
            <div
              className="selected-type-color"
              style={{ backgroundColor: typeColors[selectedType] }}
            ></div>
          </div>

          <div className="matchup-grid">
            <div className="matchup-card">
              <div className="card-title">✓ Strong Against</div>
              <div className="type-list">
                {matchup.strong.length > 0 ? (
                  matchup.strong.map((type) => (
                    <span
                      key={type}
                      className="type-tag"
                      style={{
                        backgroundColor: typeColors[type],
                        boxShadow: `0 0 10px ${typeColors[type]}`,
                      }}
                    >
                      {type}
                    </span>
                  ))
                ) : (
                  <div className="empty-state">No types</div>
                )}
              </div>
            </div>

            <div className="matchup-card">
              <div className="card-title">✗ Weak To</div>
              <div className="type-list">
                {matchup.weak.length > 0 ? (
                  matchup.weak.map((type) => (
                    <span
                      key={type}
                      className="type-tag"
                      style={{
                        backgroundColor: typeColors[type],
                        boxShadow: `0 0 10px ${typeColors[type]}`,
                      }}
                    >
                      {type}
                    </span>
                  ))
                ) : (
                  <div className="empty-state">No types</div>
                )}
              </div>
            </div>

            <div className="matchup-card">
              <div className="card-title">🛡️ Resistant To</div>
              <div className="type-list">
                {matchup.resistant.length > 0 ? (
                  matchup.resistant.map((type) => (
                    <span
                      key={type}
                      className="type-tag"
                      style={{
                        backgroundColor: typeColors[type],
                        boxShadow: `0 0 10px ${typeColors[type]}`,
                      }}
                    >
                      {type}
                    </span>
                  ))
                ) : (
                  <div className="empty-state">No types</div>
                )}
              </div>
            </div>

            <div className="matchup-card">
              <div className="card-title">⚡ Vulnerable To</div>
              <div className="type-list">
                {matchup.vulnerable.length > 0 ? (
                  matchup.vulnerable.map((type) => (
                    <span
                      key={type}
                      className="type-tag"
                      style={{
                        backgroundColor: typeColors[type],
                        boxShadow: `0 0 10px ${typeColors[type]}`,
                      }}
                    >
                      {type}
                    </span>
                  ))
                ) : (
                  <div className="empty-state">No types</div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default PokemonTypeMatchupChart;
