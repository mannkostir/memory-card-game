const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const withErrorHandling = require('../utils/withErrorHandling');

exports.createUser = withErrorHandling(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      // errors: errors.array(), // such data should not go to client, it exposes security
      message: 'Invalid data',
    });
  }

  const { username, password } = req.body;

  const candidate = await User.findOne({ username });

  if (candidate) {
    return res
      .status(409)
      .json({ message: 'User with this name already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword });

  await user.save();

  return res.status(201).json({ message: 'User created successfully' });
});

exports.login = withErrorHandling(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      // errors: errors.array(), // such data should not go to client, it exposes security
      message: 'Invalid data',
    });
  }

  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: 'Wrong username or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: 'Wrong username or password' });
  }

  const token = jwt.sign({ userId: user.id, username }, process.env.jwtSecret, {
    expiresIn: '1h',
  });

  return res.status(200).json({
    token,
    userId: user.id,
    username,
    message: 'Login successful',
  });
});

exports.changePassword = withErrorHandling(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = res.locals.user;

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch)
    return res.status(400).json({ message: 'Passwords do not match' });

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  await user.save();

  return res.status(200).json({ message: 'Password changed' });
});

exports.deleteUser = withErrorHandling(async (req, res) => {
  const user = res.locals.user;

  await user.remove();

  return res.status(200).json({ message: 'Deleted', user });
});
