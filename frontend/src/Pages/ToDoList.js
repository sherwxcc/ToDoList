import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { logoutUser } from "../Redux/login/actions";
import "./toDoList.css";
import { Button } from "reactstrap";

import Search from "../components/Search";
import AddTask from "../components/AddTask";
import ListTask from "../components/ListTask";

const ToDoList = () => {
  const { isAuthenticated } = useSelector((state) => state.loginStore);
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/");
    }
    let tokenName = jwt_decode(localStorage.getItem("token")).name;
    setName(tokenName);
  }, [isAuthenticated]);

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <div className="nav row">
        <div className="px-4 py-3 heading col-8">
          {name.toUpperCase()}'S TO DO LIST
        </div>
        <div className="d-flex align-items-center justify-content-end col-4">
          <div className="py-2 px-2">
            <Button className="btn-white" onClick={logout}>
              LOG OUT
            </Button>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="p-3 container list-card row mx-auto">
          <div className="welcome-msg p-3">Welcome back, {name}</div>
          <Search />
          <AddTask />
          <ListTask />
        </div>
      </div>
    </>
  );
};

export default ToDoList;
