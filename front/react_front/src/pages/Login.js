import React from "react";
import "./Login.css";

import { FormRow } from "../components/FormRow";
import { useState } from "react";
import { useAppContext } from "../context/appContext";
// import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Login = () => {
  const [values, setValues] = useState(initialState);
  //   const navigate = useNavigate();

  const { registerUser, loginUser, isLoading } = useAppContext();

  const inputHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const { name, email, password, isMember } = values;
    const currentUser = { name, email, password };

    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  //   useEffect(() => {
  //     if (user) {
  //       setTimeout(() => {
  //         navigate("/");
  //       }, 3000);
  //     }
  //   }, []);

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
            name="name"
            labelText="name"
            value={values.name}
            handleChange={inputHandler}
          />
          <FormRow
            type="email"
            name="email"
            labelText="email"
            value={values.name}
            handleChange={inputHandler}
          />
          {!values.isMember && (
            <FormRow
              type="password"
              name="password"
              labelText="password"
              value={values.name}
              handleChange={inputHandler}
            />
          )}

          <button type="submit" className="btn" disabled={isLoading}>
            Submit
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
