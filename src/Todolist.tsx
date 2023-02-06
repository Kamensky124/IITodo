import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./Components/Button";
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";

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
    removeTodolist: (todolistId: string) => void,
    changeTodolistTitle: (todolistId: string, newTitle:string) =>void,
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
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
    const changeTodolistTitle = (newTitle:string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={changeTodolistTitle} />
            <button onClick={removeTodolist}>X</button>
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

                    const changeTitleHandler = (newValue:string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }

                    return <li key={t.id}
                               className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={changeStatusHandler}
                        />

                        <EditableSpan
                            title={t.title}
                            onChange={changeTitleHandler}
                        />

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

