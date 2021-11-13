import "./app.css";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import ToDoList from "./Pages/ToDoList";
import LandingPage from "./Pages/LandingPage";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <PrivateRoute exact path="/todolist">
        <ToDoList />
      </PrivateRoute>
      <Route
        component={() => {
          return (
            <div>
              <h3>Error, path not found</h3>
            </div>
          );
        }}
      />
    </Switch>
  );
}

export default App;
