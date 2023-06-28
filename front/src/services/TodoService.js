import axios from "./http-common";

/**
 * Service for user's todos.
 */
class TodoService {
  static createTodo = async (credentials) => {
    const token = localStorage.getItem("Learn@Home_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.post("/todos/", credentials);
  };
  static getAllTodos = async () => {
    const token = localStorage.getItem("Learn@Home_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.get("/todos/");
  };
  static updateTodo = async (todoId, credentials) => {
    const token = localStorage.getItem("Learn@Home_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.patch(`/todos/${todoId}`, credentials);
  };
}

export default TodoService;
