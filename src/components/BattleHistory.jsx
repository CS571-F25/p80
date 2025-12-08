import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const BattleHistory = () => {
  const [battleHistory, setBattleHistory] = useState([]);
  const [stats, setStats] = useState({ wins: 0, losses: 0, ties: 0 });

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("battleHistory")) || [];
    setBattleHistory(savedHistory);
    calculateStats(savedHistory);
  }, []);

  const calculateStats = (history) => {
    const wins = history.filter((b) => b.result === "win").length;
    const losses = history.filter((b) => b.result === "lose").length;
    const ties = history.filter((b) => b.result === "tie").length;
    setStats({ wins, losses, ties });
  };

  const addBattle = (result, myTeamStats, opponentTeamStats) => {
    const newBattle = {
      id: Date.now(),
      result,
      myTeamStats,
      opponentTeamStats,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };
    const updatedHistory = [newBattle, ...battleHistory];
    setBattleHistory(updatedHistory);
    localStorage.setItem("battleHistory", JSON.stringify(updatedHistory));
    calculateStats(updatedHistory);
  };

  const clearHistory = () => {
    if (window.confirm("Clear all battle history?")) {
      setBattleHistory([]);
      setStats({ wins: 0, losses: 0, ties: 0 });
      localStorage.removeItem("battleHistory");
    }
  };

  const totalBattles = stats.wins + stats.losses + stats.ties;
  const winRate = totalBattles > 0 ? ((stats.wins / totalBattles) * 100).toFixed(1) : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .battle-history-container {
          min-height: 100vh;
          padding: 20px;
          font-family: 'Press Start 2P', cursive;
        }

        .history-title {
          text-align: center;
          color: #d19cff;
          font-size: 28px;
          margin: 30px 0;
          text-shadow: 0 0 5px #fff, 0 0 10px #8a42d8;
          text-transform: uppercase;
        }

        .stats-card {
          background: rgba(0, 0, 0, 0.6);
          border: 3px solid #8a42d8;
          border-radius: 15px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 0 15px #8a42d8;
          margin: 15px;
          color: white;
        }

        .stat-number {
          font-size: 32px;
          color: #FFD700;
          text-shadow: 0 0 5px #FFD700;
          margin: 10px 0;
        }

        .stat-label {
          font-size: 12px;
          color: #d19cff;
          text-shadow: 0 0 3px #fff;
          text-transform: uppercase;
        }

        .win-rate {
          background: linear-gradient(135deg, rgba(76, 175, 80, 0.3), rgba(56, 142, 60, 0.3));
          border: 3px solid #4CAF50;
          box-shadow: 0 0 15px #4CAF50;
        }

        .battle-entry {
          background: rgba(0, 0, 0, 0.6);
          border-left: 5px solid;
          border-radius: 10px;
          padding: 15px;
          margin: 10px 0;
          color: white;
          font-size: 11px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s ease;
        }

        .battle-entry:hover {
          transform: translateX(5px);
          box-shadow: 0 0 15px rgba(209, 156, 255, 0.5);
        }

        .battle-win {
          border-left-color: #4CAF50;
          background: rgba(76, 175, 80, 0.1);
        }

        .battle-lose {
          border-left-color: #f44336;
          background: rgba(244, 67, 54, 0.1);
        }

        .battle-tie {
          border-left-color: #FFC107;
          background: rgba(255, 193, 7, 0.1);
        }

        .battle-result {
          font-weight: bold;
          font-size: 14px;
          text-transform: uppercase;
        }

        .battle-result.win {
          color: #4CAF50;
          text-shadow: 0 0 5px #4CAF50;
        }

        .battle-result.lose {
          color: #f44336;
          text-shadow: 0 0 5px #f44336;
        }

        .battle-result.tie {
          color: #FFC107;
          text-shadow: 0 0 5px #FFC107;
        }

        .empty-state {
          text-align: center;
          color: #999;
          padding: 50px 20px;
          font-size: 14px;
        }

        .clear-btn {
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

        .clear-btn:hover {
          background: rgba(244, 67, 54, 0.4);
          box-shadow: 0 0 15px #f44336;
        }
      `}</style>

      <div className="battle-history-container">
        <Container>
          <h1 className="history-title">Battle History</h1>

          <Row>
            <Col md={3}>
              <div className="stats-card">
                <div className="stat-label">Total Battles</div>
                <div className="stat-number">{totalBattles}</div>
              </div>
            </Col>
            <Col md={3}>
              <div className="stats-card" style={{ borderColor: "#4CAF50", boxShadow: "0 0 15px #4CAF50" }}>
                <div className="stat-label" style={{ color: "#4CAF50" }}>Wins</div>
                <div className="stat-number" style={{ color: "#4CAF50" }}>{stats.wins}</div>
              </div>
            </Col>
            <Col md={3}>
              <div className="stats-card" style={{ borderColor: "#f44336", boxShadow: "0 0 15px #f44336" }}>
                <div className="stat-label" style={{ color: "#f44336" }}>Losses</div>
                <div className="stat-number" style={{ color: "#f44336" }}>{stats.losses}</div>
              </div>
            </Col>
            <Col md={3}>
              <div className="stats-card win-rate">
                <div className="stat-label" style={{ color: "#4CAF50" }}>Win Rate</div>
                <div className="stat-number" style={{ color: "#4CAF50" }}>{winRate}%</div>
              </div>
            </Col>
          </Row>

          <Row style={{ marginTop: "30px" }}>
            <Col>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <button className="clear-btn" onClick={clearHistory} disabled={battleHistory.length === 0}>
                  Clear History
                </button>
              </div>

              {battleHistory.length === 0 ? (
                <div className="empty-state">
                  <p>No battles recorded yet.</p>
                  <p>Go fight some battles!</p>
                </div>
              ) : (
                battleHistory.map((battle) => (
                  <div
                    key={battle.id}
                    className={`battle-entry battle-${battle.result}`}
                  >
                    <div>
                      <div className={`battle-result ${battle.result}`}>
                        {battle.result.toUpperCase()}
                      </div>
                      <div style={{ color: "#bbb", marginTop: "5px" }}>
                        {battle.date} at {battle.time}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", color: "#d19cff" }}>
                      <div>You: {battle.myTeamStats}</div>
                      <div>Opponent: {battle.opponentTeamStats}</div>
                    </div>
                  </div>
                ))
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default BattleHistory;
