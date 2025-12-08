import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import PokemonContext from "../context/pokemonContext";

const PokemonCard = (props) => {
  const [selectedPokemon, setSelectedPokemon] = useContext(PokemonContext);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorited(savedFavorites.includes(props.id));
  }, [props.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updated;
    
    if (savedFavorites.includes(props.id)) {
      updated = savedFavorites.filter((id) => id !== props.id);
    } else {
      updated = [...savedFavorites, props.id];
    }
    
    setIsFavorited(!isFavorited);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const handleClick = (id) => {
    if (props.t === "Add Pokémon") {
      if (selectedPokemon.length >= 6) {
        alert("There are already 6 Pokémon chosen, remove one to add");
        return;
      }
      if (selectedPokemon.includes(id)) {
        alert("This Pokémon is already in your team!");
        return;
      }
      setSelectedPokemon((prev) => [...prev, id]);
      alert("Selected Pokémon");
    } else {
      setSelectedPokemon((prev) => prev.filter((p) => p !== id));
      alert("Removed Pokémon from team");
    }
  };

  const typeGradients = {
    normal: "linear-gradient(135deg, #A8A878 0%, #D4D4AA 100%)",
    fire: "linear-gradient(135deg, #F08030 0%, #FF6B6B 100%)",
    water: "linear-gradient(135deg, #6890F0 0%, #4FC3F7 100%)",
    electric: "linear-gradient(135deg, #F8D030 0%, #FFE66D 100%)",
    grass: "linear-gradient(135deg, #78C850 0%, #A8E6A3 100%)",
    ice: "linear-gradient(135deg, #98D8D8 0%, #B3E5FC 100%)",
    fighting: "linear-gradient(135deg, #C03028 0%, #E57373 100%)",
    poison: "linear-gradient(135deg, #A040A0 0%, #CE93D8 100%)",
    ground: "linear-gradient(135deg, #E0C068 0%, #F0E68C 100%)",
    flying: "linear-gradient(135deg, #A890F0 0%, #C5A3FF 100%)",
    psychic: "linear-gradient(135deg, #F85888 0%, #FF80AB 100%)",
    bug: "linear-gradient(135deg, #A8B820 0%, #C5D11E 100%)",
    rock: "linear-gradient(135deg, #B8A038 0%, #D4C068 100%)",
    ghost: "linear-gradient(135deg, #705898 0%, #9C7CB8 100%)",
    dragon: "linear-gradient(135deg, #7038F8 0%, #A164FF 100%)",
    dark: "linear-gradient(135deg, #705848 0%, #9C8273 100%)",
    steel: "linear-gradient(135deg, #B8B8D0 0%, #D8D8E8 100%)",
    fairy: "linear-gradient(135deg, #EE99AC 0%, #FFB3D0 100%)",
  };

  const typeAccents = {
    normal: "#8B8B6B",
    fire: "#C8501E",
    water: "#4A6FB8",
    electric: "#C8A820",
    grass: "#5FA040",
    ice: "#70B8B8",
    fighting: "#902018",
    poison: "#783878",
    ground: "#B8A050",
    flying: "#8070D8",
    psychic: "#C84868",
    bug: "#889010",
    rock: "#987828",
    ghost: "#584070",
    dragon: "#5028C8",
    dark: "#584030",
    steel: "#9898A8",
    fairy: "#D87894",
  };

  const getPrimaryTypeGradient = () => {
    return props.types?.[0]
      ? typeGradients[props.types[0].toLowerCase()] || typeGradients.normal
      : typeGradients.normal;
  };

  const getPrimaryTypeAccent = () => {
    return props.types?.[0]
      ? typeAccents[props.types[0].toLowerCase()] || typeAccents.normal
      : typeAccents.normal;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .flip-card-container {
          perspective: 1000px;
          width: 280px;
          height: 500px;
          margin: 15px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flip-card-container.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 20px;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }

        .game-card {
          height: 100%;
          border-radius: 20px;
          border: 3px solid ${getPrimaryTypeAccent()};
          box-shadow:
            0 4px 15px rgba(0, 0, 0, 0.3),
            0 0 20px ${getPrimaryTypeAccent()}55,
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          font-family: 'Press Start 2P', cursive;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .game-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .game-card:hover::before {
          opacity: 1;
        }

        .game-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow:
            0 8px 25px rgba(0, 0, 0, 0.4),
            0 0 30px ${getPrimaryTypeAccent()}88,
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .game-card-header {
          color: white;
          text-shadow:
            2px 2px 4px rgba(0, 0, 0, 0.8),
            0 0 10px rgba(255, 255, 255, 0.5);
          letter-spacing: 1px;
        }

        .type-pill {
          background: rgba(0, 0, 0, 0.5);
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(5px);
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition: all 0.2s ease;
        }

        .type-pill:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .pokemon-btn {
          width: 100%;
          padding: 12px;
          border-radius: 12px !important;
          border: 3px solid ${getPrimaryTypeAccent()} !important;
          background: linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 100%) !important;
          color: white !important;
          font-family: 'Press Start 2P', cursive !important;
          text-shadow: 
            2px 2px 4px rgba(0, 0, 0, 0.8),
            0 0 8px rgba(255, 255, 255, 0.5);
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition: all 0.2s ease;
          font-size: 11px;
          position: relative;
          overflow: hidden;
        }

        .pokemon-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }

        .pokemon-btn:hover::before {
          left: 100%;
        }

        .pokemon-btn:hover {
          transform: translateY(-2px);
          box-shadow:
            0 6px 16px rgba(0, 0, 0, 0.5),
            0 0 20px ${getPrimaryTypeAccent()}66,
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          border-color: ${getPrimaryTypeAccent()} !important;
        }

        .pokemon-btn:active {
          transform: translateY(0px);
        }

        .image-container {
          background: rgba(0, 0, 0, 0.6);
          border-radius: 15px;
          padding: 20px;
          border: 3px solid ${getPrimaryTypeAccent()};
          box-shadow: 
            0 4px 15px rgba(0, 0, 0, 0.5),
            inset 0 2px 10px rgba(0, 0, 0, 0.3);
          position: relative;
          overflow: hidden;
        }

        .image-container::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.3) 100%);
          pointer-events: none;
        }

        .pokemon-image {
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
          transition: transform 0.3s ease;
        }

        .stat-bar-container {
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 9px;
          color: white;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
          margin-bottom: 4px;
          display: flex;
          justify-content: space-between;
        }

        .stat-bar {
          height: 10px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 6px;
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .stat-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, ${getPrimaryTypeAccent()}, ${getPrimaryTypeAccent()}dd);
          border-radius: 4px;
          box-shadow: 0 0 10px ${getPrimaryTypeAccent()}88;
          transition: width 0.6s ease;
        }

        .flip-hint {
          font-size: 8px;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          margin-top: 8px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        }

        .favorite-star {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          transition: all 0.2s ease;
          filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.8));
          z-index: 10;
        }

        .favorite-star:hover {
          filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.8));
          transform: scale(1.15);
        }

        .favorite-star:active {
          transform: scale(0.95);
        }
      `}</style>

      <div className={`flip-card-container ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <Card
              className="game-card"
              onClick={() => setIsFlipped(!isFlipped)}
              style={{
                background: getPrimaryTypeGradient(),
              }}
            >
              <button
                className="favorite-star"
                onClick={toggleFavorite}
                title={isFavorited ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorited ? "★" : "☆"}
              </button>

              <Card.Header
                as="h5"
                className="game-card-header"
                style={{
                  background: `linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%)`,
                  textAlign: "center",
                  padding: "15px",
                  fontSize: "16px",
                  textTransform: "capitalize",
                  borderBottom: `3px solid ${getPrimaryTypeAccent()}`,
                }}
              >
                {props.name}
              </Card.Header>

              <Card.Body style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div className="image-container" style={{ textAlign: "center", marginBottom: "15px" }}>
                    {props.imageSrc && (
                      <img
                        src={props.imageSrc}
                        alt={props.name}
                        className="pokemon-image"
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "contain",
                          position: "relative",
                          zIndex: 1,
                        }}
                      />
                    )}
                  </div>

                  <div
                    style={{
                      marginBottom: "15px",
                      display: "flex",
                      justifyContent: "center",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    {props.types?.map((type) => (
                      <span
                        key={type}
                        className="type-pill"
                        style={{
                          color: "white",
                          padding: "8px 16px",
                          borderRadius: "20px",
                          fontSize: "10px",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="flip-hint">Click to see stats →</p>
                  <Button
                    className="pokemon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(props.id);
                    }}
                  >
                    {props.t}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="flip-card-back">
            <Card
              className="game-card"
              onClick={() => setIsFlipped(!isFlipped)}
              style={{
                background: getPrimaryTypeGradient(),
              }}
            >
              <button
                className="favorite-star"
                onClick={toggleFavorite}
                title={isFavorited ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorited ? "★" : "☆"}
              </button>

              <Card.Header
                as="h5"
                className="game-card-header"
                style={{
                  background: `linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%)`,
                  textAlign: "center",
                  padding: "15px",
                  fontSize: "16px",
                  textTransform: "capitalize",
                  borderBottom: `3px solid ${getPrimaryTypeAccent()}`,
                }}
              >
                {props.name} Stats
              </Card.Header>

              <Card.Body style={{ padding: "20px" }}>
                <div>
                  <div className="stat-bar-container">
                    <div className="stat-label">
                      <span>HP</span>
                      <span>{props.hp || 0}</span>
                    </div>
                    <div className="stat-bar">
                      <div className="stat-bar-fill" style={{ width: `${Math.min((props.hp || 0) / 255 * 100, 100)}%` }}></div>
                    </div>
                  </div>

                  <div className="stat-bar-container">
                    <div className="stat-label">
                      <span>Attack</span>
                      <span>{props.attack || 0}</span>
                    </div>
                    <div className="stat-bar">
                      <div className="stat-bar-fill" style={{ width: `${Math.min((props.attack || 0) / 255 * 100, 100)}%` }}></div>
                    </div>
                  </div>

                  <div className="stat-bar-container">
                    <div className="stat-label">
                      <span>Defense</span>
                      <span>{props.defense || 0}</span>
                    </div>
                    <div className="stat-bar">
                      <div className="stat-bar-fill" style={{ width: `${Math.min((props.defense || 0) / 255 * 100, 100)}%` }}></div>
                    </div>
                  </div>

                  <div className="stat-bar-container">
                    <div className="stat-label">
                      <span>Sp. Atk</span>
                      <span>{props.specialAttack || 0}</span>
                    </div>
                    <div className="stat-bar">
                      <div className="stat-bar-fill" style={{ width: `${Math.min((props.specialAttack || 0) / 255 * 100, 100)}%` }}></div>
                    </div>
                  </div>

                  <div className="stat-bar-container">
                    <div className="stat-label">
                      <span>Sp. Def</span>
                      <span>{props.specialDefense || 0}</span>
                    </div>
                    <div className="stat-bar">
                      <div className="stat-bar-fill" style={{ width: `${Math.min((props.specialDefense || 0) / 255 * 100, 100)}%` }}></div>
                    </div>
                  </div>

                  <div className="stat-bar-container">
                    <div className="stat-label">
                      <span>Speed</span>
                      <span>{props.speed || 0}</span>
                    </div>
                    <div className="stat-bar">
                      <div className="stat-bar-fill" style={{ width: `${Math.min((props.speed || 0) / 255 * 100, 100)}%` }}></div>
                    </div>
                  </div>

                  <div style={{
                    marginTop: "15px",
                    padding: "12px",
                    background: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "10px",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                  }}>
                    <div className="stat-label" style={{ marginBottom: "8px" }}>
                      <span>Total</span>
                      <span>{(props.hp || 0) + (props.attack || 0) + (props.defense || 0) + (props.specialAttack || 0) + (props.specialDefense || 0) + (props.speed || 0)}</span>
                    </div>
                    <div className="stat-label">
                      <span>Types</span>
                      <span style={{ fontSize: "8px" }}>{props.types?.join(", ") || "None"}</span>
                    </div>
                  </div>

                  <p className="flip-hint" style={{ marginTop: "10px" }}>← Click to flip back</p>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonCard;