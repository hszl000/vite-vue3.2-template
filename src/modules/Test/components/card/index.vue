<template>
  <div class='currentBox'>
    <div class='tags'>
      <!-- 类别 -->
      <div class='tag' :style="{background:tagMap[cardData.tag].color}">{{tagMap[cardData.tag].category}}</div>
      <!-- 名称 -->
      <div class="name">
        <!-- 标题 -->
        <div class='title'>{{cardData.title}}</div>
        <!-- 描述 -->
        <div class='description'>{{cardData.description}}</div>
      </div>
    </div>
    <div class='footer'>
      <!-- 个数 -->
      <div><span class='fontSize'>{{cardData.unit1}}</span>个</div>
      <!-- 单位 -->
      <div><span class='fontSize'>{{cardData.unit2}}</span>家单位</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Caed',
  props:{
    // 需要父组件传递一个对象
    cardData:{
      type:Object,
      // 假数据
      default:()=>({
        tag:"0",
        title:'资产处置收入未及时上缴财政',
        description:'审计发现问题',
        unit1:'2456',
        unit2:'12',
      })
    }
  },
  data(){
    return {
      // 映射表
      tagMap:{
        "0":{
          color:'red',
          category:'一类'
        },
        "1":{
          color:'orange',
          category:'二类'
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.currentBox{
  margin: 10px;
  box-shadow: 0px 2px 10px 0px rgba(177,192,221,0.149);
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #BFCAD7;

    .tags{
      width: 100%;
      margin-top: 17px;
      display: flex;
      border-bottom: 2px dashed #ccc;
      .tag{
        padding: 1px 8px;
        width: 36px;
        height: 23px;
        border-radius: 0px 15px 15px 0px;
        margin-right: 15px;
      }

      .name{
        flex:1;
        .title{
          max-width: calc(100% - 20px);
          font-size: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .description{
          margin: 15px 0;
          font-size: 12px;
          color:#ccc;
        }
      }
    }
    .footer{
      display: flex;
      justify-content: space-between;
      padding: 20px;
      font-size: 12px;
        color:#ccc;

      .fontSize{
        font-size: 20px;
        color:#000;
        margin-right: 5px;
      }
    }
  }
</style>