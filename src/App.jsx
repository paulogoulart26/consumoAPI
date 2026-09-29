import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [perfil, setPerfil] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [DBZ, setDBZ] = useState({});
  const [poke, setPoke] = useState({});
  const [filme, setFilme] = useState({});
  const [text, setText] = useState(localStorage.getItem("easy-input") || "");
  const [sfilme, setSfilme] = useState(localStorage.getItem("name-film") || "");

  useEffect(() => {
    localStorage.setItem("easy-input", text);
  }, [text]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://6a79e554674f43f4db11ebc8.mockapi.io/api/person/7",
        );
        const responseDBZ = await axios.get(
          "https://dragonball-api.com/api/characters/33",
        );
        const responsePoke = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/Salamence",
        );
        const responseFilme = await axios.get(
          "https://www.omdbapi.com/?t=Jurassic+Park&apikey=59ab1eb9",
        );
        const responsesfilme = await axios.get(
          `https://www.omdbapi.com/?s=${setSfilme}&apikey=59ab1eb9`,
        );

        setPoke(responsePoke.data);
        setDBZ(responseDBZ.data);
        setPerfil(response.data);
        setFilme(responseFilme.data);
        setSfilme(responseFilme.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log("Error: ", error);
      }
    };
    getData();
  }, [text]);

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
          <label>Digite o nome de um filme: </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setSfilme(e.target.value)}
            placeholder="Digite o nome do filme:"
          />
          <button
            onClick={() => {
              localStorage.setItem("easy-input", text);
            }}
          >
            Enviar
          </button>
        </div>
        <div>
          <img
            src={DBZ.image}
            className="base"
            height="280"
            alt=""
            style={{ marginTop: "50px" }}
          />
        </div>
        <div>
          <h1>{perfil.nome}</h1>
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
