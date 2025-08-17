import { Router } from 'express';
import { pool } from '../services/db.js';
const router = Router();

router.get('/', async (_req,res)=>{
  const r = await pool.query('SELECT * FROM customers ORDER BY id DESC');
  res.json(r.rows);
});

router.post('/', async (req,res)=>{
  const { name, email, phone, branch_id } = req.body;
  const r = await pool.query('INSERT INTO customers (name,email,phone,loyalty_points,branch_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [name, email, phone, 0, branch_id || null]);
  res.json(r.rows[0]);
});

router.post('/:id/loyalty', async (req,res)=>{
  const { delta, note } = req.body;
  const id = req.params.id;
  const r1 = await pool.query('UPDATE customers SET loyalty_points = loyalty_points + $1 WHERE id=$2 RETURNING *',[delta, id]);
  await pool.query('INSERT INTO loyalty_transactions (customer_id, delta, note) VALUES ($1,$2,$3)', [id, delta, note || '']);
  res.json(r1.rows[0]);
});

export default router;
