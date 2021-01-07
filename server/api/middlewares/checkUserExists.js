const User = require('../../models/User');

const checkUserExists = (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      throw new Error('User not found').status(404);
    }

    res.locals.user = user;

    return next();
  } catch (e) {
    return next(e);
  }
};

export default checkUserExists;