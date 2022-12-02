<template>
  <div>
    <el-input
      v-model="num"
      placeholder="Please input"
      :formatter="(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
      :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
      @input='handleChange'
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const num = ref(null);
setTimeout(()=>{
  num.value = 111222333
},2000)

const handleChange = (val)=>{
  console.log(val)
}
</script>

<style lang='scss' scoped></style>