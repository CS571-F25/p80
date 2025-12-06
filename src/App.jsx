import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonLayout from "./components/PokemonLayout";
import PokemonLandingPage from "./components/PokemonLandingPage";
import PokemonSelection from "./components/PokemonSelection";
import PokemonTeam from "./components/PokemonTeam";
import PokemonNotFoundPage from "./components/PokemonNotFoundPage";
import PokemonContext from "./context/pokemonContext";
import PokemonBattle from "./components/PokemonBattle";
import { useEffect, useState } from "react";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    getPokemon();
  }, []);

  const individualPokemonInformation = async (d) => {
    try {
      const id = d.url.split("/").filter(Boolean).pop();
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const data = await res.json();

      const p = {
        id: id,
        name: d.name,
        imageSrc: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
        types: data.types.map((t) => t.type.name),
        hp: data.stats.find(s => s.stat.name === 'hp')?.base_stat || 0,
        attack: data.stats.find(s => s.stat.name === 'attack')?.base_stat || 0,
        defense: data.stats.find(s => s.stat.name === 'defense')?.base_stat || 0,
        specialAttack: data.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 0,
        specialDefense: data.stats.find(s => s.stat.name === 'special-defense')?.base_stat || 0,
        speed: data.stats.find(s => s.stat.name === 'speed')?.base_stat || 0,
      };

      return p;
    } catch (error) {
      console.error(`Error fetching pokemon ${d.name}:`, error);
      return null;
    }
  };

  const getPokemon = async () => {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=200&offset=0"
    );
    const data = await res.json();

    const promises = data.results.map((d) => individualPokemonInformation(d));
    const results = await Promise.all(promises);

    const validPokemon = results.filter((p) => p !== null);
    setPokemon(validPokemon);
  };

  return (
    <div className="App">
      <PokemonContext.Provider value={[selectedPokemon, setSelectedPokemon]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PokemonLayout />}>
              <Route index element={<PokemonLandingPage />} />
              <Route path="p80" element={<PokemonLandingPage />} />
              <Route
                path="choose-pokemon"
                element={<PokemonSelection pokemon={pokemon} />}
              />
              <Route
                path="view-pokemon-team"
                element={<PokemonTeam pokemon={pokemon} />}
              />
              <Route
                path="battle"
                element={<PokemonBattle pokemon={pokemon} />}
              />
              <Route path="*" element={<PokemonNotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PokemonContext.Provider>
    </div>
  );
}
export default App;