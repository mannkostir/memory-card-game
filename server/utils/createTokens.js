import jwt from 'jsonwebtoken';

export const createTokens = (payload = { userId: '', username: '' }) => {
  const refreshToken = jwt.sign(
    { userId: payload.userId, username: payload.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '30d' }
  );

  const accessToken = jwt.sign(
    { userId: payload.userId, username: payload.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15min' }
  );

  return { refreshToken, accessToken };
};
