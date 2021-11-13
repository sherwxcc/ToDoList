import axios from "axios";

export const LOGIN_REQUEST_ACTION = "LOGIN_REQUEST_ACTION";
export const LOGIN_SUCCESS_ACTION = "LOGIN_SUCCESS_ACTION";
export const LOGIN_FAILURE_ACTION = "LOGIN_FAILURE_ACTION";

export const loginUserThunk = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST_ACTION });

    const response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/login`,
      {
        username: username,
        password: password,
      }
    );
    const { data } = response;

    if (data == null) {
      dispatch({
        type: LOGIN_FAILURE_ACTION,
        message: "Unknown error, empty response",
      });
    } else if (!data.token) {
      console.log("No token, data.message: ", data.message)
      dispatch({ type: LOGIN_FAILURE_ACTION, message: data.message || "" });
    } else {
      localStorage.setItem("token", data.token);
      dispatch({ type: LOGIN_SUCCESS_ACTION });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};
