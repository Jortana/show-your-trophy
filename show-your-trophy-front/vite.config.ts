import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      dts: 'src/auto-import.d.ts',
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        }),
        ElementPlusResolver()
      ]
    }),
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      // '@': resolve('/src'), // 源码根目录
      '@img': resolve('/src/assets/img'), // 图片
      '@less': resolve('/src/assets/less'), // 预处理器
      '@libs': resolve('/src/libs'), // 本地库
      '@plugins': resolve('/src/plugins'), // 本地插件
      '@cp': resolve('/src/components'), // 公共组件
      '@pages': resolve('/src/pages') // 路由组件,
    }
  },
  server: {
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9003', //代理的地址
        changeOrigin: true,
        withCredentials: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
