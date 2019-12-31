import jwt from 'jsonwebtoken';
import tokenConfig from '../config/token.config';

class TokenService {
  static createToken (object) {
    const token = jwt.sign(
      object, 
      tokenConfig.secret, 
      {
        algorithm: tokenConfig.algorithm,
        expiresIn: tokenConfig.expiredIn
      }
    );
    return token;
  }

  static async decodeToken (token) {
    try {
      return await jwt.verify(
        token, 
        tokenConfig.secret, 
        {
          algorithm: tokenConfig.algorithm
        },
        (error, decoded) => decoded
      );
    }
    catch (error) {
      return null;
    }
  }
}

export default TokenService;