import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  // Atualiza o app sozinho quando sair uma versão nova
  registerType: "autoUpdate",
  includeAssets: ["favicon.ico", "apple-touch-icon.png"],

  manifest: {
    name: "PauloPWA",
    short_name: "PauloPWA",
    description: "App de consumo de APIs: Pokémon, Dragon Ball e filmes",
    icons: [
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#171717",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },

  // Configuração do Service Worker (cache)
  workbox: {
    // Arquivos do próprio site que ficam salvos para abrir offline
    globPatterns: ["**/*.{js,css,html,ico,png,svg}"],

    // Cache das coisas que vêm de fora (APIs e imagens)
    runtimeCaching: [
      // 1. Imagens: uma imagem nunca muda, então usa o cache primeiro
      {
        urlPattern: ({ request }) => request.destination === "image",
        handler: "CacheFirst",
        options: {
          cacheName: "imagens",
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 dias
          },
          cacheableResponse: { statuses: [0, 200] },
        },
      },

      // 2. PokéAPI: os dados de um Pokémon não mudam, então usa o cache primeiro
      {
        urlPattern: ({ url }) => url.hostname === "pokeapi.co",
        handler: "CacheFirst",
        options: {
          cacheName: "pokeapi",
          expiration: {
            maxEntries: 300,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 dias
          },
          cacheableResponse: { statuses: [0, 200] },
        },
      },

      // 3. Dragon Ball e Perfil: mostra o cache na hora
      //    e atualiza em segundo plano para a próxima vez
      {
        urlPattern: ({ url }) =>
          url.hostname === "dragonball-api.com" ||
          url.hostname.endsWith("mockapi.io"),
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "apis",
          cacheableResponse: { statuses: [0, 200] },
        },
      },

      // 4. Filmes (OMDb): tenta a internet primeiro.
      //    Se demorar mais de 3 segundos ou estiver offline, usa o cache
      {
        urlPattern: ({ url }) => url.hostname === "www.omdbapi.com",
        handler: "NetworkFirst",
        options: {
          cacheName: "filmes",
          networkTimeoutSeconds: 3,
          cacheableResponse: { statuses: [0, 200] },
        },
      },
    ],
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
});
