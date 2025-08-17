import { pool } from '../services/db.js';
import fs from 'fs';
import path from 'path';
const sql = fs.readFileSync(path.join(process.cwd(), 'src', 'migrations', '001_init.sql'), 'utf8');
await pool.query(sql);
console.log('Migration applied.');
process.exit(0);
