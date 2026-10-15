import { useState, useEffect } from "react";
import axios from "axios";

export default function CharDBZ() {
  const [loading, setLoading] = useState(true);
  const [DBZ, setDBZ] = useState({});

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
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

  return loading ? (
    <p>Carregando charDBZ...</p>
  ) : (
    <div>
      <img
        src={DBZ.image}
        className="base"
        height="280"
        alt=""
        style={{ marginTop: "50px" }}
      />
    </div>
  );
}
