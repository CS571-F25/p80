import React from "react";
import bugIcon from "../assets/icons/bug.svg";
import darkIcon from "../assets/icons/dark.svg";
import dragonIcon from "../assets/icons/dragon.svg";
import electricIcon from "../assets/icons/electric.svg";
import fairyIcon from "../assets/icons/fairy.svg";
import fightingIcon from "../assets/icons/fighting.svg";
import fireIcon from "../assets/icons/fire.svg";
import flyingIcon from "../assets/icons/flying.svg";
import ghostIcon from "../assets/icons/ghost.svg";
import grassIcon from "../assets/icons/grass.svg";
import groundIcon from "../assets/icons/ground.svg";
import iceIcon from "../assets/icons/ice.svg";
import normalIcon from "../assets/icons/normal.svg";
import poisonIcon from "../assets/icons/poison.svg";
import psychicIcon from "../assets/icons/psychic.svg";
import rockIcon from "../assets/icons/rock.svg";
import steelIcon from "../assets/icons/steel.svg";
import waterIcon from "../assets/icons/water.svg";

const icons = [
  { src: bugIcon, alt: "Bug", className: "bug", index: 0 },
  { src: darkIcon, alt: "Dark", className: "dark", index: 1 },
  { src: dragonIcon, alt: "Dragon", className: "dragon", index: 2 },
  { src: electricIcon, alt: "Electric", className: "electric", index: 3 },
  { src: fairyIcon, alt: "Fairy", className: "fairy", index: 4 },
  { src: fightingIcon, alt: "Fighting", className: "fighting", index: 5 },
  { src: fireIcon, alt: "Fire", className: "fire", index: 6 },
  { src: flyingIcon, alt: "Flying", className: "flying", index: 7 },
  { src: ghostIcon, alt: "Ghost", className: "ghost", index: 8 },
  { src: grassIcon, alt: "Grass", className: "grass", index: 9 },
  { src: groundIcon, alt: "Ground", className: "ground", index: 10 },
  { src: iceIcon, alt: "Ice", className: "ice", index: 11 },
  { src: normalIcon, alt: "Normal", className: "normal", index: 12 },
  { src: poisonIcon, alt: "Poison", className: "poison", index: 13 },
  { src: psychicIcon, alt: "Psychic", className: "psychic", index: 14 },
  { src: rockIcon, alt: "Rock", className: "rock", index: 15 },
  { src: steelIcon, alt: "Steel", className: "steel", index: 16 },
  { src: waterIcon, alt: "Water", className: "water", index: 17 },
];

const PokemonLandingPage = () => {
  const radius = 350;
  const totalIcons = icons.length;

  const getCirclePosition = (index) => {
    const angle = (index * 360) / totalIcons - 90;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return { x, y };
  };

  return (
    <div className="landing-page-container">
      <div className="text-center">
        <h1 className="landing-title">Welcome to PokeWorld!</h1>
        <h3 className="landing-subtitle">Build the team of your dreams</h3>
      </div>
      <div className="icons-circle">
        {icons.map((icon) => {
          const { x, y } = getCirclePosition(icon.index);
          return (
            <div
              key={icon.index}
              className={`icon circle-icon ${icon.className}`}
              style={{
                "--icon-index": icon.index,
                "--x": `${x}px`,
                "--y": `${y}px`,
              }}
            >
              <img src={icon.src} alt={icon.alt} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonLandingPage;
