<template>
  <el-row>
    <el-col :span="6" v-for='(item,index) in list' :key='index'>
      <cardCom  :cardData='item' />
    </el-col>
  </el-row>
</template>

<script>
import card from '@/modules/Test/components/card/index.vue'
import {ElRow,ElCol} from 'element-plus'
export default {
  name:'Test',
  components:{
    cardCom:card,
    ElRow,ElCol
  },
  data(){
    return {
      list:[
        {
        tag:"0",
        title:'1111111',
        description:'审计发现问题',
        unit1:'2456',
        unit2:'12',
      },
      {
        tag:"0",
        title:'2222222',
        description:'审计发现问题',
        unit1:'2456',
        unit2:'12',
      },
      {
        tag:"0",
        title:'3333333',
        description:'审计发现问题',
        unit1:'2456',
        unit2:'12',
      },
      {
        tag:"0",
        title:'3333333',
        description:'审计发现问题',
        unit1:'2456',
        unit2:'12',
      }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
:deep(.el-col-6){
  min-width: 250px;
}

</style>