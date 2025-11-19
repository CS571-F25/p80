import React from "react";
import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import PokemonContext from "../context/pokemonContext";

const PokemonCard = (props) => {
  const [selectedPokemon, setSelectedPokemon] = useContext(PokemonContext);

  const handleClick = (id) => {
    if (props.t === "Add Pokémon") {
      const length = selectedPokemon.length;
      if (length >= 6) {
        alert("There are already 6 Pokémon chosen, remove one to add");
        return;
      }
      if (selectedPokemon.includes(id)) {
        alert("This Pokémon is already in your team!");
        return;
      }

      setSelectedPokemon((prev) => [...prev, id]);
    } else {
      const filtered = selectedPokemon.filter((p) => p !== id);

      setSelectedPokemon(filtered);
    }
  };
  const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };

  const getPrimaryTypeColor = () => {
    return props.types && props.types[0]
      ? typeColors[props.types[0].toLowerCase()] || "#A8A878"
      : "#A8A878";
  };

  return (
    <Card
      style={{
        width: "280px",
        margin: "15px",
        background: getPrimaryTypeColor(),
        border: "5px solid #f4e357",
        borderRadius: "15px",
        boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
        overflow: "hidden",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <Card.Header
        as="h5"
        style={{
          backgroundColor: getPrimaryTypeColor(),
          color: "white",
          textAlign: "center",
          padding: "12px",
          fontSize: "25px",
          fontWeight: "bold",
          textTransform: "capitalize",
          borderBottom: "3px solid rgba(0, 0, 0, 0.2)",
        }}
      >
        {props.name}
      </Card.Header>

      <Card.Body
        style={{ padding: "20px", backgroundColor: getPrimaryTypeColor() }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "15px",
            backgroundColor: "#f0f0f0",
            borderRadius: "10px",
            padding: "15px",
            border: "3px solid #ddd",
          }}
        >
          {props.imageSrc ? (
            <img
              src={props.imageSrc}
              alt={props.name}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "contain",
              }}
            />
          ) : (
            <></>
          )}
        </div>

        <div
          style={{
            marginBottom: "15px",
            display: "flex",
            justifyContent: "center",
            gap: "5px",
            flexWrap: "wrap",
          }}
        >
          {props.types && props.types.length > 0 ? (
            props.types.map((type) => (
              <span
                key={type}
                style={{
                  backgroundColor: "#474747",
                  color: "white",
                  padding: "6px 16px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {type}
              </span>
            ))
          ) : (
            <span style={{ color: "#999" }}>N/A</span>
          )}
        </div>

        <Button className="pokemon-btn" onClick={() => handleClick(props.id)}>
          {props.t}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PokemonCard;
