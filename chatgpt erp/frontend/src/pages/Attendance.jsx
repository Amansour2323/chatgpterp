import React, { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card.jsx';
import { Input } from '../components/ui/input.jsx';
import { Button } from '../components/ui/button.jsx';

export default function Attendance(){
  const [branches,setBranches]=useState([]);
  const [logs,setLogs]=useState([]);
  const [form,setForm]=useState({code:'', branch_id:'', method:'fingerprint'});

  const load = async (branchId)=>{
    const b = await api.get('/branches');
    setBranches(b.data);
    const l = await api.get('/attendance/logs', { params: { branch_id: branchId||'' } });
    setLogs(l.data);
  };

  useEffect(()=>{ load(); },[]);

  const punch = async ()=>{
    await api.post('/attendance/punch', { ...form, branch_id: form.branch_id?Number(form.branch_id):null });
    setForm({ ...form, code:'' });
    load(form.branch_id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle className="text-yellow-600">👥 تسجيل حضور/انصراف</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <select className="border rounded-2xl px-3 py-2 w-full" value={form.branch_id} onChange={(e)=>setForm({...form,branch_id:e.target.value})}>
            <option value="">اختر الفرع</option>
            {branches.map(b=>(<option key={b.id} value={b.id}>{b.name}</option>))}
          </select>
          <Input placeholder="كود الموظف (من جهاز البصمة/الكارت)" value={form.code} onChange={(e)=>setForm({...form,code:e.target.value})}/>
          <select className="border rounded-2xl px-3 py-2 w-full" value={form.method} onChange={(e)=>setForm({...form,method:e.target.value})}>
            <option value="fingerprint">Fingerprint</option>
            <option value="barcode">Barcode</option>
            <option value="manual">Manual</option>
          </select>
          <Button onClick={punch}>تسجيل</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-yellow-600">🕒 أحدث السجلات</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="text-left"><th className="p-2">الموظف</th><th className="p-2">الفرع</th><th className="p-2">الطريقة</th><th className="p-2">التاريخ</th></tr></thead>
            <tbody>
              {logs.map((l)=>(<tr key={l.id} className="border-t"><td className="p-2">{l.employee}</td><td className="p-2">{l.branch}</td><td className="p-2">{l.method}</td><td className="p-2">{new Date(l.created_at).toLocaleString('ar-EG')}</td></tr>))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
