import { API } from "../config";

export const signUp = user => {
  // console.log(name, email, password)
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(res => {
    return res.json()
  })
  .catch(err => {
    console.log(err)
  })
};

export const signIn = user => {
  // console.log(name, email, password)
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(res => {
    return res.json()
  })
  .catch(err => {
    console.log(err)
  })
};

