import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { pool } from './services/db.js';
import authRoutes from './routes/auth.js';
import productsRoutes from './routes/products.js';
import suppliersRoutes from './routes/suppliers.js';
import customersRoutes from './routes/customers.js';
import expensesRoutes from './routes/expenses.js';
import reportsRoutes from './routes/reports.js';
import attendanceRoutes from './routes/attendance.js';
import branchesRoutes from './routes/branches.js';
import { ensureAdmin } from './services/ensureAdmin.js';

dotenv.config();
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  const r = await pool.query('select 1 as ok');
  res.json({ ok: r.rows[0].ok === 1 });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/suppliers', suppliersRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/branches', branchesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await ensureAdmin();
  console.log(`Zaitoon ERP API running on port ${PORT}`);
});
