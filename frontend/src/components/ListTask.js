import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { listTaskThunk } from "../Redux/todo/actions";
import { Button, Card, CardBody, CardFooter } from "reactstrap";

const ListTask = () => {
  const { todoList } = useSelector((state) => state.todoStore);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    let tokenId = jwt_decode(localStorage.getItem("token")).id;
    setUserId(tokenId);
    dispatch(listTaskThunk(tokenId));
  }, []);

  const dispatch = useDispatch();

  const deleteTask = (taskId) => {
    // dispatch(deleteTaskThunk(taskId, userId));
  };

  return (
    <>
      {todoList && todoList.length > 0
        ? todoList.map((task) => (
            <div className="col-sm-6 col-xs-12">
              <Card key={task.id} className="old-task-card my-2">
                <CardBody>
                  <textarea
                    value={task.task}
                    className="form-control old-task-ta"
                    row="2"
                  ></textarea>
                </CardBody>
                <CardFooter className="old-task-card-footer text-center">
                  <Button
                    className="btn-white"
                    onClick={(e) => {
                      deleteTask(e.currentTarget.key);
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
