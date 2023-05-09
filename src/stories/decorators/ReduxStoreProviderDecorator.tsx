import {AppRootStateType, store} from "../../state/store";
import {Provider} from "react-redux";
import {useCallback, useState} from "react";
import {v1} from "uuid";
import {TasksStateType, TodolistType} from "../../App";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../state/tasks-reducer";
import {todolistsReducer} from "../../state/todolists-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: "What to eat", filter: "all"},
        {id: 'todolistId2', title: "What to buy", filter: "all"}
    ],

    tasks: {'todolistId1': [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        'todolistId2': [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
}

export const storyBooksStore = createStore (rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => {

    return <Provider
        store={storyBooksStore}>{storyFn()}
    </Provider>
}
