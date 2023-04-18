import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 配置 element-plus 自动引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { terser } from 'rollup-plugin-terser'

// 导入 path
const path = require('path')

const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml (html) {
      return html.replace(/<title>(.*?)<\/title>/, '<title>system</title>')
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base:'/basis-templete-permissions/',
  plugins: [
    vue(),
    htmlPlugin(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      // 配置路径, 项目存放svg的目录
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
      symbolId: 'icon-[dir]-[name]'
    }),
    terser(
      {
        compress: {
          drop_console: true
        }
      }
    )
  ],
  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      },
      {
        find: 'store',
        replacement: path.resolve(__dirname, 'src/store')
      },
      {
        find: 'comps',
        replacement: path.resolve(__dirname, 'src/components')
      },
      {
        find: 'utils',
        replacement: path.resolve(__dirname, 'src/utils')
      },
      {
        find: 'modules',
        replacement: path.resolve(__dirname, 'src/modules')
      },
      {
        find: 'router',
        replacement: path.resolve(__dirname, 'src/router')
      },
      {
        find: 'widgets',
        replacement: path.resolve(__dirname, 'src/widgets')
      },
      {
        find: 'mixins',
        replacement: path.resolve(__dirname, 'src/mixins')
      }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/styles/element-variables.scss" as *;`,
      },
    },
  }
});
