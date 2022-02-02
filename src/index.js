import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import state, {addPost, subscribe, updateNewPostText} from './redux/state';
import ReactDOM from "react-dom";


const rendererEntireTree = state => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
rendererEntireTree(state);
subscribe(rendererEntireTree);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
