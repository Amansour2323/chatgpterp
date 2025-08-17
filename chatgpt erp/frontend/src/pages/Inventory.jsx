import React, { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card.jsx';
import { Input } from '../components/ui/input.jsx';
import { Badge } from '../components/ui/badge.jsx';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

export default function Inventory(){
  const [products,setProducts]=useState([]);
  const [scannedCode,setScannedCode]=useState('');
  const [found,setFound]=useState(null);
  const [lowStock,setLowStock]=useState([]);

  useEffect(()=>{
    api.get('/products').then(r=>setProducts(r.data));
    api.get('/products/alerts/low-stock').then(r=>setLowStock(r.data));
  },[]);

  const handleCode = async (code)=>{
    setScannedCode(code);
    try{
      const r = await api.get(`/products/barcode/${code}`);
      setFound(r.data);
    }catch(e){ setFound(null); }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle className="text-yellow-600">📦 المنتجات منخفضة المخزون</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {lowStock.map(p=>(
              <div key={p.id} className="flex items-center justify-between p-3 border rounded-2xl">
                <div>{p.name} <span className="text-sm text-gray-500">({p.sku})</span></div>
                <Badge variant="destructive">المتبقي: {p.stock}</Badge>
              </div>
            ))}
            {lowStock.length===0 && <div className="text-gray-500">لا يوجد منتجات منخفضة المخزون 🎉</div>}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-yellow-600">🔍 باركود سكانر</CardTitle></CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-center">
            <BarcodeScannerComponent
              width={320}
              height={220}
              onUpdate={(err, result) => result?.text && handleCode(result.text)}
            />
          </div>
          <Input placeholder="أدخل الباركود يدويًا" value={scannedCode}
                 onChange={(e)=>setScannedCode(e.target.value)}
                 onKeyDown={(e)=>{ if(e.key==='Enter') handleCode(scannedCode); }} />
          {found && (
            <div className="mt-4 p-4 border rounded-2xl bg-gray-50">
              <div className="font-semibold">{found.name}</div>
              <div>السعر: {found.price}</div>
              <div>المتوفر: <Badge variant={found.stock<=found.low_stock_threshold?'destructive':'secondary'}>{found.stock}</Badge></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
