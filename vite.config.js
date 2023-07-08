import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      formats: ["umd"],
      entry: resolve(__dirname, "src/index.js"),
      name: "schema-form",
      fileName: (format) => `schema-form.${format}.js`,
    },
    external: ["vue"],
    output: {
      globals: {
        vue: "Vue",
      },
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
