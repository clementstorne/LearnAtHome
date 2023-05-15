import axios from "./http-common";

/**
 * Service for login and session management.
 */
class AuthService {
  /**
   * Logs the user in.
   * @param   {Object}  credentials           The body of the request.
   * @param   {String}  credentials.email     The user's email.
   * @param   {String}  credentials.password  The user's password.
   * @return  {String}                        JSON Web Token.
   */
  static login = async (credentials) => {
    return axios.post("/login", credentials);
  };
}

export default AuthService;
