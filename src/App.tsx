import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = "all" | "completed" | "active";

const App = () => {

    let [tasks, setTasks] = useState<
        Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: number) {
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
            />
            {/*< Todolist title = "songs" tasks={tasks2} />*/}
            {/*< Todolist title = "books" tasks={tasks3} />*/}
        </div>
    );
}

export default App;
