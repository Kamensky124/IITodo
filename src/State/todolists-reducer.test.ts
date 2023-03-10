import {v1} from "uuid";
import {useState} from "react";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";
import {FilterValuesType, TodolistType} from "../App";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'}
    ];
    // до внедрения AC
    // const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1});
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})
test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    const newTodolistTitle = 'New todolist';
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'}
    ];
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))
    // {type: 'ADD-TODOLIST', title: newTodolistTitle}
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change it\'s name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    const newTodolistTitle = 'New todolist';
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'}
    ];
    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todolistId2,
        title: newTodolistTitle
    }
    const endState = todolistsReducer(startState, changeTodolistTitleAC(action.id, action.title))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)

})
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    const newFilter: FilterValuesType = 'completed'
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'}
    ];
    const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId2,
        filter: newFilter
    }
    const endState = todolistsReducer(startState, changeTodolistFilterAC(action.id, action.filter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})