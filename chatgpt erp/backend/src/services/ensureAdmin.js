import bcrypt from 'bcrypt';
import { pool } from './db.js';
export async function ensureAdmin(){
  const email = process.env.ADMIN_EMAIL || 'admin@zaitoon.store';
  const pass = process.env.ADMIN_PASSWORD || 'admin123';
  const { rows } = await pool.query('SELECT id FROM users WHERE email=$1',[email]);
  if(rows.length === 0){
    const hash = await bcrypt.hash(pass,10);
    await pool.query('INSERT INTO users (name,email,password_hash,role) VALUES ($1,$2,$3,$4)',
      ['Admin', email, hash, 'admin']);
    console.log('Admin user ensured:', email);
  }
}
