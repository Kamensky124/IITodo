import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    type TodolistsType = {
        id: string
        title: string
        filter: FilterValuesType
    }

    const changeStatus = (newId: string, eventStatus: boolean) => {
        setTasks(tasks.map(el => el.id === newId ? {
            ...el, isDone: eventStatus
        } : el))

    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    // let [filter, setFilter] = useState<FilterValuesType>("all");

    function changeFilter(value: FilterValuesType, todolistId: string) {
        // debugger
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist)
        {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: v1(), title: "What to learn", filter: 'all'},
        {id: v1(), title: "What to buy", filter: 'all'}
    ]);


    return (
        <div className="App">
            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = tasks.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks.filter(t => t.isDone === true);
                    }

                    return <Todolist key={tl.id}
                                     id={tl.id}
                                     title={tl.title}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeStatus={changeStatus}
                                     filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
