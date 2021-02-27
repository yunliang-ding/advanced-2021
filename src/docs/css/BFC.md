# BCF

>BFC：Block Formatting Context（块级格式化上下文）
在解释什么什么是 BFC 之前，我们需要先知道 Box、Formatting Context 的概念

## Box：CSS 布局的基本单位

```
Box 是 CSS 布局的对象和基本单位，直观来说，一个页面有很多个 Box 组成的。

元素的类型和 display 属性，决定了这个 box 的类型。不同的 box，会参与不同的 Formatting Context（一个决定如何渲染文档的容器），因此 box 内的元素会以不同的方式渲染。
```

## 常见盒子:

- block-level box：display 属性为 block，list-item，table 的元素，会生成 block-level box

* inline-level box：display 属性为 inline，inline-block，inline-table 的元素，会生成 inline-level box

- run-in box：css3 特有

## Formatting Context:
```
Formatting Context 是 W3C CSS2.1 规范中的一个概念。
他是页面的一块渲染区域，并且有一套渲染规则，它决定了其子元素如何定位，以及和其他元素的关系和相互作用。
最常见的 Formatting Context 有 Block formatting context 和 Inline formatting context
```

