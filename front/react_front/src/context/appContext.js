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
import { Navigate } from "react-router-dom";

const access = localStorage.getItem("access");
const id = localStorage.getItem("id");

const initialState = {
  isLoading: false,
  access: access || null,
  id: id || null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const authFetch = axios.create({
    baseURL: "http://localhost:8000/",
  });

  const generalApiInterface = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
      Authorization: `JWT ${initialState.access}`,
    },
  });

  const [state, dispatch] = useReducer(reducer, initialState);
  const [favoriteList, setFavoriteList] = useState([]);
  // const [isClear, setIsClear] = useState(false);

  const [eventClickName, setEventClickName] = useState("");

  const addUserToLocalStorage = ({ id, access }) => {
    localStorage.setItem("access", access);
    localStorage.setItem("id", id);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("access");
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/register/",
        currentUser
      );
      dispatch({ type: REGISTER_USER_SUCCESS });
    } catch (error) {
      console.log(error.response);
    }
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/auth/jwt/create",
        currentUser
      );
      const { access } = data;
      addUserToLocalStorage({ access });

      generalApiInterface
        .get("api/auth/users/me/")
        .then((response) => {
          const { id } = response.data;
          addUserToLocalStorage({ id });
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: { id },
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    } catch (error) {
      console.log(error.response);
    }
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        favoriteList,
        setFavoriteList,
        logoutUser,
        eventClickName,
        setEventClickName
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
