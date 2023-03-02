import {FilterValuesType, TaskStateType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}

export type Action2Type = {
    type: '2',
    title: string
}

type ActionsType = RemoveTaskActionType | Action2Type


export const taskReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {

    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy={...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(task =>task.id!==action.taskId)
            return stateCopy
        }
            ;
        case "2": {
            return {...state}
        }
            ;

        default:
            throw new Error(`Invalid action ${action}`)
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId} //если совпадают - можно без : дубль
}
export const action2AC = (title: string): Action2Type => {
    return {type: '2', title: title}
}