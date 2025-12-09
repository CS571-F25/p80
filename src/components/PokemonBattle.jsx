import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import PokemonContext from "../context/pokemonContext";

const PokemonBattle = ({ pokemon }) => {
  const [selectedPokemon, setSelectedPokemon] = useContext(PokemonContext);
  const [myTeam, setMyTeam] = useState([]);
  const [opponentTeam, setOpponentTeam] = useState([]);
  const [battleResult, setBattleResult] = useState(null);
  const [myTeamStats, setMyTeamStats] = useState(0);
  const [opponentTeamStats, setOpponentTeamStats] = useState(0);
  const [isBattling, setIsBattling] = useState(false);

  useEffect(() => {
    const userTeam = pokemon.filter((p) => selectedPokemon.includes(p.id));
    setMyTeam(userTeam);
  }, [pokemon, selectedPokemon]);

  const calculateTotalStats = (team) => {
    return team.reduce((total, p) => {
      return (
        total +
        (p.hp || 0) +
        (p.attack || 0) +
        (p.defense || 0) +
        (p.specialAttack || 0) +
        (p.specialDefense || 0) +
        (p.speed || 0)
      );
    }, 0);
  };

  const saveBattleToHistory = (result, myStats, opponentStats) => {
    const newBattle = {
      id: Date.now(),
      result,
      myTeamStats: myStats,
      opponentTeamStats: opponentStats,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };
    const battleHistory =
      JSON.parse(localStorage.getItem("battleHistory")) || [];
    battleHistory.unshift(newBattle);
    localStorage.setItem("battleHistory", JSON.stringify(battleHistory));
  };

  const startBattle = () => {
    if (myTeam.length === 0) {
      alert("You need to select at least one Pokemon to battle!");
      return;
    }

    const availablePokemon = pokemon.filter(
      (p) => !selectedPokemon.includes(p.id)
    );
    const randomTeam = [];

    for (let i = 0; i < 6 && availablePokemon.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availablePokemon.length);
      randomTeam.push(availablePokemon[randomIndex]);
      availablePokemon.splice(randomIndex, 1);
    }

    setOpponentTeam(randomTeam);
    setIsBattling(true);
    setBattleResult(null);
    setTimeout(() => {
      const myStats = calculateTotalStats(myTeam);
      const opponentStats = calculateTotalStats(randomTeam);

      setMyTeamStats(myStats);
      setOpponentTeamStats(opponentStats);
      setTimeout(() => {
        let result;
        if (myStats > opponentStats) {
          result = "win";
        } else if (myStats < opponentStats) {
          result = "lose";
        } else {
          result = "tie";
        }
        setBattleResult(result);
        saveBattleToHistory(result, myStats, opponentStats);
      }, 1000);
    }, 500);
  };

  const resetBattle = () => {
    setOpponentTeam([]);
    setBattleResult(null);
    setMyTeamStats(0);
    setOpponentTeamStats(0);
    setIsBattling(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .battle-container {
          min-height: 100vh;
          padding: 20px;
          font-family: 'Press Start 2P', cursive;
        }

        .battle-title {
          text-align: center;
          margin: 30px 0;
          color: #d19cff;
          font-size: 32px;
          text-transform: uppercase;
          text-shadow: 0 0 3px #fff, 0 0 8px #8a42d8, 0 0 14px #8a42d8;
        }

        .team-label {
          font-size: 18px;
          color: #d19cff;
          text-shadow: 0 0 3px #fff, 0 0 6px #8a42d8;
          margin-bottom: 20px;
          text-align: center;
        }

        .battle-btn {
          padding: 15px 30px;
          border-radius: 12px;
          border: 3px solid #8a42d8;
          background: linear-gradient(135deg, #4b1b73, #8a42d8);
          color: white;
          font-family: 'Press Start 2P', cursive;
          font-size: 14px;
          text-shadow: 0 0 3px #fff, 0 0 6px #d19cff;
          box-shadow: 0 0 8px #8a42d8;
          transition: 0.15s ease;
          cursor: pointer;
        }

        .battle-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 12px #d19cff, 0 0 22px rgba(209, 156, 255, 0.6);
        }

        .battle-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .mini-pokemon-card {
          background: rgba(0, 0, 0, 0.6);
          border: 2px solid #8a42d8;
          border-radius: 12px;
          padding: 10px;
          margin: 10px;
          text-align: center;
          box-shadow: 0 0 10px #8a42d8aa;
        }

        .mini-pokemon-card img {
          width: 80px;
          height: 80px;
          object-fit: contain;
        }

        .mini-pokemon-name {
          font-size: 10px;
          color: #d19cff;
          margin-top: 5px;
          text-transform: capitalize;
        }

        .stats-display {
          background: rgba(0, 0, 0, 0.8);
          border: 3px solid #8a42d8;
          border-radius: 15px;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
          box-shadow: 0 0 20px #8a42d8;
        }

        .stats-number {
          font-size: 36px;
          color: #FFD700;
          text-shadow: 0 0 5px #fff, 0 0 10px #FFD700;
          animation: pulse 1s ease-in-out;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .result-banner {
          background: rgba(0, 0, 0, 0.9);
          border: 4px solid;
          border-radius: 20px;
          padding: 30px;
          margin: 30px 0;
          text-align: center;
          font-size: 28px;
          text-shadow: 0 0 10px #fff;
          animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
          from { transform: translateY(-50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .result-win {
          border-color: #4CAF50;
          color: #4CAF50;
          box-shadow: 0 0 30px #4CAF50;
        }

        .result-lose {
          border-color: #f44336;
          color: #f44336;
          box-shadow: 0 0 30px #f44336;
        }

        .result-tie {
          border-color: #FFC107;
          color: #FFC107;
          box-shadow: 0 0 30px #FFC107;
        }

        .vs-text {
          font-size: 48px;
          color: #d19cff;
          text-shadow: 0 0 10px #fff, 0 0 20px #8a42d8;
          text-align: center;
          margin: 30px 0;
          animation: bounce 1s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <div className="battle-container">
        <Container>
          <h1 className="battle-title">Pokemon Battle Arena</h1>

          {!isBattling ? (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <p
                style={{
                  color: "#d19cff",
                  fontSize: "14px",
                  marginBottom: "30px",
                }}
              >
                {myTeam.length === 0
                  ? "Please build your team first."
                  : `Your team: ${myTeam.length} Pokemon ready!`}
              </p>
              <Button
                className="battle-btn"
                onClick={startBattle}
                disabled={myTeam.length === 0}
              >
                Start Battle
              </Button>
            </div>
          ) : (
            <>
              <Row>
                <Col md={5}>
                  <h3 className="team-label">Your Team</h3>
                  <Row>
                    {myTeam.map((p) => (
                      <Col key={p.id} xs={6} md={4}>
                        <div className="mini-pokemon-card">
                          <img src={p.imageSrc} alt={p.name} />
                          <p className="mini-pokemon-name">{p.name}</p>
                        </div>
                      </Col>
                    ))}
                  </Row>
                  {myTeamStats > 0 && (
                    <div className="stats-display">
                      <div>Total Stats</div>
                      <div className="stats-number">{myTeamStats}</div>
                    </div>
                  )}
                </Col>

                <Col
                  md={2}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="vs-text">VS</div>
                </Col>

                <Col md={5}>
                  <h3 className="team-label">Opponent Team</h3>
                  <Row>
                    {opponentTeam.map((p) => (
                      <Col key={p.id} xs={6} md={4}>
                        <div className="mini-pokemon-card">
                          <img src={p.imageSrc} alt={p.name} />
                          <p className="mini-pokemon-name">{p.name}</p>
                        </div>
                      </Col>
                    ))}
                  </Row>
                  {opponentTeamStats > 0 && (
                    <div className="stats-display">
                      <div>Total Stats</div>
                      <div className="stats-number">{opponentTeamStats}</div>
                    </div>
                  )}
                </Col>
              </Row>

              {battleResult && (
                <div>
                  <div className={`result-banner result-${battleResult}`}>
                    {battleResult === "win" && "Victory! You Win!"}
                    {battleResult === "lose" && "Defeat! You Lose!"}
                    {battleResult === "tie" && "It's a Tie!"}
                  </div>

                  <div style={{ textAlign: "center", marginTop: "30px" }}>
                    <Button className="battle-btn" onClick={resetBattle}>
                      Battle Again
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default PokemonBattle;
