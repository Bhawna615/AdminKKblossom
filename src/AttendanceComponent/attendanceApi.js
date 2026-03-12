import axios from "axios";

const API = "http://localhost/kkblossom/api.php/Adminapi";

export const getClasses = () =>
  axios.get(`${API}/MarkAttendence/getClasses`);

export const getRollCall = (data) =>
  axios.post(`${API}/MarkAttendence/getRollCall`, data);

export const submitAttendance = (data) =>
  axios.post(`${API}/MarkAttendence/submitAttendance`, data);

export const getAttendance = () =>
  axios.get(`${API}/MarkAttendence/getAttendance`);

export const filterAttendance = (year, month, className) =>
  axios.get(`${API}/MarkAttendence/filter/${year}/${month}/${className}`);

export const getDetails = (data) =>
  axios.post(`${API}/MarkAttendence/details`, data);
export const editAttendance = (data) =>
  axios.post(`${API}/MarkAttendence/edit`,data);