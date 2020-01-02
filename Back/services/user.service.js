import { User, sequelize } from '../models';
import { Sequelize } from '../config/sequelize';

class UserService {
  static async search (pattern, userId) {
    try {
      const users = await User.findAll({
        attributes: ['Username', 'id'],
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
          ],
          id: {
            [Sequelize.Op.ne]: userId
          }
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