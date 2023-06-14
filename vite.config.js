import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/high-low-game/',
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTest.js',
    },
});
