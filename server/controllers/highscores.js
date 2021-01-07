const User = require('../models/User');
const withErrorHandling = require('../utils/withErrorHandling');

exports.getOneHighscore = withErrorHandling(async (req, res) => {
  const user = res.locals.user;

  return res
    .status(200)
    .json({ username: user.username, highscore: user.highscore });
});

exports.getAllHighscores = withErrorHandling(async (req, res) => {
  const { limit } = req.query;

  const users = await User.find();

  let highscores = users
    .map((user) => ({
      user: { username: user.username },
      score: user.highscore,
    }))
    .sort((a, b) => (a.score < b.score ? 1 : -1));

  if (limit) {
    highscores = highscores.slice(0, limit);
  }

  return res.status(200).json(highscores);
});

exports.updateHighscore = withErrorHandling(async (req, res) => {
  const { score } = req.body;

  if (!score) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const user = res.locals.user;

  const currentHighscore = user.highscore;

  if (currentHighscore >= score) {
    return res
      .status(200)
      .json({ message: 'Score is already equal or higher' });
  }

  user.highscore = score;

  await user.save();

  return res.status(200).json({
    message: 'Highscore updated successfully',
  });
});
