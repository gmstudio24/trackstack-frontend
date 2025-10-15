import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
        mkcert(),
    ],
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    server: {
        allowedHosts: ['fe.trackstack.test'],
    },
    define: {
        '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
    }
});
