const jwt = require("jsonwebtoken");

export const UserAuth = (req: any, res: any, next: any) => {
  const authHeader = req.get("Authorization");

  console.log(authHeader)
  if (!authHeader) {
    req.isUserAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecretsecret");
  } catch (err) {
    req.isUserAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isUserAuth = false;
    return next();
  }
  req.userId = decodedToken.userId;
  req.isUserAuth = true;
  next();
};

module.exports = UserAuth;