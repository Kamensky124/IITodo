import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./Components/Button";
import {AddItemForm} from "./Components/AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, eventStatus: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {

    const removeTaskHandler = (taskID: string) => {
        props.removeTask(taskID, props.id)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return <div>
        <h3>{props.title}
            <button onClick={removeTodolist}>X</button>
        </h3>
        <div>
            AddItem
            <AddItemForm addItem={addTask}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id)

                    const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, event.currentTarget.checked, props.id)
                    }

                    return <li key={t.id}
                               className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={changeStatusHandler}
                        />
                        <span>{t.title}</span>

                        <Button name={'X'} callBack={() => removeTaskHandler(t.id)}/>

                    </li>
                })
            }
        </ul>
        <div>


            {/*<Button name={'completed'} callBack={()=>{uniFilterHandler('completed')}} />*/}
            {/*<Button name={'all'} callBack={()=>{uniFilterHandler('all')}} />*/}
            {/*<Button name={'active'} callBack={()=>{uniFilterHandler('active')}} />*/}

            {/*перенести className в Button с uniFilterHandler*/}
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>

        </div>
    </div>
}

