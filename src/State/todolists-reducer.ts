import {debug} from "console"
import {TodolistType} from "../Todolist";
import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

//заглушка до определения четкого перечня экшенов
// type ActionType = {
//     type: string
//     [key: string]: any
// }
type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (todolistId: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: string}
}

export const ChangeTodolistTitleAC = (todolistId: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: string}
}

export const ChangeTodolistFilterAC = (todolistId: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: FilterValuesType}
}


export type RemoveTodolistActionType =
    {
        type: 'REMOVE-TODOLIST',
        id: string
    }
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}


export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todolist => todolist.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            let todolistAdded: TodolistsType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            };
            return [...state, todolistAdded];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            ;
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            ;
            return [...state]
        }
        default:
            throw new Error(`Invalid action ${action}`)
    }
}