# 组件
react中，分为`类组件`和`函数式组件`，由于`Hook`的大行其道，类组件已经淡出我们的视野了。react官方也推荐我们使用函数式组件。

# 定义
函数式组件，它就是一个函数：名称以大写开头，返回一段JSX模板的函数。
```jsx
function App () {
    return (
        <div> I'm App </div>
    )
}
```
# 导入导出
可以把导入的子组件当一个标签来使用，子组件的内容将渲染在这。
::: code-group
```jsx [App.jsx]
import Son from './Son.jsx'
function App () {
    return (
        <Son />
    )
}
export default App
```

```jsx [Son.jsx]
function Son () {
    return (
        <span> I'm son </span>
    )
}
export default Son
```
:::
# 组件间通信
## 父传子
react中父组件向子组件传递参数用的是props，直接在子组件标签上写属性，子组件就可以在函数的参数中拿到了。
```jsx
function Son (props) {
    const { name } = props
    return (
        <span>{ name }</span>
    )
}

export default function App () {
    return (
        <Son name='Jack'/>
    )
}
```
可以直接在参数位置就解构，这样还可以给props设置默认值。
```jsx
function Son ({name='Lily'}) {
    return (
        <span>Hello, My name is {name}</span>
    )
}

export default function App () {
    return (
        <Son name='Jack'/>
    )
}
```
子组件标签间的内容，也就是子节点内容会被当作`children`prop传入子组件。
```jsx
function Card ({children}) {
    return (
        <div className="card">
            {children}
        </div>
    )
}

export default function App () {
    return (
        <Card> whatever </Card>
    )
}
```
::: tip 注意
react遵循单向数据流，不要在子组件中直接修改props的值。
可以由父组件传递一个修改函数，子组件调用这个函数来实现修改。
:::

## 子传父
子传父需要父组件向子组件传递一个函数，由子组件调用这个函数来向父组件传值。

```jsx
import {useState} from "react"

function Son({add}) {
    return (
        <button onClick={() => add(2)}>add</button>
    )
}

export default function App() {
    let [count, setCount] = useState(0)
    const add = num => setCount(count + num)
    return (
        <div>
            {count}
            <Son add={add}/>
        </div>
    )
}
```
::: tip 注意
直接使用`let count = 0`这样数据不是响应式的，即使改变了count的值，页面也不会随之改变。
需要使用`useState`钩子来创建响应式数据。详情请到[useState](/Notes/Frontend/React/Hooks#usestate)。
:::

## 祖先后代通信
实际项目中，组件嵌套层级过多，如果还使用props就得自上向下逐层传递，麻烦又难以维护，
react给我提供了一个`useContext`钩子，完美的解决了这个问题。
详情请到[useContext](/Notes/Frontend/React/Hooks#usecontext)。
