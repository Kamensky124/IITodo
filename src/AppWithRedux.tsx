import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./State/todolists-reducer";
import {
    addTaskAC,
    addTodolistAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./State/tasks-reducer";
import {AppRootStateType, store} from "./State/store";
import {useDispatch, useSelector} from "react-redux";

//mui
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
};

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const changeTaskTitle = (newId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(todolistId, newTitle, todolistId));
    }

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId));
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(todolistId, title));
    }

    const changeStatus = (newId: string, eventStatus: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(todolistId, newId, eventStatus));
    }

    ////////////////////////////////

    function AddTodoList(title: string) {
        const action = (addTodolistAC(title));
        dispatch(action);
    }

    const removeTodolist = (todolistId: string) => {
        const action = (removeTodolistAC(todolistId));
        dispatch (action);
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(todolistId, value));
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const action = (changeTodolistTitleAC(todolistId, newTitle));
        dispatch (action);
    }

    ////////////////////////////////////////

    const todolists = useSelector<AppRootStateType,Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType,TasksStateType>(state => state.tasks)
    const dispatch=useDispatch()

    return (
        <div className="App">

            <AppBar position='static'>
                <Toolbar>
                    <IconButton>
                        <Menu/>
                    </IconButton>
                    <Typography>
                        Todolist
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={AddTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {

                            let tasksForTodolist = tasks[tl.id];


                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                            }

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist key={tl.id}
                                              id={tl.id}
                                              title={tl.title}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeStatus={changeStatus}
                                              filter={tl.filter}
                                              changeTaskTitle={changeTaskTitle}
                                              removeTodolist={removeTodolist}
                                              changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
        ;
}

export default AppWithRedux;
