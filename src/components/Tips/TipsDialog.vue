<template>
  <div class="manuscript-delete">
    {{ modelValue.content }}
  </div>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  ref
} from 'vue'
// import { useStore } from 'vuex'

export default defineComponent({
  name: 'TipsDidalog',
  components: {},
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return { content: '确认删除吗？' }
      }
    }
  },
  setup () {
  // Vuex store
    // const store = useStore()

    return {
    }
  }
})
</script>

<style scoped lang="scss">
.manuscript-delete {
color:#303133;
}
</style>
