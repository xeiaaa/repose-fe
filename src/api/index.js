import axios from "axios";
import { API_URL } from "../constants";
import authAxios from "./authAxios";

export const login = (email, password) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
};

export const me = () => {
  return authAxios.get(`${API_URL}/auth/me`);
};

export const createUser = (email, name) => {
  return authAxios.post(`${API_URL}/users`, {
    email,
    name,
  });
};

export const createLeave = (body) => {
  return authAxios.post(`${API_URL}/leaves`, body);
};

export const getUsers = (params = {}) => {
  const { filter } = params;
  return authAxios.get(
    `${API_URL}/users?${filter ? `filter=${JSON.stringify(filter)}` : ""}`
  );
};

export const getLeaves = (params = {}) => {
  const { filter } = params;
  return authAxios.get(
    `${API_URL}/leaves?limit=1000&populate=user&${
      filter ? `filter=${JSON.stringify(filter)}` : ""
    }`
  );
};

export const approveLeave = (leaveId) => {
  return authAxios.patch(`${API_URL}/leaves/${leaveId}/approve`);
};

export const denyLeave = (leaveId) => {
  return authAxios.patch(`${API_URL}/leaves/${leaveId}/deny`);
};

export const cancelLeave = (leaveId) => {
  return authAxios.patch(`${API_URL}/leaves/${leaveId}`, {
    status: "CANCELLED",
  });
};
