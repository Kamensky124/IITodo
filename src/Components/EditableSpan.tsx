import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(0);
    let [title, setTitle] = useState('');

    const activateViewMode = () => {setEditMode(0)}
    const activateEditMode = () => {setEditMode(1)}

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={title} onBlur={activateViewMode} autoFocus onChange={onChangeHandler}></input>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}