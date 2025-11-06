import React from "react";
import "./Card.css";

const Card = (props) => {
  const { name, image, types = [], moves = [] } = props;

  return (
    <div className="pokemon-card">
      <h2 className="pokemon-name">{name || "Pokemon Name"}</h2>
      <div className="pokemon-image">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="image-placeholder">Image</div>
        )}
      </div>
      <div className="pokemon-info">
        <div>
          <strong>Type:</strong> {types.length > 0 ? types.join(", ") : "N/A"}
        </div>
        <div>
          <strong>Moves:</strong> {moves.length > 0 ? moves.join(", ") : "N/A"}
        </div>
      </div>
    </div>
  );
};

export default Card;
