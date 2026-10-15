import { useState, useEffect } from "react";
import axios from "axios";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";

export default function PokePet() {
  const [loading, setLoading] = useState(true);
  const [poke, setPoke] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const responsePoke = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/Salamence",
        );

        setPoke(responsePoke.data);
      } catch (error) {
        setError(true);
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return loading ? (
    <p>Carregando PokePet...</p>
  ) : (
    <div id="docs">
      <h2>{poke.species.name}</h2>
      <img
        src={poke.sprites.front_shiny}
        className="base"
        width="170"
        height="179"
        alt=""
      />
      <p>Meu Pet</p>
      <ul>
        <li>
          <a href="https://vite.dev/" target="_blank">
            <img className="logo" src={viteLogo} alt="" />
            Tipo: {poke.types[0].type.name}
          </a>
        </li>
        <li>
          <a href="https://react.dev/" target="_blank">
            <img className="button-icon" src={reactLogo} alt="" />
            Peso: {poke.weight}
          </a>
        </li>
      </ul>
    </div>
  );
}
