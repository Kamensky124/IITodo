import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";

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
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setTitle(event.currentTarget.value)
                    }}
                        onKeyPress={(event)=>{
                            if(event.key==='Enter') {
                                addTask()
                            }
                        }}
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
                <button onClick={() => {
                    props.changeFilter("all")
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter("active")
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter("completed")
                }}>Completed
                </button>
            </div>
        </div>
    )
}