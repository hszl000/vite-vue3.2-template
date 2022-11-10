
/**
 * plugin single mounted
 */

// import { filterResponse } from '@/store/utils/mixin'
// import router from '@/router'
import { filterResponse } from 'store/utils/mixin'
import router from 'router'

const mixinVuex = context => {
  context.store.filterResponse = filterResponse
  context.store.router = router
  // console.log(context,'context')
}

export default mixinVuex
