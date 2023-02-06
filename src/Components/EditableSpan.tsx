import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string,
    onChange: (newValue:string)=>void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(0);
    let [title, setTitle] = useState('');

    const activateViewMode = () => {
        setEditMode(0);
        props.onChange(title)
        debugger
    }

    const activateEditMode = () => {
        setEditMode(1);
        setTitle(props.title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}

    return (
        editMode
            ? <input value={title} onBlur={activateViewMode} autoFocus onChange={onChangeHandler}></input>

            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}