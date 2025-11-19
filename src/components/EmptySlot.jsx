import React from "react";
import { Card } from "react-bootstrap";

const EmptySlot = () => {
  return (
    <Card
      style={{
        width: "280px",
        height: "450px",
        margin: "15px",
        border: "5px dashed #999",
        borderRadius: "15px",
        overflow: "hidden",
        fontFamily: "'Arial', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card.Body
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "60px",
              marginBottom: "15px",
              opacity: "0.3",
            }}
          ></div>
          <p
            style={{
              color: "#999",
              fontSize: "16px",
              fontWeight: "500",
              margin: 0,
            }}
          >
            Add Pokémon to fill this slot
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EmptySlot;
