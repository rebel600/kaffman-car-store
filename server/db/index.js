import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// It should ONLY be the variable
const sql = neon(process.env.DATABASE_URL); 
export const db = drizzle(sql);
