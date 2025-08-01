import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        cart: resolve(__dirname, "cart.html"),
        index_b: resolve(__dirname, "index_b.html"),
        lookbook: resolve(__dirname, "lookbook_a.html"),
        lookbook_b: resolve(__dirname, "lookbook_b.html"),
        lookbook: resolve(__dirname, "lookbook.html"),
        product1: resolve(__dirname, "product1.html"),
      },
    },
  },
});
