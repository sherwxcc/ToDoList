import { LIST_TASK_ACTION, ADD_TASK_SUCCESS_ACTION } from "./actions";

const initialState = {
  todoList: [],
};

export function todoReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_TASK_ACTION:
      return { ...state, todoList: action.payload };

    case ADD_TASK_SUCCESS_ACTION:
      return { ...state, todoList: action.payload };

    default:
      return state;
  }
}
