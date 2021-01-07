module.exports = (
  fn,
  errorStatus = 500,
  fallbackMessage = 'Something went wrong',
  logToConsole = true
) => {
  if (typeof fn !== 'function')
    throw new Error('Argument must be of type "function".');

  return async (req, res, ...args) => {
    try {
      await fn(req, res, ...args);
    } catch (error) {
      logToConsole &&
        (console.error || console.log).call(console, error.stack || error);
      res
        .status(errorStatus)
        .json({ message: error.message || fallbackMessage });
    }
  };
};
