import "./App.css";
import Card from "./Card";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="cards-container">
          <Card
            name="Charizard"
            image="https://static.wikia.nocookie.net/nintendo/images/9/95/Charizard.png/revision/latest?cb=20141002083306&path-prefix=en"
            types={["Fire", "Flying"]}
            moves={["Tackle", "Ember", "Flamethrower", "Fly"]}
          />
          <Card
            name="Bulb"
            image="https://static.wikia.nocookie.net/nintendo/images/9/95/Charizard.png/revision/latest?cb=20141002083306&path-prefix=en"
            types={["Water", "Earth"]}
            moves={["Tackle", "Ember", "Flamethrower", "Fly"]}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
