import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers, createStore, legacy_createStore} from 'redux';
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

//кастомный хук чтобы не типизировать каждый вызов обычного dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType> ()

// непосредственно создаём store
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
