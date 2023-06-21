import axios from "./http-common";

/**
 * Service for user's tasks.
 */
class TaskService {
  static createTask = async (credentials) => {
    const token = localStorage.getItem("Learn@Home_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.post("/tasks", credentials);
  };
  static getAllTasks = async () => {
    const token = localStorage.getItem("Learn@Home_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.get("/tasks");
  };
  static getSingleTask = async (taskId) => {
    const token = localStorage.getItem("Learn@Home_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.get(`/tasks/${taskId}`);
  };
  static updateTask = async (taskId, credentials) => {
    const token = localStorage.getItem("Learn@Home_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.patch(`/tasks/${taskId}`, credentials);
  };
}

export default TaskService;
