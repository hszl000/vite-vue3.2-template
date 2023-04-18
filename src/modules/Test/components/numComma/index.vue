<template>
  <div>
    <el-input
      v-model="num"
      placeholder="Please input"
      :formatter="handleFormatter"
      :parser="handleParser"
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

const handleFormatter = (value) => {
  value = `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  console.log(value,'handleFormatter')
  return value
}

const handleParser = (value) => {
  value = value.replace(/\$\s?|(,*)/g, '')
  console.log(value,'handleParser')
  return value
}
</script>

<style lang='scss' scoped></style>