import { createPinia } from 'pinia'
import plugins from 'store/plugins'

const store = createPinia()

/**
 * plugins mount
 */
store.use(plugins)

export default store