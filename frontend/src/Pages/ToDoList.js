import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { logoutUser } from "../Redux/login/actions";
import "./toDoList.css";
import { Button, Collapse } from "reactstrap";

import Search from "../components/Search";
import AddTask from "../components/AddTask";
import ListTask from "../components/ListTask";

const ToDoList = () => {
  const { isAuthenticated } = useSelector((state) => state.loginStore);
  const { search } = useSelector((state) => state.todoStore);
  const [name, setName] = useState("");
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/");
    }
    let tokenName = jwt_decode(localStorage.getItem("token")).name;
    setName(tokenName);
  }, [isAuthenticated, history]);

  useEffect(() => {
    if (search !== "") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [search]);

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <div className="nav row">
        <div className="px-4 py-3 heading col-7">
          {name.toUpperCase()}'S TO DO LIST
        </div>
        <div className="d-flex align-items-center justify-content-end col-5">
          <div className="py-2 px-2">
            <Button className="btn-white mx-2" onClick={logout}>
              LOG OUT
            </Button>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="p-3 container list-card row mx-auto">
          <div className="welcome-msg p-3">
            Welcome back, {name.toUpperCase()}
          </div>
          <Search />
          <Collapse isOpen={show}>
            <AddTask />
          </Collapse>
          <ListTask />
        </div>
      </div>
    </>
  );
};

export default ToDoList;
