// 不太懂？
// 防抖 ：在refresh刷新时 每次都需要刷新30次 所以可以使用防抖 等待一段时间刷新
export function debounce(func, delay) {
  let timer = null

  return function (...args) {
    // 判断timer是否为空 不为空则清除timer
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      // ?
      func.apply(this, args)
    }, delay)
  }
}
