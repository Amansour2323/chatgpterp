import { Router } from 'express';
import { pool } from '../services/db.js';
const router = Router();

router.get('/kpis', async (_req,res)=>{
  const salesTotal = await pool.query('SELECT COALESCE(SUM(total),0) as total FROM sales');
  const purchasesTotal = await pool.query('SELECT COALESCE(SUM(total),0) as total FROM purchases');
  const expensesTotal = await pool.query('SELECT COALESCE(SUM(amount),0) as total FROM expenses');
  const customers = await pool.query('SELECT COUNT(*)::int as count FROM customers');
  res.json({
    revenue: Number(salesTotal.rows[0].total||0),
    purchases: Number(purchasesTotal.rows[0].total||0),
    expenses: Number(expensesTotal.rows[0].total||0),
    customers: customers.rows[0].count||0
  });
});

export default router;
