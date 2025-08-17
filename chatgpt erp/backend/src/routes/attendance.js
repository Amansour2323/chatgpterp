import { Router } from 'express';
import { pool } from '../services/db.js';
const router = Router();

// Register employee
router.post('/employees', async (req,res)=>{
  const { name, code, branch_id } = req.body; // code = fingerprint/card code
  const r = await pool.query('INSERT INTO employees (name, code, branch_id) VALUES ($1,$2,$3) RETURNING *',[name, code, branch_id]);
  res.json(r.rows[0]);
});

router.get('/employees', async (_req,res)=>{
  const r = await pool.query('SELECT * FROM employees ORDER BY id ASC');
  res.json(r.rows);
});

// Punch in/out (from device webhook or UI)
router.post('/punch', async (req,res)=>{
  const { code, branch_id, method } = req.body; // method: 'fingerprint' | 'barcode' | 'manual'
  const er = await pool.query('SELECT * FROM employees WHERE code=$1 LIMIT 1',[code]);
  if(er.rows.length === 0) return res.status(404).json({ error: 'Employee not found' });
  const emp = er.rows[0];
  const r = await pool.query('INSERT INTO attendance_logs (employee_id, branch_id, method, direction) VALUES ($1,$2,$3,$4) RETURNING *',
    [emp.id, branch_id || emp.branch_id, method || 'fingerprint', 'auto']);
  res.json(r.rows[0]);
});

router.get('/logs', async (req,res)=>{
  const { branch_id } = req.query;
  const r = await pool.query(`
    SELECT l.id, l.created_at, e.name as employee, b.name as branch, l.method
    FROM attendance_logs l
    JOIN employees e ON e.id=l.employee_id
    JOIN branches b ON b.id=l.branch_id
    WHERE ($1::int IS NULL OR l.branch_id=$1)
    ORDER BY l.created_at DESC
    LIMIT 200
  `,[branch_id || null]);
  res.json(r.rows);
});

export default router;
