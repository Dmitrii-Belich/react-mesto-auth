import { authOptions } from "./constants";

export const register = (user) => {
  return fetch(`${authOptions.BASE_URL}/signup`, {
    method: "POST",
    headers: authOptions.headers,
    body: JSON.stringify(user),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.json());
  });
};

export const authorize = (user) => {
  return fetch(`${authOptions.BASE_URL}/signin`, {
    method: "POST",
    headers: authOptions.headers,
    body: JSON.stringify(user),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.json());
  });
};

export const checkToken = (token) => {
  return fetch(`${authOptions.BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      ...authOptions.headers,
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};
