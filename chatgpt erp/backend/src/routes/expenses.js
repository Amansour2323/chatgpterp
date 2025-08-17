import { Router } from 'express';
import { pool } from '../services/db.js';
const router = Router();

router.get('/', async (_req,res)=>{
  const r = await pool.query('SELECT * FROM expenses ORDER BY date DESC');
  res.json(r.rows);
});

router.post('/', async (req,res)=>{
  const { date, category, amount, note, supplier_id, branch_id } = req.body;
  const r = await pool.query(
    'INSERT INTO expenses (date, category, amount, note, supplier_id, branch_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
    [date, category, amount, note, supplier_id || null, branch_id || null]
  );
  res.json(r.rows[0]);
});

export default router;
