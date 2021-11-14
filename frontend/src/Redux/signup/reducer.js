import {
  SIGNUP_REQUEST_ACTION,
  SIGNUP_SUCCESS_ACTION,
  SIGNUP_FAILURE_ACTION,
} from "./actions";

import { CLEAR_ERR_MSG } from "../login/actions";

const initialState = {
  isLoading: false,
  successMsg: null,
  errorMsg: null,
};

export function signupReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST_ACTION:
      return { ...state, isLoading: true };

    case SIGNUP_SUCCESS_ACTION:
      return {
        ...state,
        successMsg: "Yay! Your account is successfully created!",
      };

    case SIGNUP_FAILURE_ACTION:
      return {
        ...state,
        errorMsg: action.message,
      };

    case CLEAR_ERR_MSG:
      return {
        ...state,
        errorMsg: null,
      };

    default:
      return state;
  }
}
