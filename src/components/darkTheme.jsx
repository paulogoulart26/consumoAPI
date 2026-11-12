import { useState, useEffect } from "react";

export default function DarkTheme() {
  // O site começa no tema escuro
  const [tema, setTema] = useState("escuro");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
  }, [tema]);

  return (
    <button
      type="button"
      className="tema"
      onClick={() => setTema(tema === "claro" ? "escuro" : "claro")}
    >
      {/* O botão mostra para qual tema ele vai trocar */}
      {tema === "escuro" ? "☀️ Tema claro" : "🌙 Tema escuro"}
    </button>
  );
}
