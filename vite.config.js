import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 配置 element-plus 自动引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// 导入 path
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  base:'/basis-templete-permissions',
  plugins: [
    vue(),
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
    })
  ],
  server: {
    port: 5000,
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
