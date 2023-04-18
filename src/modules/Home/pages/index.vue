<template>
  <div>
    <div>Home</div>
    <el-button v-drag @click="showLoading">拖拽 loading</el-button>
    <el-select v-model="value" clearable>
      <template #empty>
        <el-tree
          :data="data"
          :props="defaultProps"
          node-key="label"
          @node-click="handleNodeClick"
        />
      </template>
    </el-select>
    <el-button v-copy="value">复制</el-button>
    <el-button @click="toggleLayout">切换布局</el-button>
    <el-button v-longpress="longpress">长按触发</el-button>
    <el-input
      placeholder="防抖"
      style="width: 200px"
      v-debounce="debounce"
      v-model="value"
    />
    <el-button @click='testModal'>测试Modal</el-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ServiceLoading } from "widgets/loading.js";
import { storeToRefs } from "pinia";
import { useLayoutStore } from "comps/Layout/store";
import {useModal} from 'comps/Modal/useModal.js'

const layoutStore = useLayoutStore();
const { layoutFormat } = storeToRefs(layoutStore);
const value = ref("");

const handleNodeClick = (data) => {
  console.log(data.label);
  value.value = data.label;
};
const focusFn = (e) => {
  console.log(e, "e");
};

const data = [
  {
    label: "Level one 1",
    children: [
      {
        label: "Level two 1-1",
        children: [
          {
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 2",
    children: [
      {
        label: "Level two 2-1",
        children: [
          {
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        label: "Level two 2-2",
        children: [
          {
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 3",
    children: [
      {
        label: "Level two 3-1",
        children: [
          {
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        label: "Level two 3-2",
        children: [
          {
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
];

const defaultProps = {
  children: "children",
  label: "label",
};

const showLoading = () => {
  ServiceLoading.show();
  setTimeout(() => {
    ServiceLoading.hide();
  }, 2000);
};

const toggleLayout = () => {
  if (["left"].includes(layoutFormat.value)) {
    layoutFormat.value = "top";
  } else {
    layoutFormat.value = "left";
  }
};

const longpress = () => {
  alert("长按触发");
};

const debounce = () => {
  console.log("防抖");
};

// 测试 Modal
const testModal = ()=>{
  const {Modal} = useModal()
  console.log(Modal,'Modal')
}
</script>

<style lang='scss' scoped></style>