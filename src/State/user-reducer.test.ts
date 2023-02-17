import {userReducer} from "./user-reducer";

test('user reducer should increment only age', () => {
    const startState = {name: 'Andrey', age: 20, childrenCount: 2}
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})
    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
})
test('user reducer should increment only children', () => {
    const startState = {name: 'Andrey', age: 20, childrenCount: 2}
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})
    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(3);
})
test('user reducer should only change name', () => {
    const startState = {name: 'Andrey', age: 20, childrenCount: 2}
    const newTName='Dima'
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName:newTName })
    expect(endState.name).toBe(newTName);
    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(2);
})
