import logger from "#config/logger.js";
import bcrypt from "bcrypt";
import { db } from "#config/database.js";
import { eq } from "drizzle-orm";
import { users } from "#models/users.model.js";

export const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    logger.error(`Password hashing error: ${error}`);
    throw new Error('Password hashing failed');
  }
}

export const createUser = async ({ name, email, password, role = 'user' }) => {
  const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existingUser.length > 0) throw new Error("Email already exists");

  const hashedPassword = await hashPassword(password);
  const [newUser] = await db
    .insert(users)
    .values({ name, email, password: hashedPassword, role })
    .returning({ id: users.id, name: users.name, email: users.email, role: users.role });

  logger.info(`New user created: ${email}`);
  return newUser;
}

export const login = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");
  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");
  return user;
}

export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
}

export const findUserByEmail = async (email) => {
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return user;
}