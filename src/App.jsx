import "./App.css";
import PokemonCard from "./components/PokemonCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonLayout from "./components/PokemonLayout";
import PokemonLandingPage from "./components/PokemonLandingPage";
import PokemonSelection from "./components/PokemonSelection";
import PokemonTeam from "./components/PokemonTeam";
import PokemonNotFoundPage from "./components/PokemonNotFoundPage";
import { useEffect, useState } from "react";

function App() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = async () => {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=200&offset=0"
    );
    const data = await res.json();

    const promises = data.results.map((d) => individualPokemonInformation(d));
    await Promise.all(promises);
  };

  const individualPokemonInformation = async (d) => {
    try {
      const id = d.url.split("/").filter(Boolean).pop();

      const res = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${id}/`);
      const data = await res.json();

      const p = {
        name: d.name,
        imageSrc: data.sprites.front_default,
        types: data.types.map((t) => t.type.name),
      };

      console.log(p);
      setPokemon((prev) => [...prev, p]);
    } catch (error) {
      console.error(`Error fetching pokemon ${d.name}:`, error);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PokemonLayout />}>
            <Route path="/p80" element={<PokemonLandingPage />} />
            <Route path="choose-pokemon" element={<PokemonSelection />} />
            <Route path="view-pokemon-team" element={<PokemonTeam />} />
            <Route path="*" element={<PokemonNotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
