import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, ...rest }) => {
  const loginStore = useSelector((state) => state.loginStore);
  const { isAuthenticated } = loginStore;

  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated ? children : <Redirect to="/" />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
