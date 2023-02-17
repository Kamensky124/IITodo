import {debug} from "console"
import {TodolistType} from "../Todolist";
import {TodolistsType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todolist => todolist.id !== action.id)}
        case 'ADD-TODOLIST':{
            let todolistAdded: TodolistsType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            };
            return [...state, todolistAdded];}
        case 'CHANGE-TODOLIST-TITLE':{
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            };
            return [...state]}
        case 'CHANGE-TODOLIST-FILTER':{
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            };
            return [...state]}
        default:
            throw new Error(`Invalid action ${action}`)
    }
}