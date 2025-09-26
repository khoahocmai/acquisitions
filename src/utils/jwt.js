import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key-here_change-in-production';
const JWT_EXPIRES_IN = '1h'; // Token expiration time

export const jwttoken = {
  sign: (payload) => {
    try {
      return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    } catch (error) {
      logger.error('Failed to authenticate:', error);
      throw new Error('Failed to authenticate');
    }
  },

  verify: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      logger.error('Invalid token:', error);
      throw new Error('Invalid token');
    }
  }
}
