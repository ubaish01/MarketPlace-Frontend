import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =  JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.token || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDJjNmI4ZDZlZGE3NmFjYmY0YWIwMSIsImlzU2VsbGVyIjp0cnVlLCJpYXQiOjE2NzQ3NjE4ODMsImV4cCI6MTY3NTAyMTA4M30.8cpggUXgvfCBurNE_GmI47JVd2Tc8cCRmpVFeedTSdY";

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.token;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` }
});