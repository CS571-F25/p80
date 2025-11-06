import "./App.css";
import PokemonCard from "./PokemonCard";

function App() {
  const mockPokemon = [
    {
      name: "Charizard",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
      types: ["Fire", "Flying"],
    },
    {
      name: "Pikachu",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      types: ["Electric"],
    },
    {
      name: "Blastoise",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
      types: ["Water"],
    },
    {
      name: "Venusaur",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
      types: ["Grass", "Poison"],
    },
  ];

  return (
    <div className="App" style={{ backgroundColor: "#E7D7C1" }}>
      <h1 style={{ textAlign: "center", margin: "20px" }}>Pokemon Cards</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {mockPokemon.map((pokemon, index) => (
          <PokemonCard
            key={index}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
