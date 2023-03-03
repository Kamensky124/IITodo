import {TasksStateType} from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    todolistId: string,
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    todolistId: string,
    title: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType

export const taskReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {

    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(task => task.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
            ;
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            let taskWithNewStatus = tasks.find(t => t.id === action.taskId);
            if (taskWithNewStatus) {
                taskWithNewStatus.isDone = action.isDone
            }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            let taskWithNewTitle = tasks.find(t => t.id === action.taskId);
            if (taskWithNewTitle) {
                taskWithNewTitle.title = action.title
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId]  = []
            return stateCopy
        }
        default:
            throw new Error(`Invalid action ${action}`)
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId} //если совпадают - можно без : дубль
}
export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistId, title}
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone}
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}