import {
  SIGNUP_REQUEST_ACTION,
  SIGNUP_SUCCESS_ACTION,
  SIGNUP_FAILURE_ACTION,
  // CLOSE_MODAL,
} from "./actions";

const initialState = {
  isLoading: false,
  successMsg: null,
  errorMsg: null,
  // modalOpen: false,
};

export function signupReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST_ACTION:
      return { ...state, isLoading: true };

    case SIGNUP_SUCCESS_ACTION:
      return {
        ...state,
        successMsg: "Yay! Your account has been successfully created!",
        modalOpen: true,
      };

    case SIGNUP_FAILURE_ACTION:
      return {
        ...state,
        errorMsg: action.message,
      };

    // case CLOSE_MODAL:
    //   return {
    //     ...state,
    //     modalOpen: false,
    //   };

    default:
      return state;
  }
}
