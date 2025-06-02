import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css'
import '../../index.css'
import { House } from 'lucide-react'
import { ShoppingBasket } from 'lucide-react'
import { LogIn } from 'lucide-react'
import { CircleUser } from 'lucide-react'
import { LogOut } from 'lucide-react'
import { ShoppingCart } from 'lucide-react'
import { Package } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import userContext from '../../contexts/userContext'
import cartContext from '../../contexts/cartContext'
import { useNavigation } from 'react-router-dom'
import { getSuggestionsAPI } from '../../services/productServices'
function NavBar() {
  const navigate = useNavigate()
  const {user} = useContext(userContext);
  const {cart} = useContext(cartContext);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState()
 const [selectedItem, setSelectedItem] = useState();
  const handleSubmit = e => {
    e.preventDefault()
    if(search.trim() !== ""){
        navigate(`/products?search=${search.trim()}`)
    }
    setSuggestions([]);
  }

  const handleKeyDown = (e) =>{
    if(selectedItem < suggestions.length) {
      if(e.key === "ArrowDown") {
      setSelectedItem((current) =>
        current === suggestions.length - 1 ? 0 : current +1)
    }
    else if(e.key === "ArrowUp") {
      setSelectedItem((current) => current === suggestions.length -1 ? 0 : current-1);
    }
    else if(e.key === "Enter" && selectedItem > -1) {
      const suggestion = suggestions[selectedItem]
      navigate(`/products?search=${suggestions.title}`)
      setSearch("");
      setSuggestions([]);
    }
    }else {
      setSelectedItem(-1);
    }

  }
  useEffect(() => {
    const delaySuggestions = setTimeout(()=>{
      if(search.trim() !== ""){
    getSuggestionsAPI(search).then(res =>setSuggestions(res.data))
    .catch(err => console.log(err))
   }else{
    setSuggestions([])
   }
},300);
   return () => clearTimeout(delaySuggestions);
  }, [search]);
  
  return (
    <nav className='align_center navbar'>
      <div className='align_center'>
        <h1 className='navbar_heading'>CARTNEXA</h1>
      <form action="" className='align_center navbar_form' onSubmit={handleSubmit}>
          <input type="text" className='navbar_search' placeholder='search for something...' value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={handleKeyDown} />
          <button className='search_button'>Search</button>

    {
      suggestions?.length > 0 && <ul className="search_results">
      {
        suggestions.map((item,index)=> <li key={item._id} className={selectedItem === index ? "search_suggestion_link active" : "search_suggestion_link"}>
        <Link to={`/products?search=${suggestions.title}`} onClick={()=> {setSearch(""); setSuggestions([])}}>{suggestions.title}</Link>
      </li>)
      }
    </ul>
    }

      </form>
      </div>
      <div className='align_center'>
        <Link to="/" className='align_center nav_links'><span className='nav_item'><House className='nav_icon'/></span>Home</Link>
        <Link to="/products" className='align_center nav_links'><span className='nav_item'><ShoppingBasket className='nav_icon'/></span>Products</Link>
        {!user && <><Link to="/login" className='align_center nav_links'><span className='nav_item'><LogIn className='nav_icon'/></span>Login</Link>
        <Link to="/signup" className='align_center nav_links'><span className='nav_item'><CircleUser className='nav_icon'/></span>SignUp</Link></>}
        {user && <><Link to="/myorder" className='align_center nav_links'><span className='nav_item'><Package className='nav_icon'/></span>My Orders</Link>
        <Link to="/cart" className='align_center nav_links'><span className='nav_item'><ShoppingCart className='nav_icon'/></span>Cart({cart.length})</Link>
        <Link to="/logout" className='align_center nav_links'><span className='nav_item'><LogOut className='nav_icon'/></span>Logout</Link></>}
      </div>

    </nav>
  )
}

export default NavBar