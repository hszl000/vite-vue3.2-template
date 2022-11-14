<template>
  <div class="middle-tips">
    <el-popover
      v-model:visible="visible"
      placement="bottom"
      popper-class="operation-popover"
      :width="384"
      trigger="click"
      style="position: relative; height: 380px"
      @show="iconClick"
      @hide="iconHideClick"
    >
      <template #reference>
        <el-badge :value="badgeValue" class="link-badge-message" type="danger">
          <IconFont icon="news" class="news" />
          <span v-if="msgNumber && !isNaN(msgNumber)" class="msgNumber">
            <span style="margin: 0 3px">
              {{ msgNumber > 100 ? "99+" : msgNumber }}
            </span>
          </span>
        </el-badge>
      </template>
      <el-button link class="btn" @click="readFn"> 一键已读 </el-button>
      <div class="wrap-popover-content">
        <el-tabs
          v-model="activeNames"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane
            name="first"
            style="height: 332px; overflow-y: auto; overflow-x: hidden"
          >
            <template #label>
              <span>待办</span>
              <span style="margin-left: 3px">
                {{ todoList?.length ? todoList.length : 0 }}</span
              >
            </template>

            <!-- 待办内容 -->
            <template #default>
              <div v-if="todoList?.length">
                <div
                  v-for="(item, index) in todoList"
                  :key="index"
                  class="msgContent"
                  @click="stageClick(item)"
                >
                  <div class="message">
                    <span
                      style="
                        font-size: 14px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: #005dea;
                      "
                      >[待审批]
                    </span>
                    <span
                      style="
                        font-size: 14px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                      "
                      >{{ item.projectName }}</span
                    >
                  </div>
                  <div class="time">
                    {{
                      $filters.dateFilter(
                        item.createTime,
                        "YYYY-MM-DD HH:mm:ss"
                      )
                    }}
                  </div>
                  <el-divider />
                </div>
              </div>
              <div v-else class="unMessage">
                <div class="box">
                  <p>当前暂无消息</p>
                </div>
              </div>
            </template>
          </el-tab-pane>

          <el-tab-pane
            name="second"
            style="height: 332px; overflow-y: auto; overflow-x: hidden"
          >
            <template #label>
              <span>消息</span>
              <span> ({{ msgList?.length ? msgList.length : 0 }})</span>
            </template>

            <!-- 消息内容 -->
            <template #default>
              <div v-if="msgList?.length">
                <div
                  v-for="(item, index) in msgList"
                  :key="index"
                  class="msgContent"
                >
                  <div class="message" @click="msgClick(item)">
                    <span
                      v-if="JSON.parse(item.content).actionName === '派遣'"
                      style="
                        font-size: 14px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 700;
                        color: #005dea;
                      "
                      >[{{ JSON.parse(item.content).actionName }}]
                    </span>
                    <span
                      v-if="JSON.parse(item.content).actionName === '批准'"
                      style="
                        font-size: 14px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 700;
                        color: #005dea;
                      "
                      >[{{ JSON.parse(item.content).actionName }}]
                    </span>
                    <span
                      v-if="JSON.parse(item.content).actionName === '取消派遣'"
                      style="
                        font-size: 14px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 700;
                        color: #909399;
                      "
                      >[{{ JSON.parse(item.content).actionName }}]
                    </span>
                    <span
                      v-if="JSON.parse(item.content).actionName === '拒绝申请'"
                      style="
                        font-size: 14px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 700;
                        color: #d40000;
                      "
                      >[{{ JSON.parse(item.content).actionName }}]
                    </span>
                    <span
                      style="
                        font-size: 14px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                      "
                      >{{ JSON.parse(item.content).title }}</span
                    >
                  </div>
                  <div class="time">
                    {{
                      $filters.dateFilter(
                        JSON.parse(item.content).createTime,
                        "YYYY-MM-DD HH:mm:ss"
                      )
                    }}
                  </div>
                  <el-divider />
                </div>
              </div>
              <div v-else class="unMessage">
                <div class="box">
                  <p>当前暂无消息</p>
                </div>
              </div>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-popover>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  computed,
  getCurrentInstance,
  watch,
  defineExpose,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserAccountStore } from "modules/UserAccount/store";
import { useLayoutStore } from "comps/Layout/store";

const userAccountStore = useUserAccountStore();
const layoutStore = useLayoutStore();
// export default {
//   name: 'HelloWorld',
//   data () {
//     return {
//       data: 0,
//       timeout: 28 * 1000, // 30秒一次心跳
//       timeoutObj: null, // 心跳心跳倒计时
//       serverTimeoutObj: null, // 心跳倒计时
//       timeoutnum: null, // 断开 重连倒计时
//       websocket: null
//     }
//   },
//   computed: {
//     ...mapState({
//       userCode: state => state.WorkingCalendar.userInfo.result.userCode
//     })
//   },
//   created () {
//     // 初始化websocket
//     this.initWebSocket()
//   },

