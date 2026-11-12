import { useState, useEffect } from "react";
import axios from "axios";

export default function CharDBZ() {
  const [loading, setLoading] = useState(true);
  const [DBZ, setDBZ] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const responseDBZ = await axios.get(
          "https://dragonball-api.com/api/characters/33",
        );

        setDBZ(responseDBZ.data);
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
    return <p>Carregando charDBZ...</p>;
  }

  if (error) {
    return <p>Erro ao carregar o personagem.</p>;
  }

  return (
    <>
      <p className="rotulo">Personagem favorito</p>
      <h2>{DBZ.name}</h2>
      <img src={DBZ.image} className="base" alt={DBZ.name} />
      <p>Raça: {DBZ.race}</p>
    </>
  );
}
