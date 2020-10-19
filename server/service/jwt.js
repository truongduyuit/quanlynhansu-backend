import jwt from "jsonwebtoken";

const generateAccessToken = function (data, options = {}) {
  return jwt.sign({ ...data, isAccess: true },
    process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    ...options,
  });
};

const generateRefreshToken = function (data, options = {}) {
  return jwt.sign({ ...data, isRefresh: true },
    process.env.JWT_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    ...options,
  });
};

export default {
  generateAccessToken,
  generateRefreshToken
};
