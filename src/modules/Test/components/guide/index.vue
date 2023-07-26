<template>
<div class='guide-box'>
  <div @click='startGuide'>教学</div>
  <div id="guide">vue</div>
  <div id="guide2">vue2</div>
  <div id="guide3">vue3</div>
</div>
</template>

<script setup>
import { onBeforeUnmount, onMounted,ref } from 'vue'
import Guide from 'modules/Test/hooks/guide'

const guide = ref(null)
onMounted(()=>{
})

onBeforeUnmount(()=>{
  if(guide.value){
    guide.value.end()
  }
})

const startGuide = ()=>{
  guide.value = new Guide([
    {
      id:'#guide',
      title:'vue',
      content:'作者：尤玉溪',
    },
    {
      id:'#guide2',
      title:'vue2',
      content:'甚至被国外互联网公司广泛应用',
    },
    {
      id:'#guide3',
      title:'vue3',
      content:'vue3巩固了国内前端框架的地位！',
    }
  ])
  console.log(guide.value.setOptions())
  console.log(guide.value.start())
}
</script>

<style lang='scss' scoped>
.guide-box{
  display: flex;
  justify-content: space-between;

}
</style>