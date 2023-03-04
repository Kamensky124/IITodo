import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';
import AppWithReducers from "./AppWithReducers";
import AppWithRedux from "./AppWithRedux";
import {store} from "./State/store";
import {Provider} from "react-redux";
import ReactDOM from 'react-dom';


ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>, document.getElementById('root')
)

// исходный вариант от CRA
// const container  = document.getElementById('root') as HTMLElement
// const root = createRoot(container);
// root.render(
//     <Provider store={store}>
//         <AppWithRedux/>
//     </Provider>
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

