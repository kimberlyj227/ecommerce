import { API } from "../config";

export const isAuthenticated = () => {
  if(typeof window == "undefined") {
    return false
  }
  
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false
  }
}

export const createCategory = (userId, token, category) => {
  // console.log(name, email, password)
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
  .then(res => {
    return res.json()
  })
  .catch(err => {
    console.log(err)
  })
};

