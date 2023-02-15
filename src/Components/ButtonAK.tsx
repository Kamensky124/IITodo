type PropsType = {
    name: string
    callBack: ()=>void
}

export const ButtonAK = (props: PropsType) => {
    const onClickHandler = () => {
        props.callBack()
    }

    return (
        <button onClick={onClickHandler}>{props.name}</button>
    )
}