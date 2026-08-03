import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // Résolution des alias `~/*` gérée nativement par Vite via les paths du tsconfig.
  resolve: { tsconfigPaths: true },
  plugins: [tailwindcss(), reactRouter()],
});
