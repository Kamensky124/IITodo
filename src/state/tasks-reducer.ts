// import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "state/store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)


export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

type ActionsType = RemoveTaskActionType
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    // | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        // case 'ADD-TASK': {
        //     const stateCopy = {...state}
        //     const newTask: TaskType = {
        //         id: v1(),
        //         title: action.title,
        //         status: TaskStatuses.New,
        //         todoListId: action.todolistId, description: '',
        //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        //     }
        //     const tasks = stateCopy[action.todolistId];
        //     const newTasks = [newTask, ...tasks];
        //     stateCopy[action.todolistId] = newTasks;
        //     return stateCopy;
        // }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        // case 'CHANGE-TASK-STATUS': {
        //     let todolistTasks = state[action.todolistId];
        //     let newTasksArray = todolistTasks
        //         .map(t => t.id === action.taskId ? {...t, status: action.status} : t);
        //
        //     state[action.todolistId] = newTasksArray;
        //     return ({...state});
        // }
        // case 'CHANGE-TASK-TITLE': {
        //     let todolistTasks = state[action.todolistId];
        //     // найдём нужную таску:
        //     let newTasksArray = todolistTasks
        //         .map(t => t.id === action.taskId ? {...t, title: action.title} : t);
        //
        //     state[action.todolistId] = newTasksArray;
        //     return ({...state});
        // }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLISTS': {
            let stateCopy = {...state}
            action.todolists.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
//до перехода на api
// export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
//     return {type: 'ADD-TASK', title, todolistId}
// }

// export const addTaskAC = (task: TaskType): AddTaskActionType => {
//     return {type: 'ADD-TASK', task}
// }
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)

// export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
//     return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
// }

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            const task = res.data.data.item
            const action = addTaskAC(task)
            dispatch(action)
        })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                const action = updateTaskAC(taskId, domainModel, todolistId)
                dispatch(action)
            })
    }
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}