import React from "react";
import { Card } from "react-bootstrap";

const PokemonCard = ({ name, image, types }) => {
  return (
    <Card style={{ width: "18rem", margin: "10px", color: "E0E0CE" }}>
      <Card.Header as="h5">{name}</Card.Header>
      <Card.Body>
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          {image ? (
            <img
              src={image}
              alt={name}
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
            />
          ) : (
            <div
              style={{
                width: "150px",
                height: "150px",
                margin: "0 auto",
                border: "2px dashed #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#999",
              }}
            >
              Image
            </div>
          )}
        </div>
        <div style={{ marginBottom: "15px" }}>
          <strong>Types:</strong>{" "}
          {types && types.length > 0 ? types.join(", ") : "N/A"}
        </div>
        <button
          style={{
            width: "100%",
            padding: "8px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => alert(`Using ${name}!`)}
        >
          Use Pokemon
        </button>
      </Card.Body>
    </Card>
  );
};

export default PokemonCard;
