export function Card({ className='', children }){
  return <div className={`rounded-2xl border border-gray-200 shadow ${className}`}>{children}</div>
}
export function CardHeader({ children, className='' }){
  return <div className={`px-4 pt-4 ${className}`}>{children}</div>
}
export function CardTitle({ children, className='' }){
  return <h3 className={`text-lg font-bold ${className}`}>{children}</h3>
}
export function CardContent({ children, className='' }){
  return <div className={`p-4 ${className}`}>{children}</div>
}
