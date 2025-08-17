export function Button({ children, className='', ...props }){
  return <button className={`rounded-2xl px-4 py-2 bg-yellow-400 text-black hover:opacity-90 ${className}`} {...props}>{children}</button>
}
