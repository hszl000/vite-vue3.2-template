<template>
  <div>Home</div>
  <el-button v-drag @click="showLoading">按钮</el-button>
  <el-select v-model="value">
    <template #empty>
      <el-tree
        :data="data"
        :props="defaultProps"
        node-key="label"
        @node-click="handleNodeClick"
      />
    </template>
  </el-select>
  <el-button v-copy='value'>复制</el-button>
</template>

<script setup>
import { ref } from "vue";
import { ServiceLoading } from "widgets/loading.js";

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
</script>

<style lang='scss' scoped></style>