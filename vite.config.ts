import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { regexRoutePlugin } from "./app/lib/regex-route-plugin";

export default defineConfig({
  plugins: [
    regexRoutePlugin(), // Set up Hono matcher
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
});
