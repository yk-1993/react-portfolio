import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

// 初期ステート
const initialState = {
  uid: null,
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
  birthDate: null,
  address: {
    postalcode: null,
    prefecture: null,
    address1: null,
    address2: null,
    address3: null,
  },
};

// Reducer定義
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_USER":
      return {
        uid: action.user.uid,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        email: action.user.email,
        phone: action.user.phone,
        birthDate: action.user.birthDate,
        address: {
          postalcode: action.user.address.postalcode,
          prefecture: action.user.address.prefecture,
          address1: action.user.address.address1,
          address2: action.user.address.address2,
          address3: action.user.address.address3,
        },
      };
    case "DELETE_USER":
      return {
        state: initialState,
      };
    default:
      return state;
  }
};

// ミドルウェア（redux-thunk）を使う場合のRedux devlooltsセットアップ
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
