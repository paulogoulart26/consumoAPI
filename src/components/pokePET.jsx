import { useState, useEffect } from "react";
import axios from "axios";
import tipoLogo from "../assets/tipo.png";
import pesoLogo from "../assets/peso.png";

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
      <h2>Meu Pet</h2>
      <img
        src={poke.sprites.front_shiny}
        className="base"
        width="170"
        height="179"
        alt=""
      />
      <h2>{poke.species.name}</h2>
      <ul>
        <li>
          <img className="tipo" src={tipoLogo} alt="" />
          Tipo: {poke.types[0].type.name}
        </li>
        <li>
          <img className="peso" src={pesoLogo} alt="" />
          Peso: {poke.weight}
        </li>
      </ul>
    </div>
  );
}
