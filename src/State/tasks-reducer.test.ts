import {TasksStateType, TodolistType} from "../App";
import {
    addTaskAC,
    addTodolistAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    taskReducer
} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Books", isDone: true},
            {id: '2', title: "Banana", isDone: false},
            {id: '3', title: "Skates", isDone: false}
        ]
    }
    const action = removeTaskAC('2', 'todolistId2')
    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Books", isDone: true},
            {id: '2', title: "Banana", isDone: false},
            {id: '3', title: "Skates", isDone: false}
        ]
    }
    const action = addTaskAC('todolistId2', 'Hren')
    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('Hren');
    expect(endState['todolistId2'][0].isDone).toBe(false);
})

test('correct task status should be changed in correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: false},
            {id: '3', title: "ReactJS", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Books", isDone: true},
            {id: '2', title: "Banana", isDone: false},
            {id: '3', title: "Skates", isDone: false}
        ]
    }
    const action = changeTaskStatusAC('todolistId2', '2', true)
    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'][1].isDone).toBe(false);
    expect(endState['todolistId2'][1].isDone).toBe(true);
})

test('correct task title should be changed in correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Books", isDone: true},
            {id: '2', title: "Banana", isDone: false},
            {id: '3', title: "Skates", isDone: false}
        ]
    }
    const action = changeTaskTitleAC('todolistId2', '2', 'Milk')
    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe('JS');
    expect(endState['todolistId2'][1].title).toBe('Milk');
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Books", isDone: true},
            {id: '2', title: "Banana", isDone: false},
            {id: '3', title: "Skates", isDone: false}
        ]
    }
    const action = addTodolistAC('new todolist')
    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
