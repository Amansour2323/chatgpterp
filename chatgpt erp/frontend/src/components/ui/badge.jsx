export function Badge({ children, variant='default' }){
  const styles = {
    default: 'bg-gray-200 text-black',
    secondary: 'bg-gray-100 text-black',
    destructive: 'bg-red-600 text-white'
  }[variant];
  return <span className={`px-2 py-1 rounded-full text-sm ${styles}`}>{children}</span>
}
