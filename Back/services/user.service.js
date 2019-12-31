import { User } from '../models';
import { Sequelize } from '../config/sequelize';

class UserService {
  static async search (pattern) {
    try {
      const users = await User.findAll({
        attributes: ['Username', 'Email', 'id'],
        where: {
          [Sequelize.Op.or]: [
            {
              Email: {
                [Sequelize.Op.like]: `%${pattern}%`
              }
            },
            {
              Username: {
                [Sequelize.Op.like]: `%${pattern}%`
              }
            }
          ]
        }
      });

      return users;
    }
    catch (error) {
      console.log(error);
      return [];
    }
  }
}

export default UserService;