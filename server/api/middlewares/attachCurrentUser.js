import User from '../../models/User';

const attachCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.sendStatus(401);
    }

    res.locals.user = user;

    return next();
  } catch (e) {
    next(e);
  }
};

export default attachCurrentUser;
