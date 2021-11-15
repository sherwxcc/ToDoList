import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import {
  listTaskThunk,
  deleteTaskThunk,
  updateTaskThunk,
} from "../Redux/todo/actions";
import { Button, Card, CardBody, CardFooter } from "reactstrap";
import FadeIn from "react-fade-in";

const ListTask = () => {
  const { todoList, search } = useSelector((state) => state.todoStore);
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    let tokenId = jwt_decode(localStorage.getItem("token")).id;
    setUserId(tokenId);
    dispatch(listTaskThunk(tokenId));
  }, [dispatch]);

  const deleteTask = (taskId) => {
    dispatch(deleteTaskThunk(userId, taskId));
  };

  const updateTask = (taskId, taskContent) => {
    console.log(taskId.substring(2));
    dispatch(updateTaskThunk(userId, taskId.substring(2), taskContent));
  };

  return (
    <>
      {todoList && todoList.length > 0
        ? todoList
            .filter((task) =>
              task.task.toLowerCase().includes(search.toLowerCase())
            )
            .map((task) => (
              <FadeIn key={task.id} className="col-sm-6 col-xs-12">
                <div>
                  <Card className="old-task-card my-2">
                    <CardBody>
                      <textarea
                        defaultValue={task.task}
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
              </FadeIn>
            ))
        : null}
    </>
  );
};

export default ListTask;
