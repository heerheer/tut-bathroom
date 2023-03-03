import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from 'unplugin-vue-components/resolvers';
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        https: true
    },
    plugins: [
        vue(),
        basicSsl(),
        Components({
            resolvers: [VantResolver()]
        })],
})
