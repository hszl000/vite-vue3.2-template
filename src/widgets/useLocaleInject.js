import { useLocale } from 'element-plus'

export default {
  install(app) {
    app.config.globalProperties.$t = function (str) {
      return useLocale().t(str)
    }
  }
}
