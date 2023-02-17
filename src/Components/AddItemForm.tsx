import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {ButtonAK} from "./ButtonAK";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddBox from "@mui/icons-material/AddBox";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask();
        }
    }

    const addTask = () => {

        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError('Title is required')
        }

    }

    return <div>
        <TextField variant ='outlined'
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   label='Title'
                   helperText={error}
        />
        {/*Чтобы добавить ошибку в TextField, нужно задать ему в пропсы error={true} (вместо true мы передаем значение нашей переменной, преобразованное с помощью !! в булево значение по правилам псевдоистины и псевдолжи)*/}

        {/*From mui*/}
        <IconButton
            // style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', color: 'green'}}
            color='primary'
            onClick={() => {addTask();}}>
        <AddBox/>
        </IconButton>

        {/*<ButtonAK name={'+'} callBack={() => addTask()}/>*/}

        {/*отключаем показ div ошибки после ввода mui helpertext*/}
        {/*{error && <div className='error-message'>{error}</div>}*/}
    </div>

}