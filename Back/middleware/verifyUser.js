import AuthenticationService from "../services/authentication.service";

const verifyUser = async (req, res, next) => {
  const token = req.headers.authorization;
  const result = await AuthenticationService.verifyToken(token);
  if (result) {
    next();
  }
  else {
    res.status(401).send({
      message: 'token mismatch!'
    });
  }
}

export default verifyUser;