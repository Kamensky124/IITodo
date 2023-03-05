// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {TodolistType} from "../AppWithRedux";
import {TasksStateType} from "../AppWithRedux";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer)
// определить автоматически тип всего объекта состояния

export type AppRootStateType = ReturnType<typeof rootReducer>

// вариант ручной типизации, трудозатратно постоянно актуализировать
// export type AppRootStateType = {
//     todolists: Array<TodolistType>
//     tasks: Array<TasksStateType>
// }

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store