import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signupUserThunk, closeModal } from "../Redux/signup/actions";
import { Button } from "reactstrap";
// import SuccessModal from "./SuccessModal";

const SignupForm = () => {
  const signupStore = useSelector((state) => state.signupStore);
  const { isLoading, successMsg, errorMsg, modalOpen } = signupStore;

  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const signup = () => {
    dispatch(signupUserThunk(username, password, name));
  };

  // const close = () => {
  //   dispatch(closeModal());
  // };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <div className="landing-form my-4">
          <h3>SIGNUP A NEW ACCOUNT</h3>
          <form>
            <label className="my-2">Name</label>
            <br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              className="input-text form-control"
              required
            />
            <label className="my-2">Username</label>
            <br />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              className="input-text form-control"
              required
            />
            <label className="my-2">Password</label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              className="input-text form-control"
              required
            />
            <br />
            {errorMsg && <div className="err-msg">{errorMsg}</div>}
            <div className="text-center py-2">
              <Button onClick={signup} className="btn-orange py-0 my-4">
                SIGN UP
              </Button>
            </div>
          </form>
        </div>
      </div>
      {/* <SuccessModal modalOpen={modalOpen} close={close} message={successMsg} /> */}
    </>
  );
};

export default SignupForm;
