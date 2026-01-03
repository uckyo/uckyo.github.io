# 什么是JSX
JSX是JavaScript和XML(HTML)的缩写，表示在JS代码中编写HTML模板结构，它是React中编写UI模板的方式。
```jsx {3}
export default function App () {
    return (
        <div> I'm App </div>
    )
}
```
JSX并不是标准的JS语法，它是JS语法的扩展，浏览器本身不能识别，React通过编译生成虚拟Dom`VNode`，最后挂载到页面上。

# JSX中使用JS表达式
在JSX中只需要一对花括号`{ }`，就能通往JavaScript的世界:
```jsx {4}
export default function App () {
    const name = 'Jack'
    return (
        <div> Hello, My name is { name } </div>
    )
}
```
也就是说，只要在花括号里，你就可以写一切JavaScript表达式，只要它返回一个值。

只能在两个地方写花括号：

1、标签的子节点：
```jsx {2}
<h1> My name is {name} </h1>
<{tag}> My name is Jack </{tag}>   // [!code error]// wrong
```
2、标签的属性`=`号后面：
```jsx {2,3}
<img src={avatar} alt='avatar' />
<img src='{avatar}' alt='avatar' />  // [!code warning]// 这样只会传递字符串 '{avatar}'
<img {propName}='avatar' alt='avatar' /> // [!code error] // 属性名不能用大括号
```
# 条件渲染
有时候我们需要根据不同的条件来渲染不同的模板：
```jsx
export default function App () {
    const isLoading = false
    const flag = true
    return (
        <div>
            { flag && <div> content </div> } // [!code focus]
            { isLoading ? <div> Loading... </div> : <div> content </div> } // [!code focus]
        </div>
    )
}
```
# 列表渲染
列表渲染是开发中经常用到的：
```jsx {9}
export default function App () {
    const todoList = [
        {id:1,todo:'eat'},
        {id:2,todo:'code'},
        {id:3,todo:'sleep'},
    ]
    return (
        <ul>
            { todoList.map(item=><li key={item.id}>{item.todo}</li>) }
        </ul>
    )
}
```
::: tip 注意
key是必须的，需要使用一个独一无二的值，react diff算法中会用来提升渲染效率。
:::

# 事件绑定
## 基础用法
语法：on + 事件名称 = \{ 事件处理函数 \}
```jsx {6}
export default function App () {
    const handleClick = () => {
        alert('Clicked!')
    }
    return(
        <button onClick={ handleClick }> Click me </button>
    )
}
```
## 事件对象
React会在事件处理函数中传入事件对象event,可以在处理函数中选择接收。可以使用事件对象上的`preventDefault`方法阻止默认事件。

```jsx
export default function App () {
    const handleClick = (event) => {
        event.preventDefault()
        alert('Clicked!')
    }
    return (
        <a href='https://baidu.com' onClick={ handleClick }> baidu.com </a>
    )
}
```
## 参数传递
传参需要用到箭头函数：
```jsx
export default function App () {
    const handleClick = (e,message) => {
        event.preventDefault()
        alert(message)
    }
    return (
        <a 
            href='https://baidu.com' 
            onClick = { e => handleClick(e,'hello') }
        >
            baidu.com
        </a>
    )
}
```


# 样式
## 外部引入
需要先写一个css文件再引入进来：
::: code-group

```jsx [App.jsx]
import './App.css'

export default function App () {
    return (
        <span className='red'> I'm Red! </span>
    )
}
```

```css [App.css]
.red {
    color: red;
}
```
:::
::: tip 注意
这里定义类名使用的是`className`,而不是class。
:::
## 行内样式

行内样式需要给style属性一个对象。不能像vue那样写一个字符串。
```jsx
export default function App () {
    const liStyle = {
        fontSize: '24px',
        color: pink,
    }
    return (
        <ul>
            <li style={{color:'red'}}> I'm red. </li>
            <li style={ liStyle }> I'm big pink. </li>
            <li style="color:'red'"> I'm wrong. </li> // [!code error]
        </ul>
    )
}
```
