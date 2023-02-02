import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    type TodolistsType = {
        id: string
        title: string
        filter: FilterValuesType
    }

    let removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId));
        delete tasksObj[todolistId];
        setTasks({...tasksObj})
    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});
    }

    const changeStatus = (newId: string, eventStatus: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === newId);
        if (task) {
            task.isDone = eventStatus;
            setTasks({...tasksObj});
        }

    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        // debugger
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    type TaskStateType = {
        [key:string]: Array<TaskType>
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'}
    ]);

    let [tasksObj, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Books", isDone: true},
            {id: v1(), title: "Banana", isDone: false},
            {id: v1(), title: "Skates", isDone: false}
        ]
    });


    return (
        <div className="App">
            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasksObj[tl.id];


                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
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
                                     removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    );
}

export default App;
