import { useState, useEffect,useContext } from 'react'
import config from '../../config.json'
import './Cart.css'
import Table from '../Common/Table.jsx'
import User from '../../assets/user.jpg'
import { Trash2 } from 'lucide-react'
import QuantityInput from '../SingleProduct/QuantityInput.jsx'
import userContext from '../../contexts/userContext.js'
import cartContext from '../../contexts/cartContext.js'
import { checkoutAPI } from '../../services/orderService.js'
import { toast } from 'react-toastify'
function Cart() {
const [subtotal, setSubTotal] = useState(0)
const { user }= useContext(userContext);
const { cart, removeFromCart, updateCart, setCart } = useContext(cartContext);
const checkout = ()=>{
  const oldCart = [...cart]
  setCart([])
  checkoutAPI().then(()=>{
    toast.success("order placed successfully")
  }).catch(()=> {
    toast.error("Something went wrong!")
    setCart(oldCart)
  })
}
// console.log(user)
useEffect(() => {
  let total = 0;
  cart.forEach(item => {
    total += item.product.price * item.quantity
  });
setSubTotal(total)
}, [cart])
    try{
        return (
<section className='align_center cart_page'>
      <div className='align_center user_info'>
        <img src={user?.profilePic ? `${config.backendURL}/profile/${user.profilePic}` : User} alt="profileimage" />
        <div>
          <p className="user_name">{user?.name}</p>
          <p className="user_email">{user?.email}</p>
        </div>
      </div>
    <Table headings={["Item","Price","Quantity","Total","Remove"]}>
      <tbody>
        
        {
          cart.map(({product,quantity})=><tr key={product._id}>
          <td>{product.title}</td>
          <td>&#8377;{product.price}</td>
          <td className='align_center table_quantity_input'><QuantityInput quantity={quantity} stock={product.stock} setQtyCount={updateCart} cartPage ={true} productId={product._id}/></td>
          <td>&#8377;{quantity*product.price}</td>
          <td><Trash2 onClick={()=>removeFromCart(product._id)}/></td>
        </tr>)
        }
      </tbody>
    </Table>
      {/* table */}

      <table className='cart_bill'>
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>&#8377;{subtotal}</td>
          </tr>
           <tr>
            <td>Shipping Charge</td>
            <td>&#8377;5</td>
          </tr>
           <tr className='cart_bill_final'>
            <td>Total</td>
            <td>&#8377;{ subtotal+ 5}</td>
          </tr>
        </tbody>
      </table>
      <button className='search_button checkout_button' onClick={checkout}>Checkout</button>
    </section>
  )
    }
    
  catch (error) {
    console.error("Error in <Cart />:", error);
    return <p>Something went wrong in Cart.</p>;
  }
}

export default Cart