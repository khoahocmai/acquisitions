import 'dotenv/config';
import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon';

const sql = neon(process.env.DATABASE_UR);
const db = drizzle(sql);

export default { sql, db };