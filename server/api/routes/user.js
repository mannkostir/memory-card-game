import { Router } from 'express';
import UserService from '../../services/UserService';
import attachCurrentUser from '../middlewares/attachCurrentUser';
import getCurrentUserId from '../middlewares/getCurrentUserId';

const router = Router();

export default (app = Router) => {
  app.use('/users', router);

  router.get('/highscores', async (req, res, next) => {
    try {
      const { limit } = req.query;

      const userService = new UserService();

      const highscores = await userService.GetAllHighscores({ limit });

      return res.status(200).json(highscores);
    } catch (e) {
      return next(e);
    }
  });

  router.use('/:username', getCurrentUserId, attachCurrentUser);

  router.get('/:username/history', async (req, res, next) => {
    try {
      const { gameMode, start, limit } = req.query;

      const userService = new UserService(res.locals.user);

      const { history, recordsAmount } = await userService.GetHistory({
        gameMode,
        start,
        limit,
      });

      return res.status(200).json({ history, recordsAmount });
    } catch (e) {
      return next(e);
    }
  });

  router.post('/:username/history/cleanup', async (req, res, next) => {
    try {
      const { gameModes } = req.body;

      const userService = new UserService(res.locals.user);

      await userService.ClearHistory(gameModes);

      return res.sendStatus(204);
    } catch (e) {
      return next(e);
    }
  });

  router.put('/:username/highscore', async (req, res, next) => {
    try {
      const { score } = req.body;

      const userService = new UserService(res.locals.user);

      const response = await userService.UpdateHighscore({ score });

      return res.status(200).json(response);
    } catch (e) {
      return next(e);
    }
  });

  router.delete('/:username', async (req, res, next) => {
    try {
      const userService = new UserService(res.locals.user);

      await userService.DeleteUser();

      return res.status(204).send();
    } catch (e) {
      return next(e);
    }
  });

  router.post('/:username/password_change', async (req, res, next) => {
    try {
      const { currentPassword, newPassword } = req.body;

      const userService = new UserService(res.locals.user);

      await userService.ChangePassword({ currentPassword, newPassword });

      return res.sendStatus(204);
    } catch (e) {
      return next(e);
    }
  });

  router.patch('/:username/history', async (req, res, next) => {
    try {
      const historyItemData = req.body;

      const userService = new UserService(res.locals.user);

      const response = await userService.UpdateHistory(historyItemData);

      return res.status(200).json(response);
    } catch (e) {
      return next(e);
    }
  });
};
