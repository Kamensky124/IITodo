import axios, { AxiosResponse } from "axios";
import { string } from "prop-types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': 'd73aa187-6422-4e31-b424-69bec8078cd3'
    }
})

//from docs
//https://social-network.samuraijs.com/api/1.1/todo-lists/{todolistId:95dabc62-7312-4b3c-a2d2-0dfb28c7989e}

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>("todo-lists/")
    },
    createTodolist(title: string) {
        return instance.post<{ title: string },
            AxiosResponse<ResponseType<{ item: TodolistType }>>>(
                'todo-lists/',
                { title }
            )
    },
    updateTodolist(id: string, title: string) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType>>
            (`todo-lists/${id}`, { title });
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType<{}>>(
            `todo-lists/${id}`
        );
    },

    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(
            `todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(
            `todo-lists/${todolistId}/tasks`, { title })
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(
            `todol-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}


export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

// export const settings = {
//     //withCredentials определяет, должны ли межсайтовые (кроссдоменные) запросы выполняться с использованием учетных данных (cookie)
//     withCredentials: true,
//     baseURL: 'https://social-network.samuraijs.com/api/1.1/',
//     headers: {
//         'API-KEY': 'd73aa187-6422-4e31-b424-69bec8078cd3'
//     }
// }

// export const todolistAPI = {
//     updateTodolist(todolistId: string, title: string) {
//         const promise = axios.put(
//             // settings.baseURL + 'todolists/${todolistId}',
//             settings.baseURL + 'todo-lists/' + todolistId,
//             {title: title},
//             settings
//         )
//         return promise
//     },
//     createTodolist(title: string) {
//         const promise = axios.post(
//             settings.baseURL + 'todo-lists/',
//             {title: title},
//             settings
//         )
//         return promise
//     },
//     getTodolists() {
//         const promise = axios.get(
//             settings.baseURL + 'todo-lists/',
//             settings
//         )
//         return promise
//     },
//     deleteTodolist(todolistId: string) {
//         const promise = axios.delete(
//             settings.baseURL + 'todo-lists/' + todolistId,
//             settings
//         )
//         return promise
//     }
// }