import React, { useReducer, useContext, useState } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
} from "./action";

// const token = localStorage.getItem("token");
// const user = localStorage.getItem("user");
// const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  //   user: user ? JSON.parse(user) : null,
  //   token: token || null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [favoriteList, setFavoriteList] = useState([]);

  // const addUserToLocalStorage = ({ user, token }) => {
  // //   localStorage.setItem("user", JSON.stringify(user));
  // //   localStorage.setItem("token", token);
  // };

  // const removeUserFromLocalStorage = () => {
  // //   localStorage.removeItem("user");
  // //   localStorage.removeItem("token");
  // };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const { data } = await axios.post(
        "http://localhost:8000//api/signin",
        currentUser
      );
      // console.log(response);
      const { user, token } = data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token },
      });
      //   addUserToLocalStorage({ user, token });
    } catch (error) {
      console.log(error.response);
    }
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post(
        "http://localhost:8000//api/login",
        currentUser
      );
      // console.log(response);
      const { user, token } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });
      //   addUserToLocalStorage({ user, token});
    } catch (error) {
      console.log(error.response);
    }
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    // removeUserFromLocalStorage();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        logoutUser,
        favoriteList,
        setFavoriteList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
