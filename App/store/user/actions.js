import axios from "axios";
import { server } from "@env";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

export const logOut = () => ({ type: LOG_OUT });

export const login = (email, password) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`${server}/login`, {
        email,
        password,
      });
      dispatch(loginSuccess(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
};

// export const register = (name, email, password) => {
//   return async (dispatch, getState) => {
//     try {
//       const response = await axios.post(`${server}/register`, {
//         name,
//         email,
//         password,
//       });
//       dispatch(loginSuccess(response.data));
//     } catch (error) {
//       if (error.response) {
//         console.log(error.response.data.message);
//       } else {
//         console.log(error.message);
//       }
//     }
//   };
// };
