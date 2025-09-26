import logger from "#config/logger.js";
import { createUser, login } from "#services/auth.service.js";
import { cookies } from "#utils/cookies.js";
import { formatValidationErrors } from "#utils/format.js";
import { jwttoken } from "#utils/jwt.js";
import { signinSchema, signupSchema } from "#validations/auth.validation.js";

export const signup = async (req, res, next) => {
  try {
    const validationResult = signupSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationErrors(validationResult.error)
      });
    }

    const { name, email, password, role } = validationResult.data;
    const user = await createUser({ name, email, password, role });
    const token = jwttoken.sign({ id: user.id, email: user.email, role: user.role });
    cookies.set(res, 'token', token)


    res.status(201).json({ message: 'User registered successfully', user, token });
  } catch (error) {
    logger.error('Signup error:', error);
    if (error.message === "Email already exists") {
      return res.status(409).json({ error: "Email already exists" });
    }
    next(error);
  }
};

export const signin = async (req, res) => {
  try {
    const validationResult = signinSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationErrors(validationResult.error)
      });
    }
    const { email, password } = validationResult.data;
    const user = await login(email, password);
    const token = jwttoken.sign({ id: user.id, email: user.email, role: user.role });
    cookies.set(res, 'token', token);

    res.status(200).json({ message: 'Signin successful', user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });

  } catch (error) {
    logger.error('Signin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
