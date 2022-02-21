import http from "./httpService";

const httpOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
const options = {
  method: "GET",
  url: "https://imdb8.p.rapidapi.com/actors/get-awards",
  params: { nconst: "nm0001667" },
  headers: {
    "access-control-allow-origin": "*",
    "content-type": "application/json",
    "access-control-allow-credentials": "true",
    "access-control-allow-headers": "ver",
    "access-control-allow-methods": "GET, POST",
    "x-rapidapi-host": "imdb8.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_API_KEY,
  },
};

export const fetchPosts = () => {
  const API_URL = "https://jsonplaceholder.typicode.com/posts";
  return http.get(`${API_URL}`, httpOptions);
};

export const fetchPost = (id) => {
  const API_URL = `https://jsonplaceholder.typicode.com/posts/${id}`;
  return http.get(`${API_URL}`, httpOptions);
};
export const createPost = (data) => {
  const API_URL = "https://jsonplaceholder.typicode.com/posts";
  return http.post(API_URL, data, httpOptions);
};

export const updatePost = (id, data) => {
  const API_URL = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const response = http.put(API_URL, data, httpOptions);
  return response;
};

export const deletePost = (id) => {
  const API_URL = `https://jsonplaceholder.typicode.com/posts/${id}`;
  return http.delete(`${API_URL}`, httpOptions);
};

export const getAwards = () => {
  const API_URL = `https://imdb8.p.rapidapi.com/actors/get-awards`;
  return http.request(options);
};
