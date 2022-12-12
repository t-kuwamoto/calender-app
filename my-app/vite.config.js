import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
const path = require("path");

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.jsx',
            ],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@project": path.resolve(
                __dirname,
                "resources/js/"
            ),
            "@atoms": path.resolve(
                __dirname,
                "resources/js/Components/Atoms/"
            ),
            // "@molecules": path.resolve(
            //     __dirname,
            //     "resources/js/Components/Molecules/"
            // ),
            // "@organisms": path.resolve(
            //     __dirname,
            //     "resources/js/Containers/Organisms/"
            // ),
            // "@pages": path.resolve(
            //     __dirname,
            //     "resources/js/Containers/Pages/"
            // ),
            // "@hooks": path.resolve(
            //     __dirname,
            //     "resources/js/Hooks/"
            // ),
            // "@helpers": path.resolve(
            //     __dirname,
            //     "resources/js/Helpers/"
            // ),
            // "@configs": path.resolve(
            //     __dirname,
            //     "resources/js/Configs/"
            // ),
            // "@interfaces": path.resolve(
            //     __dirname,
            //     "resources/js/Interfaces/"
            // ),
            // "@templates": path.resolve(
            //     __dirname,
            //     "resources/js/Containers/Templates/"
            // ),
        },
    },
});
