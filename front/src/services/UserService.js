import axios from "./http-common";

/**
 * Service for login and session management.
 */
class UserService {
  static getUserData = async () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.get("/users/profile");
  };
}

export default UserService;
