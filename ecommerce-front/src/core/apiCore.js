import { API } from "../config";

export const getProducts = (sortBy) => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=10`, {
    method: "GET"
  })
  .then(products => {
    return products.json();
  })
  .catch(err => console.log(err))
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
  .then(res => {
    return res.json()
  })
  .catch(err => console.log(err))
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
  // console.log(name, email, password)
  const data = { limit, skip, filters};
  return fetch(`${API}/products/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => {
    return res.json()
  })
  .catch(err => {
    console.log(err)
  })
};