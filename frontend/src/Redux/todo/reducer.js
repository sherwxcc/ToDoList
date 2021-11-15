import { LIST_TASK_ACTION, SEARCH_TASK_ACTION } from "./actions";
import { CLEAR_TASK_LIST } from "../login/actions";

const initialState = {
  todoList: [],
  search: "",
};

export function todoReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_TASK_ACTION:
      return { ...state, todoList: action.payload };

    case CLEAR_TASK_LIST:
      return { ...state, todoList: [] };

    case SEARCH_TASK_ACTION:
      return { ...state, search: action.payload };

    default:
      return state;
  }
}
