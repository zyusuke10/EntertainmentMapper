import React, { useEffect } from "react";
import "./Login.css";

import { FormRow } from "../components/FormRow";
import { useState } from "react";
import { useAppContext } from "../context/appContext";
import { NavLink, useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  password: "",
  isMember: true,
};

const Login = () => {
  const [values, setValues] = useState(initialState);
    const navigate = useNavigate();

  const { registerUser, loginUser, isLoading, id } = useAppContext();

  const inputHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const { username, password, isMember } = values;
    const currentUser = { username, password };

    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <h1>EventMapper</h1>
      </div>

      <div className="form-container">
        <form className="form" method="POST" onSubmit={submitHandler}>
          <h3>{values.isMember ? "Login" : "Register"}</h3>
          <FormRow
            type="text"
            name="username"
            labelText="username"
            value={values.username}
            handleChange={inputHandler}
          />

          <FormRow
            type="password"
            name="password"
            labelText="password"
            value={values.password}
            handleChange={inputHandler}
          />

          <button type="submit" className="btn">
            <NavLink to="/home" className="loginSubmit">Submit</NavLink>
          </button>
          <p
            className="isMember"
            onClick={() => setValues({ ...values, isMember: !values.isMember })}
          >
            {!values.isMember
              ? "登録済みの場合はここをクリック"
              : "登録していない場合はここをクリック"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
