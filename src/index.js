import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import state from "./redux/state";
// import { addMessage, updateMessage, subscribe } from "./redux/state";
import store from "./redux/redux-store";

const root = ReactDOM.createRoot(document.getElementById("root"));
const rerender = () => {
  root.render(
    <React.StrictMode>
      <App
        state={store.getState()}
        dispatch={store.dispatch.bind(store)}
      />
    </React.StrictMode>
  );
};

rerender();
store.subscribe(rerender);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
