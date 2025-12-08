import React, { useState, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PokemonContext from "../context/pokemonContext";
import PokemonCard from "./PokemonCard";

const RandomTeamGenerator = ({ pokemon }) => {
  const [selectedPokemon, setSelectedPokemon] = useContext(PokemonContext);
  const [generatedTeam, setGeneratedTeam] = useState([]);
  const [diversity, setDiversity] = useState("balanced");

  const types = [
    "normal", "fire", "water", "electric", "grass", "ice",
    "fighting", "poison", "ground", "flying", "psychic", "bug",
    "rock", "ghost", "dragon", "dark", "steel", "fairy"
  ];

  const generateBalancedTeam = () => {
    const availablePokemon = pokemon.filter((p) => !selectedPokemon.includes(p.id));
    
    if (availablePokemon.length === 0) {
      alert("No available Pokémon left to add!");
      return;
    }

    let team = [];

    if (diversity === "balanced") {
      // Pick one Pokémon from each type until we have 6
      const usedTypes = new Set();
      const shuffledTypes = [...types].sort(() => Math.random() - 0.5);

      for (const type of shuffledTypes) {
        if (team.length >= 6) break;

        const pokemonOfType = availablePokemon.filter(
          (p) => p.types && p.types.some((t) => t.toLowerCase() === type)
        );

        if (pokemonOfType.length > 0) {
          const randomPokemon = pokemonOfType[Math.floor(Math.random() * pokemonOfType.length)];
          team.push(randomPokemon);
          availablePokemon.splice(availablePokemon.indexOf(randomPokemon), 1);
          usedTypes.add(type);
        }
      }
    } else if (diversity === "high-stats") {
      // Pick Pokémon with highest total stats
      const sortedByStats = availablePokemon
        .map((p) => ({
          ...p,
          totalStats: (p.hp || 0) + (p.attack || 0) + (p.defense || 0) +
            (p.specialAttack || 0) + (p.specialDefense || 0) + (p.speed || 0)
        }))
        .sort((a, b) => b.totalStats - a.totalStats)
        .slice(0, 6);

      team = sortedByStats;
    } else if (diversity === "random") {
      // Just pick 6 random Pokémon
      for (let i = 0; i < 6 && availablePokemon.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * availablePokemon.length);
        team.push(availablePokemon[randomIndex]);
        availablePokemon.splice(randomIndex, 1);
      }
    }

    setGeneratedTeam(team);
  };

  const addGeneratedTeam = () => {
    if (generatedTeam.length === 0) {
      alert("Generate a team first!");
      return;
    }

    const currentTeamSize = selectedPokemon.length;
    const spaceAvailable = 6 - currentTeamSize;

    if (spaceAvailable < generatedTeam.length) {
      alert(`You only have space for ${spaceAvailable} more Pokémon!`);
      return;
    }

    const newTeam = [...selectedPokemon, ...generatedTeam.map((p) => p.id)];
    setSelectedPokemon(newTeam);
    alert(`Added ${generatedTeam.length} Pokémon to your team!`);
    setGeneratedTeam([]);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .generator-container {
          min-height: 100vh;
          padding: 20px;
          font-family: 'Press Start 2P', cursive;
        }

        .generator-title {
          text-align: center;
          color: #d19cff;
          font-size: 28px;
          margin: 30px 0;
          text-shadow: 0 0 5px #fff, 0 0 10px #8a42d8;
          text-transform: uppercase;
        }

        .generator-controls {
          background: rgba(0, 0, 0, 0.6);
          border: 3px solid #8a42d8;
          border-radius: 15px;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
          box-shadow: 0 0 15px #8a42d8;
        }

        .control-label {
          color: #d19cff;
          font-size: 14px;
          margin-bottom: 15px;
          text-shadow: 0 0 3px #fff;
          text-transform: uppercase;
        }

        .radio-group {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin: 15px 0;
          flex-wrap: wrap;
        }

        .radio-option {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .radio-option input {
          cursor: pointer;
          width: 18px;
          height: 18px;
        }

        .radio-option label {
          color: #d19cff;
          font-size: 12px;
          margin: 0;
          cursor: pointer;
          text-transform: uppercase;
        }

        .generate-btn, .add-btn {
          padding: 15px 30px;
          border-radius: 12px;
          border: 3px solid #8a42d8;
          background: linear-gradient(135deg, #4b1b73, #8a42d8);
          color: white;
          font-family: 'Press Start 2P', cursive;
          font-size: 12px;
          text-shadow: 0 0 3px #fff, 0 0 6px #d19cff;
          box-shadow: 0 0 8px #8a42d8;
          transition: 0.15s ease;
          cursor: pointer;
          margin: 10px;
          text-transform: uppercase;
        }

        .generate-btn:hover, .add-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 12px #d19cff, 0 0 22px rgba(209, 156, 255, 0.6);
        }

        .generate-btn:disabled, .add-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .team-preview {
          margin: 30px 0;
          text-align: center;
        }

        .preview-label {
          color: #d19cff;
          font-size: 18px;
          margin-bottom: 20px;
          text-shadow: 0 0 3px #fff;
          text-transform: uppercase;
        }

        .no-team {
          color: #999;
          font-size: 14px;
          padding: 40px 20px;
        }
      `}</style>

      <div className="generator-container">
        <Container>
          <h1 className="generator-title">🎲 Random Team Generator</h1>

          <div className="generator-controls">
            <div className="control-label">Select Generation Mode</div>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  id="balanced"
                  name="diversity"
                  value="balanced"
                  checked={diversity === "balanced"}
                  onChange={(e) => setDiversity(e.target.value)}
                />
                <label htmlFor="balanced">Balanced (Diverse Types)</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="high-stats"
                  name="diversity"
                  value="high-stats"
                  checked={diversity === "high-stats"}
                  onChange={(e) => setDiversity(e.target.value)}
                />
                <label htmlFor="high-stats">High Stats</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="random"
                  name="diversity"
                  value="random"
                  checked={diversity === "random"}
                  onChange={(e) => setDiversity(e.target.value)}
                />
                <label htmlFor="random">Pure Random</label>
              </div>
            </div>

            <div>
              <button className="generate-btn" onClick={generateBalancedTeam}>
                Generate Team
              </button>
              <button
                className="add-btn"
                onClick={addGeneratedTeam}
                disabled={generatedTeam.length === 0}
              >
                Add to My Team
              </button>
            </div>
          </div>

          {generatedTeam.length > 0 && (
            <div className="team-preview">
              <div className="preview-label">Generated Team Preview</div>
              <Row style={{ justifyContent: "center" }}>
                {generatedTeam.map((p) => (
                  <Col key={p.id} xs={12} sm={6} md={4} lg={3} style={{ display: "flex", justifyContent: "center" }}>
                    <PokemonCard {...p} t={"Add Pokémon"} />
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {generatedTeam.length === 0 && (
            <div className="no-team">
              <p>Click "Generate Team" to create a random team!</p>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default RandomTeamGenerator;
