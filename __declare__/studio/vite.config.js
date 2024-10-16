import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import Pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        Pages({
            dirs: ["src/pages"],
        }),
    ],
    resolve: {
        alias: {
            components: "/src/components",
            pages: "/src/pages",
            lib: "/src/lib",
        },
    },
});
