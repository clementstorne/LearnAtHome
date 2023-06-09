import axios from "./http-common";

/**
 * Service for fetching user's data.
 */
class UserService {
  static getUserData = async () => {
    const token = localStorage.getItem("Learn@Home_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.get("/users/profile");
  };
  static updateUserProfile = async (formData) => {
    const token = localStorage.getItem("Learn@Home_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.patch("/users/profile", formData);
  };
}

export default UserService;
