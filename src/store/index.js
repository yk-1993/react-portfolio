import { createStore } from "redux";

const initialState = {
  count: 100,
  posts: [
    { id: 1, title: "Reduxについて" },
    {
      id: 2,
      title: "ReduxのHooksについて",
    },
  ],
};

const reducer = (state = initialState) => {
  return state;
};

const store = createStore(reducer);

export default store;
