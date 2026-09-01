import { useEffect, useState } from "react";
import heroImg from "./assets/hero.png";
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
  const [evo, setEvo] = useState({})

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
        const responseEvo1 = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/Salamence",
        );

        setEvo(responseEvo1.data);
        setPoke(responsePoke.data);
        setDBZ(responseDBZ.data);
        setPerfil(response.data);
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
        <div className="hero">
          <img
            src={DBZ.image}
            className="base"
            width="170"
            height="179"
            alt=""
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
          <img src={poke.sprites.front_shiny} alt="" />
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
            <button
              type="button"
              className="counter"
              onClick={() => } // img do poke pokeEvo.img
            ></button>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
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
