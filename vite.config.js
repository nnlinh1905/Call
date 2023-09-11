import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) =>
  defineConfig({
    plugins: [react()],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
    build: {
      chunkSizeWarningLimit: 100000000,
    },
  });
// export default {
//   root: "./",
//   base: "/",
//   build: {
//     chunkSizeWarningLimit: 100000000,
//     outDir: "dist",
//     assetsDir: "assets",
//     rollupOptions: {
//       input: "app.jsx",
//     },
//   },
// };

// import reactRefresh from "@vitejs/plugin-react-refresh";

// export default {
//   plugins: [reactRefresh()],
//   build: {
//     chunkSizeWarningLimit: 100000000,
//   },
// };
