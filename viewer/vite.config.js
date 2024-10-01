/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";
export default defineConfig({
    base: "./",
    esbuild: {
        supported: {
            "top-level-await": true,
        },
    },
    build: {
        outDir: "dist",
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`,
            },
        },
    },
});
//# sourceMappingURL=vite.config.js.map