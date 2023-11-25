import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  dataBaseUrl: process.env.DATABASE_URL,
  salt_round:process.env.SALT_ROUNDS
};