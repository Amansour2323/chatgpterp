export function Input({ className='', ...props }){
  return <input className={`border rounded-2xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 ${className}`} {...props}/>
}
