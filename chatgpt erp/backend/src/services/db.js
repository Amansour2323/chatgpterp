import dotenv from 'dotenv';
import pkg from 'pg';
dotenv.config();
const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'zaitoon_erp',
  user: process.env.DB_USER || 'erpuser',
  password: process.env.DB_PASSWORD || 'erppass',
});
