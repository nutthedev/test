import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
export default defineConfig({
    plugins: [nodePolyfills()],
    define: {
        'process.env': process.env,
        'globalThis.Buffer': 'undefined',
    },
    build: {
        rollupOptions: {
            external: ['bootstrap'],
            input: {
                main: path.resolve(__dirname, 'index.html')
            },
        },
    }
});