//   methods: {
//     initWebSocket () {
//       const token = 'bbd27576-b781-4224-9e90-aaf8d0aab1ba'
//       console.log(this.userCode, '////')
//       this.websocket = new WebSocket(`ws://172.30.32.159:31000/employee-assignment/api/websocket/${this.userCode}?token=${token}`)
//       // 连接错误
//       this.websocket.onerror = this.setErrorMessage

//       // 连接成功
//       this.websocket.onopen = this.setOnopenMessage

//       // 收到消息的回调
//       this.websocket.onmessage = this.setOnmessageMessage

//       // 连接关闭的回调
//       this.websocket.onclose = this.setOncloseMessage

//       // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
//       window.onbeforeunload = this.onbeforeunload
//     },
//     reconnect () { // 重新连接
//       if (this.lockReconnect) return
//       this.lockReconnect = true
//       // 没连接上会一直重连，设置延迟避免请求过多
//       this.timeoutnum && clearTimeout(this.timeoutnum)
//       this.timeoutnum = setTimeout(() => {
//         // 新连接
//         this.initWebSocket()
//         this.lockReconnect = false
//       }, 5000)
//     },
//     reset () { // 重置心跳
//       // 清除时间
//       clearTimeout(this.timeoutObj)
//       clearTimeout(this.serverTimeoutObj)
//       // 重启心跳
//       this.start()
//     },
//     start () { // 开启心跳
//       this.timeoutObj && clearTimeout(this.timeoutObj)
//       this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
//       this.timeoutObj = setTimeout(() => {
//         // 这里发送一个心跳，后端收到后，返回一个心跳消息，
//         if (this.websocket && this.websocket.readyState === 1) { // 如果连接正常
//           this.websocketsend('heartbeat')
//         } else { // 否则重连
//           // this.reconnect()
//         }
//         this.serverTimeoutObj = setTimeout(() => {
//           // 超时关闭
//           this.websocket.close()
//         }, this.timeout)
//       }, this.timeout)
//     },
//     setOnmessageMessage (event) {
//       console.log(event, '/////')
//       const obj = JSON.parse(event.data)
//       console.log('obj', obj)
//       switch (obj.type) {
//         case 'heartbeat':
//           // 收到服务器信息，心跳重置
//           this.reset()
//           break
//         case 'sendMessage':
//           this.data = obj.data
//           console.log('接收到的服务器消息：', obj.data)
//       }
//     },
//     setErrorMessage () {
//       // 重连
//       // this.reconnect()
//       console.log('WebSocket连接发生错误' + '   状态码：' + this.websocket.readyState)
//     },
//     setOnopenMessage () {
//       // 开启心跳
//       this.start()
//       console.log('WebSocket连接成功' + '   状态码：' + this.websocket.readyState)
//     },
//     setOncloseMessage () {
//       // 重连
//       // this.reconnect()
//       console.log('WebSocket连接关闭' + '   状态码：' + this.websocket.readyState)
//     },
//     onbeforeunload () {
//       this.closeWebSocket()
//     },
//     // websocket发送消息
//     websocketsend (messsage) {
//       this.websocket.send(messsage)
//     },
//     closeWebSocket () { // 关闭websocket
//       this.websocket.close()
//     }
//   }
// }
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();

onMounted(() => {
  getTodoList();
});

// const websocket = ref(null)
// const token = 'bbd27576-b781-4224-9e90-aaf8d0aab1ba'
// const getData = () => {
//   // 判断当前浏览器是否支持WebSocket
//   if ('WebSocket' in window) {
//     // 改成你的地址
//     websocket.value = new WebSocket(`ws://172.30.32.159:31000/employee-assignment/api/websocket/100?token=${token}`)
//   } else {
//     alert('当前浏览器 Not support websocket')
//   }

//   // 连接发生错误的回调方法
//   websocket.value.onerror = function () {
//     setMessageInnerHTML('WebSocket连接发生错误')
//   }

//   // 连接成功建立的回调方法
//   websocket.value.onopen = function () {
//     setMessageInnerHTML('WebSocket连接成功')
//   }
//   // 接收到消息的回调方法
//   websocket.value.onmessage = function (event) {
//     console.log(event.data)
//     setMessageInnerHTML(event.data)
//     // setechart()
//   }

//   // 连接关闭的回调方法
//   websocket.value.onclose = function () {
//     setMessageInnerHTML('WebSocket连接关闭')
//   }

//   // 将消息显示在网页上
//   function setMessageInnerHTML (innerHTML) {
//     console.log(innerHTML)
//   }
// }

// UnonMounted(() => {
//   websocket.value.close()
// })

