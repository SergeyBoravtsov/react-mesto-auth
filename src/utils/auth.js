import { authUrl } from "./constants.js";

export const register = (email, password) => {
  console.log(email, password);
  return fetch(`${authUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  });
};

export const authorize = (email, password) => {
    console.log(email, password);
    return fetch(`${authUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
  }; 

export const getUserEmail = (jwt) => {
    return fetch(`${authUrl}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${jwt}`
        }
      })
    };