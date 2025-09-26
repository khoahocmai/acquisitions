export const cookies = {
  getOptions: () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000 // 15 minutes
  }),

  set: (res, name, value, options = {}) => {
    const cookieOptions = { ...cookies.getOptions(), ...options };
    res.cookie(name, value, cookieOptions);
  },

  clear: (res, name, options = {}) => {
    const cookieOptions = { ...cookies.getOptions(), ...options };
    res.clearCookie(name, cookieOptions);
  },

  get: (req, name) => {
    return req.cookies[name];
  }
};