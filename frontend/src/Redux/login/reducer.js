import {
  LOGIN_REQUEST_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGIN_FAILURE_ACTION,
  LOGOUT_ACTION,
} from "./actions";

const initialState = {
  isLoading: false,
  isAuthenticated: false || localStorage.getItem("token") != null,
  errorMsg: null,
};

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST_ACTION:
      return { ...state, isLoading: true };

    case LOGIN_SUCCESS_ACTION:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errorMsg: null,
      };

    case LOGIN_FAILURE_ACTION:
      return { ...state, errorMsg: action.message };

    case LOGOUT_ACTION:
      return { ...state, isAuthenticated: false, errorMsg: null };

    default:
      return state;
  }
}
