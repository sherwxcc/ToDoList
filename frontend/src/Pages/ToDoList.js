import "./toDoList.css";

import { Button } from "reactstrap";

const ToDoList = () => {
  return (
    <>
      <div className="nav d-flex align-items-center justify-content-end">
        <div className="py-2 px-2">
          <Button className="btn-white">LOG OUT</Button>
        </div>
      </div>
      <div>
        <h3>Hello this is the todolist.</h3>
      </div>
    </>
  );
};

export default ToDoList;