const badgeValue = ref("");
const activeNames = ref("first"); // 默认显示消息

const userCode = computed(() => userAccountStore.getUserInfo.userCode);
// // -----------------------------------获取消息列表----------------------------------

const msgList = ref([]); // 消息列表

const messageList = async () => {
  // 获取消息列表
  const { error, result } = await layoutStore.askMsgList({
    code: userCode.value,
  });
  if (!error) {
    msgList.value = result;
  }
};

watch(
  () => userCode.value,
  (newVal) => {
    if (newVal) {
      messageList();
    }
  },
  {
    immediate: true,
  }
);

// // ------------------------------------获取待办列表-----------------------------
const todoList = ref([]);
const getTodoList = async () => {
  const { error, result } = await layoutStore.askTodoList();
  if (!error) {
    todoList.value = result;
  }
};

// 铃铛消息数量显示
const msgNumber = computed(() => {
  const msgListLength = msgList.value?.length;
  const todoListLength = todoList.value?.length;
  const addNumber = msgListLength + todoListLength;
  return addNumber;
  // return addNumber > 100 ? '99+' : addNumber
});
const permissionList = computed(() => userAccountStore.getPermissionList);
// // 点击待办状态跳转页面
const stageClick = (item) => {
  if (permissionList.value.includes("2-3")) {
    if (item.state === "0" || item.state === "3") {
      router.push(`/apply?id=${item.id}`);
      iconHide();
    } else {
      router.push(`/detailsSubmit?id=${item.id}`);
      iconHide();
    }
  }
};
// 点击待办隐藏el-popover事件
const visible = ref(null);
const iconHide = () => {
  visible.value = false;
};

const tabStatus = ref(false);
const handleClick = (tab) => {
  if (tab.props.name === "second") {
    tabStatus.value = true;
  }
};

// 铃铛点击打开事件
const iconClick = () => {
  tabStatus.value = false;
  visible.value = true;
  messageList();
  getTodoList();
  activeNames.value = "first";
};
// 铃铛点击关闭事件
const iconHideClick = async () => {
  // if (tabStatus.value) {
  //   const { error } = await store.dispatch(
  //     'UserAccount/delMessageList', {
  //       code: ''
  //     } // 登陆人的usercode
  //   )
  //   if (!error) {
  //     messageList() // 更新消息列表
  //   }
  // }
  iconHide();
  messageList();
};

// 一键已读
const readFn = async () => {
  const { error, result } = await layoutStore.delUserAllMsg({
    code: userCode.value,
  });
  if (!error) {
    messageList();
    getTodoList();
  }
};
// 一分钟调用一次
window.setInterval(() => {
  setTimeout(() => {
    messageList();
    getTodoList();
  }, 0);
}, 60000);

// 暴露组件数据
defineExpose({
  messageList,
});
</script>

<style lang='scss' scoped>
.middle-tips {
  :deep() {
    .link-badge-message {
      position: relative;
      // margin-right: 22px;
      cursor: pointer;
      font-size: 18px;
      .msgNumber {
        position: absolute;
        top: 2px;
        right: -2px;
        border-radius: 50%;
        background: #d52d2d;
        -webkit-transform-origin-x: 0;
        -webkit-transform: scale(0.6);
        text-align: center;
        padding: 4px;
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #f7f8fa;
        line-height: 14px;
      }
      .news {
        width: 20px;
        height: 20px;
        color: var(--el-color-primary-light-7);
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}
.wrap-popover-content {
  padding: 0 10px;
  .msgContent {
    // height: 190px;
    overflow-y: auto;
    overflow-x: hidden;
    cursor: pointer;
    color: #303133;
    padding: 10px 10px 0 10px;
    &:hover {
      background: #f2f3f5;
    }
  }
}
.unMessage {
  text-align: center;
  margin-top: 95px;
}

.btn {
  position: absolute;
  right: 16px;
  top: 25px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #909399;
  z-index: 99;
  &:hover {
    cursor: pointer;
    color: #005dea;
  }
}
:deep() {
  .el-divider--horizontal {
    margin: 10px 0 0;
  }
}
.time {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #909399;
  margin-top: 5px;
}
:deep() {
  .el-tabs__nav-wrap {
    height: 48px;
  }
  .el-tabs__item {
    height: 48px;
    line-height: 48px;
    padding: 0 10px;
  }
  .el-tabs__nav-wrap::after {
    background: none;
    border-bottom: 1px solid #dcdee0;
  }
  .el-tabs__active-bar {
    background: none;
    border-bottom: 3px solid #005dea;
  }
  .el-tabs__header {
    margin: 0;
  }
}
</style>
<style>
.el-popper.operation-popover[data-popper-placement^="bottom"]
  > .el-popper__arrow {
  display: none;
}
</style>
