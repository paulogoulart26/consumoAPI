import tipoLogo from "../assets/tipo.png";
import pesoLogo from "../assets/peso.png";

// Uma cor para cada tipo de Pokémon
const coresPorTipo = {
  normal: "#9a9a6a",
  fire: "#e8542a",
  water: "#3b7dd8",
  grass: "#3fa34d",
  electric: "#d4a800",
  ice: "#4fb8c9",
  fighting: "#c03028",
  poison: "#a040a0",
  ground: "#c2a04a",
  flying: "#8a75d8",
  psychic: "#e8457a",
  bug: "#8a9a1a",
  rock: "#a8903a",
  ghost: "#6a5894",
  dragon: "#6a3cf0",
  dark: "#6a5040",
  steel: "#8a8aa8",
  fairy: "#d8709a",
};

// Este componente NÃO busca nada na API.
// Ele só recebe os dados prontos (props) e mostra na tela.
export default function PokemonCard({ nome, imagem, tipo, peso, vida, ataque }) {
  // Se o tipo não estiver na lista, usa a cor do "normal"
  const cor = coresPorTipo[tipo] || coresPorTipo.normal;

  return (
    // "--cor-tipo" é uma variável CSS criada aqui e usada no App.css
    <div className="pokemon-card" style={{ "--cor-tipo": cor }}>
      <img src={imagem} className="base" alt={nome} />

      <h2>{nome}</h2>

      <ul>
        <li>
          <img className="icone" src={tipoLogo} alt="" />
          Tipo: {tipo}
        </li>
        <li>
          <img className="icone" src={pesoLogo} alt="" />
          Peso: {peso}
        </li>
        <li>❤️ Vida: {vida}</li>
        <li>⚔️ Ataque: {ataque}</li>
      </ul>
    </div>
  );
}
