import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import axios from "axios";
import MovieTe from "./components/listMovie";
import Perfil from "./components/perfil";
import CharDBZ from "./components/charDBZ";

function App() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [poke, setPoke] = useState({});
  const [filme, setFilme] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const responsePoke = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/Salamence",
        );
        const responseFilme = await axios.get(
          "https://www.omdbapi.com/?t=Jurassic+Park&apikey=59ab1eb9",
        );

        setPoke(responsePoke.data);
        setFilme(responseFilme.data);
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
      <section id="center">
        <div>
          <MovieTe />
        </div>
        <CharDBZ />
        <div>
          <Perfil />
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
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
        <div id="social">
          <h2>Meu filme favorito é: {filme.Title}</h2>
          <img
            src={filme.Poster}
            className="base"
            width="170"
            height="179"
            alt=""
          />
          <p>Nota do IMDB: {filme.imdbRating}</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
