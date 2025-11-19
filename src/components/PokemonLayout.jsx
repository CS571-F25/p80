import React from "react";
import { Link, Outlet } from "react-router";

const PokemonLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PokemonLayout;
