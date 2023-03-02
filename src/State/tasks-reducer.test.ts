import {TaskStateType} from "../App";
import {v1} from "uuid";
import {removeTaskAC, taskReducer} from "./tasks-reducer";

test ('correct task should be deleted from correct array',()=>{
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            ],
        'todolistId2': [
            {id: '1', title: "Books", isDone: true},
            {id: '2', title: "Banana", isDone: false},
            {id: '3', title: "Skates", isDone: false}
        ]
    }
    const action = removeTaskAC('2','todolistId2')
    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t=>t.id!='2')).toBeTruthy()
})