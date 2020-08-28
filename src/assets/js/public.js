//防抖函数
export function debounc(fn,delay){
    let time = null
    if(time) clearTimeout(time)
    time=setTimeout(() => {
        fn()
    }, delay);
}