import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = async (formData) => {
  const response = await axios.post(API_URL + "register", formData);
  localStorage.setItem("user", JSON.stringify(response.data));
  localStorage.setItem("token", response.data.token);
  return response.data;
};

const login = async (formData) => {
  const response = await axios.post(API_URL + "login", formData);
  console.log("LOGIN RESPONSE 👉", response.data);
  localStorage.setItem("user", JSON.stringify(response.data));
  localStorage.setItem("token", response.data.token);
  return response.data;
};

const logout = () => {
  localStorage.clear();
};

const authService = {
  register,
  login,
  logout,
};

export default authService;