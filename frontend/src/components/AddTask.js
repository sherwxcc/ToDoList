import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { addTaskThunk } from "../Redux/todo/actions";
import { Button, Card, CardTitle, CardBody, CardFooter } from "reactstrap";

const AddTask = () => {
  const { todoList } = useSelector((state) => state.todoStore);
  const [userId, setUserId] = useState("");
  const [newTask, setNewTask] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    let tokenId = jwt_decode(localStorage.getItem("token")).id;
    setUserId(tokenId);
  }, []);

  useEffect(() => {
    setNewTask("");
  }, [todoList]);

  const handleChange = (val) => {
    setNewTask(val);
  };

  const addNewTask = () => {
    if (newTask !== "") {
      dispatch(addTaskThunk(userId, newTask));
    }
  };

  return (
    <>
      <div className="py-2">
        <Card className="add-task-card">
          <CardBody>
            <CardTitle className="px-2 add-task-title">
              CREATE NEW TODO
            </CardTitle>
            <textarea
              className="form-control add-task-ta"
              placeholder="Add new todo"
              value={newTask}
              onChange={(e) => handleChange(e.currentTarget.value)}
              rows="2"
            ></textarea>
          </CardBody>
          <CardFooter className="add-task-footer text-center">
            <Button onClick={addNewTask} className="btn-blue">
              ADD
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AddTask;
