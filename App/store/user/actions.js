import axios from "axios";
import { server } from "@env";
import { gql } from "@apollo/client";
import client from "@config/config";

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

// const client = ...
export const login = (email, password) => {
  console.log("what is email", email);
  console.log("password", password);

  client
    .query({
      query: gql`
        query GetRates {
          rates(currency: "USD") {
            currency
          }
        }
      `,
    })
    .then((result) => console.log(result));
};

// export const login = (email, password) => {
//   return async (dispatch, getState) => {
//     try {
//       const response = await axios.post(`${server}/login`, {
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
