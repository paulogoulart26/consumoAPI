import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./pokemonCard";
import PokeEvolucao from "./pokeEvolucao";

// Quantidade de Pokémon que existem na PokéAPI
const TOTAL_POKEMON = 1025;

export default function PokePet() {
  const [loading, setLoading] = useState(true);
  const [poke, setPoke] = useState({});
  const [error, setError] = useState(false);

  // Número do Pokémon que vai ser buscado. Começa no Salamence (373).
  const [id, setId] = useState(373);

  // Toda vez que o "id" mudar, busca o Pokémon novo
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(false); // limpa o erro da tentativa anterior
      try {
        const responsePoke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`,
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
  }, [id]);

  // Sorteia um número de 1 até 1025
  function sortear() {
    const novoId = Math.floor(Math.random() * TOTAL_POKEMON) + 1;
    setId(novoId);
  }

  return (
    <div className="pokepet">
      {/* disabled={loading}: o botão fica travado enquanto carrega,
          assim o usuário não dispara várias buscas ao mesmo tempo */}
      <button
        type="button"
        className="botao-sortear"
        onClick={sortear}
        disabled={loading}
      >
        {loading ? "Procurando..." : "🎲 Encontrar Pokémon"}
      </button>

      {/* ESTADO 1: Loading */}
      {loading && (
        <div className="estado">
          <div className="spinner"></div>
          <p>Procurando Pokémon...</p>
        </div>
      )}

      {/* ESTADO 2: Error */}
      {!loading && error && (
        <div className="estado estado-erro">
          <p>😢 O Pokémon fugiu! Não foi possível carregar.</p>
          <p>Verifique sua conexão e tente de novo.</p>
        </div>
      )}

      {/* ESTADO 3: Success */}
      {!loading && !error && (
        // No PC: card à esquerda e evolução à direita
        <div className="pokepet-conteudo">
          {/* poke.stats[0] é a vida (hp) e poke.stats[1] é o ataque.
              Alguns Pokémon não têm imagem shiny, então usa a normal. */}
          <PokemonCard
            nome={poke.species.name}
            imagem={poke.sprites.front_shiny || poke.sprites.front_default}
            tipo={poke.types[0].type.name}
            peso={poke.weight}
            vida={poke.stats[0].base_stat}
            ataque={poke.stats[1].base_stat}
          />

          <PokeEvolucao nome={poke.species.name} />
        </div>
      )}
    </div>
  );
}
