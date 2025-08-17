import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Inventory from './pages/Inventory.jsx';
import Attendance from './pages/Attendance.jsx';
import './index.css';

const Layout = ({children}) => (
  <div className="grid grid-cols-[240px_1fr] min-h-screen">
    <aside className="bg-black text-white p-4">
      <div className="text-2xl font-bold mb-6 text-yellow-400">زيتون ستور</div>
      <nav className="grid gap-2">
        <Link className="hover:text-yellow-400" to="/">لوحة التحكم</Link>
        <Link className="hover:text-yellow-400" to="/inventory">المخزون & الباركود</Link>
        <Link className="hover:text-yellow-400" to="/attendance">الحضور والانصراف</Link>
      </nav>
    </aside>
    <main className="p-6 bg-white">{children}</main>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/inventory" element={<Inventory/>} />
        <Route path="/attendance" element={<Attendance/>} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

const root = createRoot(document.getElementById('root'));
root.render(<App/>);
