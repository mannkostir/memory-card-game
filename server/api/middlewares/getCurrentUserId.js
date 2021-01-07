import User from '../../models/User';
import jwt from 'jsonwebtoken';
import { createTokens } from '../../utils/createTokens';

const getCurrentUserId = async (req, res, next) => {
  // let token = req.headers.authorization;

  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken && !refreshToken) {
    return res.sendStatus(401);
  }

  try {
    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.userId = decodedAccessToken.userId;
    return next();
  } catch {}

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  let decodedRefreshToken;

  try {
    decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch {
    return res.sendStatus(401);
  }

  const createdTokens = createTokens({
    userId: decodedRefreshToken.userId,
    username: decodedRefreshToken.username,
  });

  res.cookie('accessToken', createdTokens.accessToken, { httpOnly: true });
  res.cookie('refreshToken', createdTokens.refreshToken, { httpOnly: true });
  req.userId = decodedRefreshToken.userId;

  return next();
};

export default getCurrentUserId;
