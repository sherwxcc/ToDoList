import { LIST_TASK_ACTION } from "./actions";
import { CLEAR_TASK_LIST } from "../login/actions";

const initialState = {
  todoList: [],
};

export function todoReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_TASK_ACTION:
      console.log("Updating List.. ", action.payload);
      return { ...state, todoList: action.payload };

    case CLEAR_TASK_LIST:
      return { todoList: [] };

    default:
      return state;
  }
}
