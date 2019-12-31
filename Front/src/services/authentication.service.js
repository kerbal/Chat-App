import APIService from "./api.service";
import { REGISTER, LOGIN } from "../config/routes";
import CookieService from "./cookie.service";

class AuthenticationService {
  static async register (info) {
    try {
      await new APIService(
        'post',
        REGISTER,
        undefined,
        info
      ).request();
    }
    catch (error) {
      return APIService.handleError(error);
    }
  }

  static async login (info) {
    try {
      const response = await new APIService(
        'put',
        LOGIN,
        undefined,
        info
      ).request();
      CookieService.writeInfo(response);
    }
    catch (error) {
      return APIService.handleError(error);
    }
  }
}

export default AuthenticationService;