import axios from "./http-common";

/**
 * Service for login and session management.
 */
class AuthService {
  /**
   * Registers the user.
   * @param   {Object}  credentials           The body of the request.
   * @param   {String}  credentials.name      The user's name.
   * @param   {String}  credentials.email     The user's email.
   * @param   {String}  credentials.password  The user's password.
   * @param   {String}  credentials.role      The user's role.
   * @return  {String}                        JSON Web Token.
   */
  static signup = async (credentials) => {
    return axios.post("auth/signup", credentials);
  };

  /**
   * Logs the user in.
   * @param   {Object}  credentials           The body of the request.
   * @param   {String}  credentials.email     The user's email.
   * @param   {String}  credentials.password  The user's password.
   * @return  {String}                        JSON Web Token.
   */
  static loginTutor = async (credentials) => {
    return axios.post("/auth/login/tutors", credentials);
  };

  static login = async (credentials) => {
    return axios.post("/auth/login", credentials);
  };
}

export default AuthService;
