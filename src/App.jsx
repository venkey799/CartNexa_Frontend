
import { toast, ToastContainer } from 'react-toastify'
import NavBar from './Components/NavBar/NavBar'
import './App.css'
import Routing from './Components/Routing/Routing'
import { useEffect, useState } from 'react'
import { getjwt, getUser } from './services/userServices'
import { addToCartAPI, decreaseProductAPI, getCartAPI, increaseProductAPI, removeFromCartAPI } from './services/cartService'
import 'react-toastify/dist/ReactToastify.css'
import setAuthToken from "./utils/setAuthToken"; // adjust path as needed
import userContext from './contexts/userContext'
import cartContext from './contexts/cartContext'

function App() {
const [cart, setCart] = useState([]);
const [user, setUser]=useState(null);
const [token, setToken] = useState(null);

useEffect(()=>{
try{
  const jwtuser = getUser();
if(Date.now() >= jwtuser.exp * 1000){
  localStorage.removeItem("token")
  setUser(null);
} else{
  setUser(jwtuser);
}
}
catch(error){}
},[])


useEffect(() => {
const storedUser = JSON.parse(localStorage.getItem('user'));
const token = storedUser?.token;
 if (token) {
      setAuthToken(token); // ✅ setup Axios headers
      setUser(storedUser)
      setToken(token);
    }
}, []);

useEffect(()=>{
  if(user){
    getCart()
  }
},[user])


const addToCart = (product, quantity)=>{
  
  if (!quantity || isNaN(quantity) || quantity <= 0) {
    toast.error("Invalid quantity");
    return;
  }
  const updateCart = [...cart]
  const productIndex = updateCart.findIndex(item => item.product._id === product._id)
    if(productIndex === -1){
      updateCart.push({product: product, quantity: quantity})
    } 
    else{
      updateCart[productIndex].quantity += quantity
    }
    setCart(updateCart)
    addToCartAPI(product._id, quantity,token).then(res=>{
        toast.success("Product Added Succesfully!...")
    })
    .catch(err=>{
        toast.error("Failed to add product... ")
    });
  };
  const removeFromCart = id =>{
    const oldCart = [...cart]
    const newCart =oldCart.filter(item=> item.product._id !== id)
    setCart(newCart);
    removeFromCartAPI(id).catch(err => {
      toast.error("Something went wrong!");
      setCart(oldCart);
    });
  };

  const updateCart = (type, id) => {
    const oldCart = [...cart];
    const updatedcart = [...cart];
    const productIndex = updatedcart.findIndex(item => item.product._id === id)
    if(type === "increase"){
      updatedcart[productIndex].quantity +=1
      setCart(updatedcart)
      increaseProductAPI(id).catch(err =>{
        toast.error("Product not increased");
        setCart(oldCart);
      });
    };
    if(type === "decrease"){
      updatedcart[productIndex].quantity -=1
      setCart(updatedcart)
        decreaseProductAPI(id).catch(err =>{
        toast.error("Product not decreased");
        setCart(oldCart);
      });
    }
  }

  const getCart = () =>{
    getCartAPI().then(res =>{
      setCart(res.data)
    }).catch(err =>{
      toast.error("Something went wrong!")
    })
  }
  return (
    <>
    <userContext.Provider value={{user, setUser}}>
      <cartContext.Provider value={{cart, addToCart, removeFromCart, updateCart, setCart}}>
      <NavBar/>
      <ToastContainer/>
     <main>
      <Routing/>
     </main>
     </cartContext.Provider>
    </userContext.Provider>
    </>
  )
}

export default App
