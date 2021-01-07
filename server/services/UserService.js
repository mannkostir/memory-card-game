import User from '../models/User';
import bcrypt from 'bcryptjs';

export default class UserService {
  constructor(userModel = User) {
    this.userModel = userModel;
  }

  async ChangePassword({ currentPassword = '', newPassword = '' }) {
    try {
      const user = this.userModel;

      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        throw new Error().status(401);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;

      await user.save();
    } catch (e) {
      throw e;
    }
  }

  async DeleteUser() {
    try {
      const user = this.userModel;

      await user.remove();
    } catch (e) {
      throw e;
    }
  }

  async GetAllHighscores({ limit = 0 }) {
    try {
      const users = await this.userModel.find();

      let highscores = users
        .map((user) => ({
          user: { username: user.username },
          score: user.highscore,
        }))
        .sort((a, b) => (a.score < b.score ? 1 : -1));

      if (limit && limit > 0) {
        highscores = highscores.slice(0, limit);
      }

      return highscores;
    } catch (e) {
      throw e;
    }
  }

  async UpdateHighscore({ score = 0 }) {
    try {
      const user = this.userModel;

      let updatedScore;

      if (user.highscore >= score) {
        updatedScore = user.highscore;

        return {
          message: 'Score is already equal or higher',
          score: updatedScore,
          username: user.username,
        };
      }

      updatedScore = score;

      user.highscore = updatedScore;

      await user.save();

      return {
        message: 'Highscore updated successfully',
        score: updatedScore,
        username: user.username,
      };
    } catch (e) {
      throw e;
    }
  }

  async GetHistory({ gameMode = '', limit = 0, start = 0 }) {
    try {
      const user = this.userModel;

      let history;

      if (gameMode && gameMode !== 'undefined') {
        history = user.history.filter((record) => record.gameMode === gameMode);
      } else {
        history = user.history;
      }

      const recordsAmount = history.length;

      if (limit) {
        history = history.slice(+start, +start + +limit);
      }

      return { history, recordsAmount };
    } catch (e) {
      throw e;
    }
  }

  async UpdateHistory(historyItemDTO) {
    try {
      const { matchesAmount, passedTime, gameMode } = historyItemDTO;

      const checks = {
        isMatchesAmount: !!matchesAmount,
        isPassedTime:
          !!Number.isInteger(passedTime?.minutes) &&
          !!Number.isInteger(passedTime?.seconds),
        isGameMode: !!gameMode,
      };

      if (
        !checks.isMatchesAmount ||
        !checks.isPassedTime ||
        !checks.isGameMode
      ) {
        const err = new Error(
          `'matchesAmount', 'passedTime' and 'gameMode' should be specified in the request body. Currently present fields: ${Object.keys(
            historyItemDTO
          )}. Please specify '${[
            !checks.isMatchesAmount ? 'matchesAmount ' : null,
            !checks.isPassedTime ? ' passedTime ' : null,
            !checks.isGameMode ? ' gameMode ' : null,
          ].filter((str) => str !== null)}' field(s)`
        );
        err.status = 400;

        throw err;
      }

      const user = this.userModel;

      user.history.push({ matchesAmount, passedTime, gameMode });

      await user.save();

      const updatedHistory = gameMode ? user.history : user.history[gameMode];

      return { history: updatedHistory, username: user.username };
    } catch (e) {
      throw e;
    }
  }

  async ClearHistory(gameModes = []) {
    try {
      const user = this.userModel;

      if (gameModes.length <= 0) {
        return;
      }

      user.history = user.history.filter(
        (game) => !gameModes.includes(game.gameMode)
      );

      await user.save();
    } catch (e) {
      throw e;
    }
  }
}
