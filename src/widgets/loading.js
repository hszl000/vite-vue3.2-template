import { nextTick } from 'vue'

import Lottie from 'lottie-web'

import { ElLoading } from 'element-plus'
import LoadingData from '@/assets/images/loading.json'

export class ServiceLoading {
  static instance = null
  isShow = false

  static show (options = {}) {
    const serviceOptions = Object.assign(
      {}, {
        text: 'Loading...'
      }, options)
    this.isShow = true

    this.instance = ElLoading.service(serviceOptions)
    nextTick(() => {
      const el = this.instance.$el.querySelector('.el-loading-spinner')
      const box = document.createElement('div')

      const spinner = document.createElement('div')
      spinner.style.height = '50px'

      const text = document.createElement('p')
      text.textContent = serviceOptions.text
      text.classList.add('el-loading-text')

      box.append(spinner, text)

      el.innerHTML = null
      el.append(box)

      const animationInstance = Lottie.loadAnimation({
        container: spinner,
        renderer: 'svg',
        loop: true,
        prerender: false,
        autoplay: true,
        autoloadSegments: false,
        animationData: LoadingData
      })
      animationInstance.resize()
    })
  }

  static async hide () {
    nextTick(() => {
      this.instance.close()
      this.isShow = false
    })
  }
}
