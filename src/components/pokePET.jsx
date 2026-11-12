import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./pokemonCard";
import PokeEvolucao from "./pokeEvolucao";

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

  if (loading) {
    return <p>Carregando PokePet...</p>;
  }

  if (error) {
    return <p>Erro ao carregar o PokePet.</p>;
  }

  return (
    <div>
      <h2>Meu Pet</h2>

      {/* O PokePet busca os dados e entrega tudo pronto para o card.
          poke.stats[0] é a vida (hp) e poke.stats[1] é o ataque. */}
      <PokemonCard
        nome={poke.species.name}
        imagem={poke.sprites.front_shiny}
        tipo={poke.types[0].type.name}
        peso={poke.weight}
        vida={poke.stats[0].base_stat}
        ataque={poke.stats[1].base_stat}
      />

      <PokeEvolucao nome={poke.species.name} />
    </div>
  );
}
