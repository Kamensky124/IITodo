import {useEffect, useState} from "react";
import axios from "axios";

export default {
    title: 'API'
}

const settings = {
    //withCredentials определяет, должны ли межсайтовые (кроссдоменные) запросы выполняться с использованием учетных данных (cookie)
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': 'd73aa187-6422-4e31-b424-69bec8078cd3'
    }
}

//const baseURL = 'https://social-network.samuraijs.com/api/1.1/'

// export const instance = axios.create({
//const baseURL: 'https://social-network.samuraijs.com/api/1.1/'
//     withCredentials: true,
//     headers: {

//         'API-KEY': 'd73aa187-6422-4e31-b424-69bec8078cd3'
//     }
// })

//key from here https://social-network.samuraijs.com/account

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.get(
            settings.baseURL+'todo-lists', settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post(
            settings.baseURL+'todo-lists',
            {title: 'newTodoListAk'},
            settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

//temporary hardcoded for testing axios
const todolistIdDel = '5a1007d4-3476-4d0b-9935-f8e285f220eb'
const todolistIdPut = '048ab175-7f77-4be3-bc04-e1c51007847a'

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.delete(
            settings.baseURL+'todo-lists/'+todolistIdDel,
            settings)
           .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.put(
            settings.baseURL+'todo-lists/'+todolistIdPut,
            {title: 'newTitleAk'},
            settings)
          .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}