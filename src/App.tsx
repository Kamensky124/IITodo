import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

const App = () => {

    let [tasks, setTasks] = useState<
        Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("all");

    function addTask(title:string) {
        let task = { id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks)
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodoList = tasks;
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(task => task.isDone === true);
    }
    if (filter === "active") {
        tasksForTodoList = tasks.filter(task => task.isDone === false);
    }
    return (
        < div className="App">
            < Todolist title='What to learn'
                       tasks={tasksForTodoList}
                       removeTask={removeTask}
                       changeFilter={changeFilter}
                       addTask={addTask}
            />
            {/*< Todolist title = "songs" tasks={tasks2} />*/}
            {/*< Todolist title = "books" tasks={tasks3} />*/}
        </div>
    );
}

export default App;
