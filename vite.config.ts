import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import CloudflarePagesFunctions from 'vite-plugin-cloudflare-functions'
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from 'unplugin-vue-components/resolvers';


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),
        CloudflarePagesFunctions(),
        Components({
            resolvers: [VantResolver()]
        })]
})
