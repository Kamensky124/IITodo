import { useEffect, useState } from "react";
import axios from "axios";
import { todolistAPI } from "api/todolist-api";

export default {
    title: 'API'
}

//key from here https://social-network.samuraijs.com/account

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.getTodolists()
            .then((res) => {
                // debugger;
                setState(res.data);
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('AKList')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

//temporary hardcoded for testing axios

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // debugger;
        todolistAPI.deleteTodolist(todolistIdDel)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodolist(todolistIdPut, 'update110523')
            .then((res) => {
                setState(res.data)
            });
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

const todolistIdDel = `5d846b6b-4bc4-440a-8d49-432cf73acfd0`
const todolistIdPut = `048ab175-7f77-4be3-bc04-e1c51007847a`

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data.items);
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
            <button onClick={getTasks}>Get tasks</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTask(todolistIdPut, 'SomeTask')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <div>todolist</div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
            <div>task</div>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => { setTaskId(e.currentTarget.value) }} />
            <div><button onClick={deleteTask}>Delete task</button></div>
        </div>
    </div>
}


// <input type = "text"></input>