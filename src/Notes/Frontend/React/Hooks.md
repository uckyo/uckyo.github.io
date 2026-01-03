# Hooks
react内置了众多hooks，可以方便我们的开发。
这里是[官方文档](https://react.dev/reference/react/hooks)。这里仅介绍常用的几个hook。
# useState
## 语法
```jsx
const [state,setState] = useState(initialState)
```
::: tip 注意
`useState`是一个hook，所以你只能在你的组件的顶层或者你自己的hook中调用它。你不能在循环或条件中调用它。如果需要，提取一个新组件并将状态移到其中。
:::

## 基本用法
在组件的顶层调用`useState`可以帮你的组件创建一个状态(响应式数据)。

`useState`返回一个只有两个元素的数组：
1. 当前状态的变量，值为你提供的初始值。
2. 可以修改此状态为任意值的`set函数`以响应交互。
```jsx
import { useState } from 'react'

function MyComponent() {
  const [age, setAge] = useState(28)
  const [name, setName] = useState('Taylor')
  const [todos, setTodos] = useState(() => createTodos())
  // ...
}
```
只有调用状态对应的`set方法`去改变状态才可以使视图随之改变(响应式)。
```jsx
import { useState } from 'react'

function App () {
    const [count, setCount] = useState(0)
    
    const handleClick = () => {
        count = count + 1 // [!code --]
        setCount(count + 1) // [!code ++]
    }
    
    return (
        <button onClick={ handleClick }>{ count }</button>
    )
}
```
::: tip 注意
调用`set函数`不会改变已执行代码的当前状态：
```jsx
function handleClick() {
    setCount(count + 1)
    console.log(count) // Still 0!
}
```
直到下一次渲染完毕后，它的值才会变化。
:::
## 根据上一个状态来更新状态
下面的函数调用了setCount(count +1 )三次
```jsx
function handleClick() {
    setCount(count + 1) // setCount(0 + 1)
    setCount(count + 1) // setCount(0 + 1)
    setCount(count + 1) // setCount(0 + 1)
}
```
但是你点击过后，count的值是1而不是3！这是因为`set函数`是异步的，直到下一次渲染之前，count的值还是0，这里相当于调用了`setCount(0+1)`三次。

要解决这个问题，你可以传递一个更新函数给setCount，而不是一个值。
```jsx
function handleClick() {
    setCount(preCount => preCount + 1) // setCount(0 + 1)
    setCount(preCount => preCount + 1) // setCount(1 + 1)
    setCount(preCount => preCount + 1) // setCount(2 + 1)
}
```
## 更新状态中的对象和数组
state也可以初始化为对象或数组。
在React中，如果下一个状态等于上一个状态，React将忽略你的更新，这是通过 Object.is 比较确定的。
所以你应该替换它，而不是改变你现有的对象。例如，如果你有一个 form 对象在状态中，改变它属性的值并不会触发重新渲染，因为它的地址值没有变化：
```jsx
// 🚩 Don't mutate an object in state like this:
form.firstName = 'Taylor'
```
应该创建一个新对象来替换整个对象：
```jsx
// ✅ Replace state with a new object
setForm({
  ...form,
  firstName: 'Taylor'
});
```

## 避免重复创建初始状态
React只保存初始状态一次，并在下一次渲染时忽略它。
但如果你的初始值是由一个初始化函数的返回值得来的，React仍然会在每次重新渲染时调用它来确认初始值有没有变化。
如果用来创建大型数组或进行复杂的计算，就会造成性能浪费。
```jsx
function TodoList() {
    const [todos, setTodos] = useState(createInitialTodos())
    // ...
}
```
要解决这个问题，你只需要传递初始化函数本身，而不是它调用后的返回值，react只会在初始化时调用它一次。
```jsx
function TodoList() {
    const [todos, setTodos] = useState(createInitialTodos)
    // ...
}
```
# useReducer
在使用`useState`时,如果修改state的方法过多，逻辑就会比较分散，不利于维护。
`useReducer` 与 `useState` 非常相似，但它允许您将状态更新逻辑从事件处理程序移动到组件外部的单个函数中。

## 语法
```
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```
::: tip 参数与返回值
参数：
   1. reducer : reducer函数，指定状态如何更新。它必须是纯的，应该把状态和动作作为参数，并且应该返回下一个状态。状态和动作可以是任何类型。
   2. initialArg ：计算初始状态的值。它可以是任何类型的值。如何从它计算初始状态取决于下一个 init 参数。
   3. init(可选) ：初始化器函数应该返回初始状态。如果未指定，则初始状态设置为 initialArg 。否则，初始状态被设置为调用 init(initialArg) 的结果。

返回值：

   useReducer 返回一个只有两个值的数组：
   1. 当前状态。在第一次渲染期间，它被设置为 init(initialArg) 或 initialArg （如果没有 init ）。
   2. dispatch 函数，用于将状态更新为不同的值并触发重新渲染。
:::

## 用法
在外部定义reducer函数，然后用dispatch函数来指定修改的方法：
```jsx
import { useReducer } from 'react'

function reducer(state, action) {
   if (action.type === 'incremented_age') {
      return {
         age: state.age + 1
      }
   }
   throw Error('Unknown action.')
}

export default function Counter() {
   const [state, dispatch] = useReducer(reducer, { age: 42 });

   return (
           <>
              <button onClick={() => dispatch({ type: 'incremented_age' })}>
                 Increment age
              </button>
              <p>Hello! You are {state.age}.</p>
           </>
   )
}

```

::: tip 注意
和useState一样，应该在reducer方法里面返回新的state，而不是修改它。

如果用初始化方法初始化复杂数据，请使用第三个参数。
```jsx
function recuder(state,action){
    // ...
}

function createInitialState(username) {
  // ...
}

function TodoList({ username }) {
  const [state, dispatch] = useReducer(reducer, username, createInitialState);
  // ...
}
```
:::

# useEffect
## 语法
```
useEffect(setup, dependencies?)
```
`useEffect` hook我们通常称之为清理副作用钩子，一切会产生副作用的代码，我们都放在这个钩子里执行。
某些组件在页面上显示时需要保持与网络、某些浏览器API或第三方库的连接。这些系统不受React控制，所以它们被称为外部系统。
比如：
- 网络请求 (fetch)
- 浏览器API (定时器等)
- 第三方库的连接 (eCharts)

## 连接到外部系统
要将组件连接到某个外部系统，请在组件的顶层调用 useEffect ：
```jsx
import { useEffect } from 'react'
import { createConnection } from './chat.js'

function ChatRoom({ roomId }) {
    const [serverUrl, setServerUrl] = useState('https://localhost:1234')

    useEffect(() => { // setup function
        const connection = createConnection(serverUrl, roomId)
        connection.connect()
        return () => { // cleanup function
            connection.disconnect()
        };
    }, 
        [serverUrl, roomId] // dependencies
    )
    // ...
}
```
需要传递两个参数给 `useEffect` ：
1. 带有连接到该系统的设置代码的设置函数。它应该返回一个清理函数，其中包含与该系统断开连接的清理代码。
2. 依赖项列表，包括这些函数内部使用的组件中的每个值。
## 执行时机
React会在必要时调用你的`setup`函数和`cleanup`函数，这可能会发生多次：
1. 组件挂载到页面时会运行`setup`函数。
2. 每次重新渲染后依赖项有变化时：
   - 首先，`cleanup`函数使用旧的props和state运行。
   - 然后，`setup`函数将使用新的props和state运行。
3. 组件从页面中移除后（卸载），会最后一次运行`cleanup`函数。

::: tip 注意
1. 不写第二个参数时(依赖项为undefined),每次组件重新渲染都会调用`setup`函数。
2. 当依赖项为空数组时，`setup`函数只会在初次渲染时运行一次。

可以根据实际情况调整策略。
:::
# useContext
React中组件间的数据通信是通过props进行的，如果组件嵌套层级过多，
props就显得有些麻烦，useContext就是为了解决这一问题的。

## 用法
首先我们得有一个数据提供方，用来提供数据，然后他的后代就可以通过useContext来使用它所提供的数据了。

在组件外部调用`createContext`方法来创建一个`context`对象。`createContext`方法接收一个数据默认值。
当组件上层没有提供者时，会以这个值为默认值。
```js
import { createContext } from 'react';

const ThemeContext = createContext('light');
```
用这个`someContext.Provider`组件来将您的组件包装到上下文提供程序中，为其内部的所有组件指定此上下文的值：
```jsx
function App() {
  const [theme, setTheme] = useState('light');
  // ...
  return (
    <ThemeContext.Provider value={theme}>
      <Page />
    </ThemeContext.Provider>
  );
}
```
其内部组件就可以通过`useContext`来读取context：
```jsx
function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme} />;
}
```
## 最佳实践
由于数据提供方和消费方都要用到这个context对象，
项目中也不只一处会用到，
所以我们把所有的context都提取到一个目录下统一管理。

::: code-group
```js [themeContext.js]
// context/themeContext.js
import { createContext } from 'react';

const ThemeContext = createContext('light');

export default ThemeContext
```

```jsx [App.jsx]
import ThemeContext from 'src/context/themeContext.js'

function App() {
  const [theme, setTheme] = useState('light');
  // ...
  return (
    <ThemeContext.Provider value={theme}>
      <Page />
    </ThemeContext.Provider>
  );
}
```

```jsx
import ThemeContext from 'src/context/themeContext.js'

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme} />;
}
```
:::
