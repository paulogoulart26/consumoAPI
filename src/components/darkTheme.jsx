import { useState, useEffect } from "react";

export default function DarkTheme() {
  const [tema, setTema] = useState("claro");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
  }, [tema]);

  return (
    <button
      type="button"
      className="tema"
      onClick={() => setTema(tema === "claro" ? "escuro" : "claro")}
    >
      Tema: {tema}
    </button>
  );
}
