import { Router } from 'express';
import { pool } from '../services/db.js';
const router = Router();

router.get('/', async (_req,res)=>{
  const r = await pool.query('SELECT * FROM branches ORDER BY id ASC');
  res.json(r.rows);
});

router.post('/', async (req,res)=>{
  const { name, city } = req.body;
  const r = await pool.query('INSERT INTO branches (name, city) VALUES ($1,$2) RETURNING *',[name, city]);
  res.json(r.rows[0]);
});

export default router;
