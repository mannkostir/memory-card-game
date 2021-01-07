import User from '../models/User';
import bcrypt from 'bcryptjs';
import { createTokens } from '../utils/createTokens';

export default class AuthService {
  constructor(userModel = User) {
    this.userModel = userModel;
  }
  async SignUp({ username = '', password = '' }) {
    try {
      const candidate = await this.userModel.findOne({ username });

      if (candidate) {
        const err = new Error('User with this name already exists');
        err.status = '409';

        throw err;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userModel.create({
        username,
        password: hashedPassword,
      });

      return { username: user.username };
    } catch (e) {
      throw e;
    }
  }

  async SignIn({ username = '', password = '' }) {
    try {
      const user = await this.userModel.findOne({ username });

      if (!user) {
        const err = new Error('Wrong username or password');
        err.status = '401';

        throw err;
      }

      const isMatch = await bcrypt.compare(password, user?.password);

      if (!isMatch) {
        const err = new Error('Wrong username or password');
        err.status = '401';

        throw err;
      }

      const { accessToken, refreshToken } = createTokens({
        userId: user.id,
        username: user.username,
      });

      return { accessToken, refreshToken, userId: user.id, username };
    } catch (e) {
      throw e;
    }
  }
}
