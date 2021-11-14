import axios from "axios";

export const LIST_TASK_ACTION = "LIST_TASK_ACTION";
export const SEARCH_TASK_ACTION = "SEARCH_TASK_ACTION";

export const listTaskThunk = (userId) => async (dispatch) => {
  try {
    let token = await localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/todo/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response;
    if (data) {
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
    let token = await localStorage.getItem("token");
    const response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/todo`,
      {
        userId: userId,
        task: task,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response;

    if (data && data.length > 0) {
      dispatch({
        type: LIST_TASK_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const deleteTaskThunk = (userId, taskId) => async (dispatch) => {
  try {
    let token = await localStorage.getItem("token");
    const response = await axios.delete(
      `${process.env.REACT_APP_API_SERVER}/todo/${userId}/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response;
    if (data) {
      dispatch({
        type: LIST_TASK_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const updateTaskThunk = (userId, taskId, task) => async (dispatch) => {
  console.log("Activating action");
  try {
    let token = localStorage.getItem("token");
    const response = await axios.put(
      `${process.env.REACT_APP_API_SERVER}/todo/${taskId}`,
      {
        userId: userId,
        task: task,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response;

    if (data) {
      dispatch({
        type: LIST_TASK_ACTION,
        payload: data,
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const searchTask = (search) => {
  return {
    type: SEARCH_TASK_ACTION,
    payload: search,
  };
};
