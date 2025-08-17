import { ensureAdmin } from '../services/ensureAdmin.js';
await ensureAdmin();
process.exit(0);
