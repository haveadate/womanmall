import Toast from './Toast.vue'

// 将组件封装成插件
const obj = {}

// 在使用Vue安装插件时，实际上是调用了插件对象的install方法
obj.install = (Vue) => {
  // 1.创建组件构造器对象
  const toastConstructor = Vue.extend(Toast)
  // 2.new的方式，根据组件构造器，可以创建一个组件对象
  const toast = new toastConstructor()
  // 3.将组件对象，手动挂载到某一个元素之上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el就是对应创建的div
  document.body.appendChild(toast.$el)
  // 5.将toast对象放到Vue的原型中
  Vue.prototype.$toast = toast
}

export default obj
