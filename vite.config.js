import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 设置代理服务器 请求地址为http://127.0.0.1:5555/dev-api/http://127.0.0.1:19090/system 此时克服跨域问题 
  // 代理服务器只要发现url中存在dev-api就会替换得到 http://127.0.0.1:19090/system/...
  server: {
    proxy: {
      "/dev-api": {
        target: "http://127.0.0.1:19090/system",
        rewrite: (p) => p.replace(/^\/dev-api/, ""),
      },
    },
  },
})
