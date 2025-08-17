import React, { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import { Card, CardContent } from '../components/ui/card.jsx';

export default function Dashboard(){
  const [kpi,setKpi]=useState(null);
  useEffect(()=>{ api.get('/reports/kpis').then(r=>setKpi(r.data)); },[]);
  if(!kpi) return <div>Loading...</div>;
  return (
    <div>
      <div className="flex items-center justify-between bg-yellow-400 text-black px-6 py-4 rounded-2xl mb-6">
        <h1 className="text-xl font-bold">لوحة التحكم - Zaitoon Store</h1>
        <div className="w-10 h-10 rounded-full bg-black"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-yellow-100"><CardContent><div className="text-sm">الإيرادات</div><div className="text-2xl font-bold">{kpi.revenue}</div></CardContent></Card>
        <Card className="bg-yellow-100"><CardContent><div className="text-sm">المشتريات</div><div className="text-2xl font-bold">{kpi.purchases}</div></CardContent></Card>
        <Card className="bg-yellow-100"><CardContent><div className="text-sm">المصروفات</div><div className="text-2xl font-bold">{kpi.expenses}</div></CardContent></Card>
        <Card className="bg-yellow-100"><CardContent><div className="text-sm">العملاء</div><div className="text-2xl font-bold">{kpi.customers}</div></CardContent></Card>
      </div>
    </div>
  );
}
