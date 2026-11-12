import { useState, useEffect } from "react";
import axios from "axios";

export default function PokeEvolucao({ nome }) {
  const [loading, setLoading] = useState(true);
  const [cadeia, setCadeia] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(false); // limpa o erro da tentativa anterior
      try {
        // 1ª chamada: a "espécie" do Pokémon, que tem o link da evolução
        const responseEspecie = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${nome}`,
        );

        // 2ª chamada: a cadeia de evolução (a árvore)
        const responseCadeia = await axios.get(
          responseEspecie.data.evolution_chain.url,
        );

        setCadeia(responseCadeia.data.chain);
      } catch (error) {
        setError(true);
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [nome]);

  // FUNÇÃO RECURSIVA: ela chama ela mesma.
  // Cada "elo" da árvore tem um Pokémon e uma lista "evolves_to"
  // com as próximas evoluções. Para cada próxima evolução,
  // a função chama ela mesma de novo, até a lista ficar vazia.
  function mostrarElo(elo) {
    // A URL termina com o número do Pokémon:
    // "https://pokeapi.co/api/v2/pokemon-species/373/"
    // Separando por "/", o número fica na posição 6.
    const id = elo.species.url.split("/")[6];
    const imagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    // Destaca o Pokémon que está sendo mostrado no card
    const ehAtual = elo.species.name === nome;

    return (
      <div className="elo" key={elo.species.name}>
        <div className={ehAtual ? "elo-pokemon atual" : "elo-pokemon"}>
          <img src={imagem} alt={elo.species.name} />
          <span>{elo.species.name}</span>
        </div>

        {/* Só desenha a seta se tiver próxima evolução */}
        {elo.evolves_to.length > 0 && (
          <>
            <span className="seta">→</span>
            <div className="elo-proximos">
              {/* Aqui a função chama ela mesma (recursão).
                  Se tiver várias evoluções (ex: Eevee), mostra todas. */}
              {elo.evolves_to.map((proximo) => mostrarElo(proximo))}
            </div>
          </>
        )}
      </div>
    );
  }

  if (loading) {
    return <p>Carregando evolução...</p>;
  }

  if (error) {
    return <p>Erro ao carregar a evolução.</p>;
  }

  return (
    <div className="evolucao">
      <h3>Linha evolutiva</h3>
      {mostrarElo(cadeia)}

      {/* Pokémon que não evolui: a primeira lista já vem vazia */}
      {cadeia.evolves_to.length === 0 && <p>Este Pokémon não evolui.</p>}
    </div>
  );
}
