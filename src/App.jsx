import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
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

      {/* Conteúdo principal */}
      <main>
        {/* Os três cards que vão ficar lado a lado */}
        <section className="cards">
          {/* Cada <article> é a "caixa" de um card */}
          <article className="card">
            <CharDBZ />
          </article>
          <article className="card">
            <PokePet />
          </article>
          <article className="card">
            <MyMovie />
          </article>
        </section>

        {/* Busca de filmes */}
        <section>
          <MovieTe />
        </section>
      </main>
    </>
  );
}

export default App;
