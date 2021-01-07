const withErrorHandling = require('../utils/withErrorHandling');

exports.getHistory = withErrorHandling(async (req, res) => {
  const { gameMode, limit, start } = req.query;

  const user = res.locals.user;

  let history, recordsAmount;

  if (gameMode && gameMode !== 'undefined') {
    history = user.history.filter((game) => game.gameMode === gameMode);
    recordsAmount = history.length;
  } else {
    history = user.history;
    recordsAmount = history.length;
  }

  if (limit) {
    history = history.slice(+start, +start + +limit);
  }

  return res.status(200).json({ history, recordsAmount });
});

exports.addGameToHistory = withErrorHandling(async (req, res) => {
  const { matchesAmount, passedTime, gameMode, victory } = req.body;

  if (!matchesAmount || !passedTime || !gameMode) {
    return res.status(400).json({
      message: `'matchesAmount', 'passedTime' and 'gameMode' should be specified in the request body. Currently present fields: ${Object.keys(
        req.body
      )}. Please specify '${
        (matchesAmount || 'matchesAmount',
        passedTime || 'passedTime',
        gameMode || 'gameMode')
      }' field`,
    });
  }

  const user = res.locals.user;

  user.history.push({ matchesAmount, passedTime, gameMode, victory });

  await user.save();

  const result = gameMode ? user.history : user.history[gameMode];

  return res.status(200).json({
    message: 'Game saved successfully',
    history: result,
  });
});

exports.clearHistory = withErrorHandling(async (req, res) => {
  const { gameMode } = req.query;
  const user = res.locals.user;

  if (gameMode && gameMode !== 'undefined') {
    user.history = user.history.filter((game) => game.gameMode !== gameMode);
  } else {
    user.history = [];
  }

  await user.save();

  return res.status(200).json({ message: 'History cleaned up' });
});
