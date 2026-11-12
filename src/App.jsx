import { useEffect, useState } from "react";
import "./App.css";
import MovieTe from "./components/listMovie";
import Perfil from "./components/perfil";
import CharDBZ from "./components/charDBZ";
import PokePet from "./components/pokePET";
import MyMovie from "./components/myMovie";
import DarkTheme from "./components/darkTheme";

function App() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log("Error: ", error);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Ocorreu um erro inesperado</div>;
  }

  return (
    <>
      {/* Topo da página: nome à esquerda, botão de tema à direita */}
      <header>
        <Perfil />
        <DarkTheme />
      </header>

      <main>
        {/* SEÇÃO 1: Pokémon em destaque (ocupa a largura toda) */}
        <section className="secao">
          <h2 className="titulo-secao">Encontro Pokémon</h2>
          <article className="card">
            <PokePet />
          </article>
        </section>

        {/* SEÇÃO 2: Favoritos, dois cards lado a lado */}
        <section className="secao">
          <h2 className="titulo-secao">Meus favoritos</h2>
          <div className="cards">
            <article className="card">
              <CharDBZ />
            </article>
            <article className="card">
              <MyMovie />
            </article>
          </div>
        </section>

        {/* SEÇÃO 3: Busca de filmes */}
        <section className="secao">
          <h2 className="titulo-secao">Buscar filmes</h2>
          <MovieTe />
        </section>
      </main>

      {/* Rodapé */}
      <footer>
        <p>Feito por Paulo · SENAI</p>
        <p>Dados: PokéAPI, Dragon Ball API e OMDb</p>
      </footer>
    </>
  );
}

export default App;
