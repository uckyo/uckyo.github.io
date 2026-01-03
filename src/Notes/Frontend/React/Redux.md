# 简介

[Redux](https://redux.js.org/)是一个专为JS应用设计的状态管理库。多用于React当中，类似于vue中的pinia。

这里只介绍redux的单独用法，react给我们提供了一个官方插件，可以更方便的使用Redux,详情请看[react-redux](/Notes/Frontend/React/React-Redux)

# 使用

```js
import { createStore } from "redux"

function reducer (countState, action) {
    switch (action.type) {
        case "ADD":
            return countState = countState + action.num
        default:
            return countState
    }
}

const store = createStore(reducer,1)

store.subscribe(()=>{
    console.log(store.getState())
    // ...
})

store.dispatch({type: 'ADD',num: 3})
```
