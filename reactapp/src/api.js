import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api", 
  headers: { "Content-Type": "application/json" },
});

export const signup = (user) =>
  api.post("/auth/signup", {
    id: null,
    name: user.name || "", 
    email: user.email,
    password: user.password,
    role: user.role || "USER",
  });

export const login = (credentials) =>
  api.post("/auth/login", {             
    email: credentials.email,
    password: credentials.password,
  });

export const getUsers = () => api.get("/users");
export const getUserById = (id) => api.get(`/users/${id}`);
export const deleteUser = (userId) => api.delete(`/users/${userId}`);

export const getTasks = (userId) => api.get(`/users/${userId}/tasks`);
export const addTask = (userId, task) => api.post(`/users/${userId}/tasks`, task);
export const updateTask = (userId, taskId, task) =>
  api.put(`/users/${userId}/tasks/${taskId}`, task);
export const deleteTask = (userId, taskId) =>
  api.delete(`/users/${userId}/tasks/${taskId}`);

// export const getReminders = (taskId) => api.get(`/tasks/${taskId}/reminders`);
// export const addReminder = (taskId, reminder) =>
//   api.post(`/tasks/${taskId}/reminders`, reminder);
// export const updateReminder = (reminderId, reminder) =>
//   api.put(`/reminders/${reminderId}`, reminder);
// export const deleteReminder = (reminderId) => api.delete(`/reminders/${reminderId}`);
// export const getReminderById = (reminderId) => api.get(`/reminders/${reminderId}`);

// REMINDERS API
export const getReminders = async (taskId) => {
  try {
    return await api.get(`/tasks/${taskId}/reminders`);
  } catch (err) {
    console.error("Error fetching reminders:", err.response?.data || err.message);
    throw err;
  }
};

export const addReminder = async (taskId, reminder) => {
  try {
    return await api.post(`/tasks/${taskId}/reminders`, {
    reminder_date: reminder.reminder_date || reminder.date,
    status: reminder.status || "PENDING",
    message: reminder.message || reminder.title,
  });
  } catch (err) {
    console.error("Error adding reminder:", err.response?.data || err.message);
    throw err;
  }
};

export const updateReminder = async (reminderId, reminder) => {
  try {
    return await api.put(`/reminders/${reminderId}`, reminder);
  } catch (err) {
    console.error("Error updating reminder:", err.response?.data || err.message);
    throw err;
  }
};

export const deleteReminder = async (reminderId) => {
  try {
    return await api.delete(`/reminders/${reminderId}`);
  } catch (err) {
    console.error("Error deleting reminder:", err.response?.data || err.message);
    throw err;
  }
};

export const getReminderById = async (reminderId) => {
  try {
    return await api.get(`/reminders/${reminderId}`);
  } catch (err) {
    console.error("Error fetching reminder:", err.response?.data || err.message);
    throw err;
  }
};
