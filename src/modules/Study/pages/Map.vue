<template>
<div>Map</div>
</template>

<script setup>
/**
 * Map:
 *    - Map 对象保存键值对,并且能够记住键的原始插入顺序.任何值(对象或者基本类型)都可作为一个键或者值.
 */

const contacts = new Map()

contacts.set('name','林大树')
contacts.set({name:'林大树'},'name')
console.log(contacts,'contacts')
console.log(contacts.entries())

for(let [key,value] of contacts.entries()){
  console.log(key,value)
}
</script>

<style lang='scss' scoped></style>