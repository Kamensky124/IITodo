import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./Components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType, todolistId:string) => void
    addTask: (title: string) => void
    changeStatus: (id: string, eventStatus: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {

        console.log({error})

        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError('Title is required')
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask();
        }
    }

    const removeTaskHandler=(taskID:string)=>{
        props.removeTask(taskID)
    }

    // const uniFilterHandler = (nameButton:FilterValuesType) => {
    //     props.changeFilter(nameButton)
    // }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            {/*<button onClick={addTask}>+</button>*/}
            {/*<button onClick={() => {props.addTask(title)}}>+</button>*/}
            {/*c компонентой через callBack*/}
            <Button name={'+'} callBack={()=>addTask()} />

            {error && <div className='error-message'>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, event.currentTarget.checked)
                    }

                    return <li key={t.id}
                    className={t.isDone?'is-done':''}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={changeStatusHandler}
                        />
                        <span>{t.title}</span>

                        <Button name={'X'} callBack={()=>removeTaskHandler(t.id)}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}


                    </li>
                })
            }
        </ul>
        <div>


            {/*<Button name={'completed'} callBack={()=>{uniFilterHandler('completed')}} />*/}
            {/*<Button name={'all'} callBack={()=>{uniFilterHandler('all')}} />*/}
            {/*<Button name={'active'} callBack={()=>{uniFilterHandler('active')}} />*/}

            {/*перенести className в Button с uniFilterHandler*/}
            <button className={props.filter === 'all' ? 'active-filter':''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? 'active-filter':''} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? 'active-filter':''} onClick={onCompletedClickHandler}>Completed</button>

        </div>
    </div>
}
