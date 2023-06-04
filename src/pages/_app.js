import useAuthStore from '@/Store/Store';
import '@/styles/globals.css'
import Login from './login';
import { useEffect, useState } from 'react';



export default function App({ Component, pageProps }) {  
  const {AuthToken} = useAuthStore(); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted){
    return null; 
  } else if (!AuthToken) {
      return <Login/>
    }else{
    return <Component {...pageProps} /> 
    }
}
