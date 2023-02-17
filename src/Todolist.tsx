import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {ButtonAK} from "./Components/ButtonAK";
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
//mui
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, eventStatus: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void,
    changeTodolistTitle: (todolistId: string, newTitle: string) => void,
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: TodolistType) {

    const removeTaskHandler = (taskID: string) => {
        props.removeTask(taskID, props.id)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={() => {
                removeTodolist()
            }}>
                <DeleteIcon/>
            </IconButton>
            {/*<button onClick={removeTodolist}>X</button>*/}

        </h3>
        <div>
            <AddItemForm addItem={addTask}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id)

                    const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, event.currentTarget.checked, props.id)
                    }

                    const changeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }

                    return <li key={t.id}
                               className={t.isDone ? 'is-done' : ''}>
                        <Checkbox
                            checked={t.isDone}
                            color='primary'
                            onChange={changeStatusHandler}/>

                        <EditableSpan
                            title={t.title}
                            onChange={changeTitleHandler}
                        />
                        <IconButton onClick={() => {
                            removeTaskHandler(t.id);
                        }}>
                            <DeleteIcon/>
                        </IconButton>
                        {/*<ButtonAK name={'X'} callBack={() => removeTaskHandler(t.id)}/>*/}

                    </li>
                })
            }
        </ul>
        <div>


            {/*<Button name={'completed'} callBack={()=>{uniFilterHandler('completed')}} />*/}
            {/*<Button name={'all'} callBack={()=>{uniFilterHandler('all')}} />*/}
            {/*<Button name={'active'} callBack={()=>{uniFilterHandler('active')}} />*/}

            {/*перенести className в Button с uniFilterHandler*/}
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler}
                    color='inherit'>All</Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'} onClick={onActiveClickHandler}
                    color='primary'>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler} color='secondary'>Completed
            </Button>

        </div>
    </div>
}

