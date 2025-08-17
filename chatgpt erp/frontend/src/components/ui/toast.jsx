import { useEffect } from 'react';
export function useToast(){ 
  return {
    toast: ({ title, description }) => alert(`${title}\n${description||''}`)
  };
}
