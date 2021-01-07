import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import AuthService from '../../services/AuthService';
import attachCurrentUser from '../middlewares/attachCurrentUser';
import getCurrentUserId from '../middlewares/getCurrentUserId';

const router = Router();

export default (app = Router) => {
  app.use('/auth', router);

  router.post(
    '/signup',
    check('username').isAlpha().isLength({ min: 3 }),
    check('password').isLength({ min: 4 }),
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: errors.array()[0] || 'Invalid input data' });
      }

      try {
        const authService = new AuthService();

        const { username } = await authService.SignUp(req.body);

        return res
          .status(201)
          .json({ username, message: `User successfully created` });
      } catch (e) {
        return next(e);
      }
    }
  );

  router.post(
    '/signin',
    check('username').isAlpha().isLength({ min: 3 }),
    check('password').isLength({ min: 4 }),
    async (req, res, next) => {
      try {
        const authService = new AuthService();

        const {
          accessToken,
          refreshToken,
          username,
          userId,
        } = await authService.SignIn(req.body);

        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });

        return res.status(200).json({
          username,
          userId,
          message: 'Signed in successfully',
        });
      } catch (e) {
        return next(e);
      }
    }
  );

  router.post(
    '/check_auth',
    getCurrentUserId,
    attachCurrentUser,
    (_, res, next) => {
      try {
        return res.status(200).json({
          userId: res.locals.user.id,
          username: res.locals.user.username,
        });
      } catch (e) {
        return next(e);
      }
    }
  );

  router.post('/logout', (_, res, next) => {
    try {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      return res.sendStatus(204);
    } catch (e) {
      return next(e);
    }
  });
};
