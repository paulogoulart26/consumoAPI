import { useState, useEffect } from "react";
import axios from "axios";

export default function MyMovie() {
  const [loading, setLoading] = useState(true);
  const [filme, setFilme] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const responseFilme = await axios.get(
          "https://www.omdbapi.com/?t=Jurassic+Park&apikey=59ab1eb9"
        );

        setFilme(responseFilme.data);
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
    return <p>Carregando MyMovie...</p>;
  }

  if (error) {
    return <p>Erro ao carregar o filme.</p>;
  }

  return (
    <>
      <h2>Meu filme favorito é: {filme.Title}</h2>

      <img
        src={filme.Poster}
        className="base"
        width="170"
        height="179"
        alt={`Pôster de ${filme.Title}`}
      />

      <p>Nota do IMDB: {filme.imdbRating}</p>
    </>
  );
}