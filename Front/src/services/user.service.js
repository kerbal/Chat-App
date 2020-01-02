import APIService from "./api.service";
import { SEARCH } from "../config/routes";

class UserService {
  static async search(pattern) {
    try {
      const response = await new APIService(
        'get',
        SEARCH,
        {
          pattern
        },
        undefined,
        true
      ).request();
      return response.users;
    }
    catch (error) {
      return [];
    }
  }
}

export default UserService;