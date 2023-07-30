import UnoCSS from 'unocss/vite'
import { resolve } from 'path'
import {
  defineConfig,
  externalizeDepsPlugin,
  loadEnv,
  swcPlugin,
  bytecodePlugin,
  splitVendorChunkPlugin
} from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig((args) => {
  const env = loadEnv(args.mode, process.cwd())
  return {
    main: {
      plugins: [swcPlugin(), externalizeDepsPlugin(), bytecodePlugin()]
    },
    preload: {
      plugins: [externalizeDepsPlugin()]
    },
    renderer: {
      server: {
        host: '0.0.0.0',
        proxy: {
          [`/${args.mode}`]: {
            target: env.RENDERER_VITE_BASE_URL,
            changeOrigin: true,
            secure: true,
            rewrite: (path): string => path.replace(new RegExp(`^/${args.mode}`), '')
          }
        }
      },
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer/src')
        }
      },
      plugins: [
        vue(),
        UnoCSS(),
        AutoImport({
          resolvers: [ElementPlusResolver()]
        }),
        Components({
          resolvers: [ElementPlusResolver()]
        }),
        splitVendorChunkPlugin()
      ]
    }
  }
})
