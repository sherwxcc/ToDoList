import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import {
  listTaskThunk,
  deleteTaskThunk,
  updateTaskThunk,
} from "../Redux/todo/actions";
import { Button, Card, CardBody, CardFooter } from "reactstrap";

const ListTask = () => {
  const { todoList } = useSelector((state) => state.todoStore);
  const [userId, setUserId] = useState("");
  const [taskContent, setTaskContent] = useState("");

  useEffect(() => {
    let tokenId = jwt_decode(localStorage.getItem("token")).id;
    setUserId(tokenId);
    dispatch(listTaskThunk(tokenId));
  }, []);

  const dispatch = useDispatch();

  const deleteTask = (taskId) => {
    dispatch(deleteTaskThunk(userId, taskId));
  };

  const updateTask = (taskId, task) => {
    console.log(taskId.substring(2));
    dispatch(updateTaskThunk(userId, taskId.substring(2), task));
  };

  const handleTaskChange = (val) => {
    setTaskContent(val);
  };

  return (
    <>
      {todoList && todoList.length > 0
        ? todoList.map((task) => (
            <div key={task.id} className="col-sm-6 col-xs-12">
              <Card className="old-task-card my-2">
                <CardBody>
                  <textarea
                    value={task.task}
                    onChange={(e) => {
                      handleTaskChange(e.currentTarget.value);
                    }}
                    onBlur={(e) => {
                      updateTask(e.currentTarget.id, e.currentTarget.value);
                    }}
                    className="form-control old-task-ta"
                    id={"ta" + task.id}
                    row="2"
                  ></textarea>
                </CardBody>
                <CardFooter className="old-task-card-footer text-center">
                  <Button
                    className="btn-white"
                    id={task.id}
                    onClick={(e) => {
                      deleteTask(e.currentTarget.id);
                    }}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))
        : null}
    </>
  );
};

export default ListTask;
