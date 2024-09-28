import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "custom-hmr",
      handleHotUpdate({ file, server }) {
        // Check if the changed file matches your non-JS file types, e.g., .md
        if (file.endsWith("definition.sql")) {
          // Trigger a full reload
          server.ws.send({
            type: "full-reload",
            path: "*",
          });
        }
      },
    },
  ],
});
