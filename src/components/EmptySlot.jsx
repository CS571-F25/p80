import React from "react";
import { Card } from "react-bootstrap";

const EmptySlot = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .empty-slot-card {
          width: 280px;
          height: 500px;
          margin: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow: 0 0 10px #8a42d8aa;
          font-family: 'Press Start 2P', cursive;
          color: #c8a8ff;
          margin: 15px 0 15px 0;
        }

        .empty-slot-text {
          font-size: 12px;
          opacity: 0.8;
          line-height: 1.4;
        }
      `}</style>

      <Card className="empty-slot-card">
        <Card.Body>
          <p className="empty-slot-text">
            Add Pokémon to fill this slot
          </p>
        </Card.Body>
      </Card>
    </>
  );
};

export default EmptySlot;