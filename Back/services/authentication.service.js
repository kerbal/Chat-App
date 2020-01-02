import { sequelize, Sequelize } from "../config/sequelize";
import { User } from '../models';
import TokenService from "./token.service";

class AuthenticationService {
  static async register (email, username, password) {
    const t = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
    });

    try {
      const user = await User.findOne({
        where: {
          [Sequelize.Op.or]: [
            {
              Email: email
            }, {
              Username: username
            }
          ]
        }
      });
      if(user) {
        return `Email or display name has been taken!`;
      }
      await User.create({
        Email: email,
        Username: username,
        Password: password
      }, {
        transaction: t
      });

      await t.commit();
    }
    catch (error) {
      await t.rollback();
      return error.message;
    }
  }

  static async login (loginName, password) {
    try {
      const t = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
      });

      const user = await User.findOne({
        where: {
          [Sequelize.Op.or]: [
            {
              Email: loginName
            }, {
              Username: loginName
            }
          ],
          Password: password
        }
      });

      if(!user) {
        return 'Wrong email or password!';
      }

      let token;
      if(!user.Token) {
        token = TokenService.createToken({
          userId: user.id,
          username: user.Username,
          email: user.Email
        });

        await User.update({
          Token: token
        }, {
          where: {
            id: user.id
          },
          transaction: t
        });
      }
      else {
        token = user.Token;
      }

      await t.commit();
      return ({
        id: user.id,
        token,
        username: user.Username
      });
    }
    catch (error) {
      return error.message;
    }
  }

  static async verifyToken (token) {
    try {
      const { username, email } = await TokenService.decodeToken(token);
      const user = await User.findOne({
        where: {
          Username: username,
          Email: email
        }
      });
      if(user && user.Token === token) {
        return true;
      }
      else {
        return false;
      }
    }
    catch (error) {
      console.log(error.message);
      return false;
    }
  }
}

export default AuthenticationService;