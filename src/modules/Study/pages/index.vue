<template>
<div>
  <div>MDN 文档练习</div>
  <el-button @click='getName'>获取name</el-button>
  <el-button @click='upDateName'>更新name</el-button>
  <el-button @click='addHobby'>添加爱好</el-button>
  <el-button @click='removeHobby'>删除爱好</el-button>
  <div>代理对象：{{p}}</div>
  <div>目标对象：{{target}}</div>
</div>
</template>

<script setup>
// import {reactive} from '@/modules/Study/hooks/reactive'
/**
 * Proxy:
 *    - Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、
 * 赋值、枚举、函数调用等）
 *    - 
 */

const target = {
  name:'林大树',
  age:21
}

const p = new Proxy(target,{
  get(target,key,receiver){
    console.log(target,key,receiver)
    return Reflect.get(target,key,receiver)
  },
  set(target,key,value,receiver){
    console.log(target,key,value,receiver)
    return Reflect.set(target,key,value,receiver)
  },
  deleteProperty(target,key){
    return Reflect.deleteProperty(target,key)
  }
})

console.log(p)

const getName = ()=>{
  console.log(p.name)
}

const upDateName = ()=>{
  p.name = '朱丫头'
  console.log(p)
}

const addHobby = ()=>{
  p.hobby = '学习'
  console.log(p)
}

const removeHobby = ()=>{
  delete p.hobby
  console.log(p)
}

</script>

<style lang='scss' scoped></style>