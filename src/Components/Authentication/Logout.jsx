import { useContext, useEffect } from 'react'
import { logout } from '../../services/userServices';
import userContext from '../../contexts/userContext';
function Logout() {
   const { setUser } = useContext(userContext);
   useEffect(()=>{
      logout();
      if (setUser) setUser(null);
      window.location ="/";
   },[])
  return null
};

export default Logout;