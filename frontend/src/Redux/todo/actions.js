import axios from "axios";

export const LIST_TASK_ACTION = "LIST_TASK_ACTION";
export const ADD_TASK_SUCCESS_ACTION = "ADD_TASK_SUCCESS_ACTION";

export const listTaskThunk = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/todo/uid/${userId}`
    );
    const { data } = response;
    if (data.length > 0) {
      dispatch({
        type: LIST_TASK_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const addTaskThunk = (userId, task) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/todo`,
      {
        userId: userId,
        task: task,
      }
    );
    const { data } = response;

    if (data && data.length > 0) {
      dispatch({
        type: ADD_TASK_SUCCESS_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};
