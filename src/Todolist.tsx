import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./Components/Button";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}


export const Todolist = (props: PropsType) => {
    let [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }

    const uniFilterHandler = (nameButton:FilterValuesType) => {
props.changeFilter(nameButton)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={() => {
                    props.addTask(title)
                }}>+
                </button>
            </div>
            <ul>
                {
                    props.tasks.map((task) => {
                        return (
                            <li>
                                <input type="checkbox"
                                       key={task.id}
                                       checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={() => {
                                    props.removeTask(task.id)
                                }}>x
                                </button>
                            </li>

                        )
                    })
                }
            </ul>

            <div>
                <Button name={'completed'} callBack={()=>{uniFilterHandler('completed')}} />
                <Button name={'all'} callBack={()=>{uniFilterHandler('all')}} />
                <Button name={'active'} callBack={()=>{uniFilterHandler('active')}} />
            </div>
        </div>
    )
}