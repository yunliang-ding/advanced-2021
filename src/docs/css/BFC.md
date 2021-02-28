# BCF

## FC实现原理，可以解决的问题，如何创建BFC
>[参看](https://www.jb51.net/css/598508.html)
>简单来说，BFC就是一个独立不干扰外界也不受外界干扰的盒子啊

## 触发 BFC
```
只要元素满足下面任一条件即可触发 BFC 特性：
body 根元素
浮动元素：float 除 none 以外的值
绝对定位元素：position (absolute、fixed)
display 为 inline-block、table-cells、flex
overflow 除了 visible 以外的值 (hidden、auto、scroll)
```
## BFC 特性及应用
1. 同一个 BFC 下外边距会发生折叠
2. BFC 可以包含浮动的元素（清除浮动）
3. BFC 可以阻止元素被浮动元素覆盖

