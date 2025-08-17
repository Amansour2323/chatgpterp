# Zaitoon Store ERP (Dashboard + Inventory + Attendance)

## Quick Start (Docker)
```bash
docker compose up -d --build
```
- API: http://SERVER_IP:5000/api/health
- Frontend: http://SERVER_IP:3000

### Features
- Low stock alerts & barcode lookup (products have `low_stock_threshold` and `barcode`).
- Attendance with branches (Rashid, Alexandria, New Cairo seeded).
- Simple UI (React + Tailwind + shadcn-like components).

## Backend (without Docker)
```bash
cd backend
cp .env.example .env
npm install
npm run migrate
npm run seed-admin
npm start
```
### Useful endpoints
- `GET /api/products/alerts/low-stock`
- `GET /api/products/barcode/:code`
- `POST /api/attendance/punch` { code, branch_id, method }
- `GET /api/attendance/logs?branch_id=`
- `GET /api/branches`

## Frontend (dev)
```bash
cd frontend
npm install
npm run dev
# http://localhost:3000
```
