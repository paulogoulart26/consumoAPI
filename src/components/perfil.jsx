import { useState, useEffect } from "react";
import axios from "axios";

export default function Perfil() {
  const [perfil, setPerfil] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://6a79e554674f43f4db11ebc8.mockapi.io/api/person/7",
        );

        setPerfil(response.data);
      } catch (error) {
        setError(true);
        console.log("Erro: ", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return loading ? <p>Carregando nome...</p> : <h1>{perfil.nome}</h1>;
}
