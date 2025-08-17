import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pool } from '../services/db.js';
const router = Router();

router.post('/register', async (req,res)=>{
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (name,email,password_hash,role) VALUES ($1,$2,$3,$4)', [name,email,hash,'user']);
  res.json({ ok: true });
});

router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  const { rows } = await pool.query('SELECT * FROM users WHERE email=$1',[email]);
  if(rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
  const user = rows[0];
  const ok = await bcrypt.compare(password, user.password_hash);
  if(!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: process.env.JWT_EXPIRES || '30d' });
  res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
});

export default router;
