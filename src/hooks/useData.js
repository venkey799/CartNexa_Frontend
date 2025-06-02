import { useEffect,useState } from 'react'
import apiClient from '../utils/api_clients'
const useData = (endpoint, customConfig,deps) => {
   const [data,setdata] = useState(null)
     const [error, setError] = useState("")
     useEffect(()=>{
       apiClient.get(endpoint,customConfig).then(res=> setdata(res.data))
       .catch(err=>setError(err.message))
     },deps?deps:[]);
     return {data ,error}
}

export default useData