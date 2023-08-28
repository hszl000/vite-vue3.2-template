import {ref, unref} from 'vue'
import {ElMessageBox} from 'element-plus'

export function useNotification(){
  // 弹窗标志
  const flag = ref(false);
  // open
  function openNotification(){
    if(unref(flag)) return

    // 打开弹窗
    showElMessageBox(closeNotification);
    // 更新标志
    flag.value = true
  }

  // close
  function closeNotification(){
    // 关闭标志
    flag.value = false
  }

  return {
    openNotification,
    closeNotification
  }
}

function showElMessageBox(close){
  ElMessageBox.alert(
    '测试停机维护！',
    '通知',
    {
      // 渲染 HTML
      dangerouslyUseHTMLString: true,
      // 隐藏关闭按钮
      showClose:false,
      confirmButtonText:"退出系统"
    }
  ).then(()=>{
    close();
    window.close();
  })
}