import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from "vite-plugin-pwa";
const manifestForPlugIn = {
  registerType:'prompt',
  includeAssests:['favicon.ico', "apple-touc-icon.png", "masked-icon.svg"],
  manifest:{
    name:"React-vite-app",
    short_name:"react-vite-app",
    description:"I am a simple vite app",
    icons:[{
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
            src: "favicon.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "favicon.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
  ],
  theme_color:'#171717',
  background_color:'#f0e7db',
  display:"fullscren",
  scope:'/',
  start_url:"/",
  orientation:'portrait'
  }
}
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
  VitePWA(manifestForPlugIn)],
})

