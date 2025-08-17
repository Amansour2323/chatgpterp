import { Router } from 'express';
import { pool } from '../services/db.js';
const router = Router();

router.get('/', async (_req,res)=>{
  const r = await pool.query('SELECT * FROM products ORDER BY id DESC');
  res.json(r.rows);
});

router.post('/', async (req,res)=>{
  const { sku, name, price, stock, low_stock_threshold, barcode } = req.body;
  const r = await pool.query('INSERT INTO products (sku,name,price,stock,low_stock_threshold,barcode) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
    [sku, name, price, stock || 0, low_stock_threshold || 5, barcode || null]);
  res.json(r.rows[0]);
});

router.get('/alerts/low-stock', async (_req,res)=>{
  const r = await pool.query('SELECT * FROM products WHERE stock <= low_stock_threshold ORDER BY stock ASC');
  res.json(r.rows);
});

router.get('/barcode/:code', async (req,res)=>{
  const { code } = req.params;
  const r = await pool.query('SELECT * FROM products WHERE barcode=$1 OR sku=$1 LIMIT 1', [code]);
  if(r.rows.length === 0) return res.status(404).json({ error: 'Not found' });
  res.json(r.rows[0]);
});

export default router;
