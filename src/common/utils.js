/**
 * 防抖动函数
 * @param {Object} func 回调函数
 * @param {Object} delay 延迟时间
 */
export function debounce(func, delay) {
  let timer = null
  return function(...args) {
    if (timer !== null) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
