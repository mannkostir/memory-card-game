import Highscore from '../models/Highscore';

export default class HighscoreService {
  constructor(highscoreModel = Highscore) {
    this.highscoreModel = highscoreModel;
  }

  async GetAllHighscores({ limit = 0 }) {
    try {
      const highscores = await this.highscoreModel.find().populate('user');

      let formattedHighscores = highscores.sort((a, b) =>
        a.score < b.score ? 1 : -1
      );

      if (limit && limit > 0) {
        formattedHighscores = formattedHighscores.slice(0, limit);
      }

      return formattedHighscores;
    } catch (e) {
      throw e;
    }
  }

  async UpdateHighscores(userId, score) {
    try {
      const highscore = await this.highscoreModel.findOne({ user: userId });

      if (highscore.score > score) {
        return {
          message: 'Score is already equal or higher',
          highscore: highscore.score,
        };
      }

      highscore.score = score;

      await highscore.save();

      return highscore;
    } catch (e) {
      throw e;
    }
  }
}
