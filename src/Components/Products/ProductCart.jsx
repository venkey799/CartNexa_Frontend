import React, { use } from 'react'
import config from "../../config.json"
import './ProductCart.css'
import { Star } from 'lucide-react'
import { ShoppingBasket } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import cartContext from '../../contexts/cartContext'
import userContext from '../../contexts/userContext'
function ProductCart({product}) {
    const { addToCart } = useContext(cartContext);
    const {user} = useContext(userContext);
  return (
    <article className='product_card'>
        <div className=''>
            <Link to={`/products/${product?._id}`}><img src={`${config.backendURL}/products/${product?.images[0]}`} className='product_image' alt="iphone-image"/></Link>
        </div><hr className='hrline' />
        <div className='product_details'>
           <h3 className='product_price'>₹{product?.price?.toLocaleString('en-IN')}</h3>

            <p className='product_title'>{product?.title}</p>
            <footer className='align_center product_info_footer'>
            <div className='align_center'>
                <p className='align_center product_rating'>
                    <Star/> {product?.reviews.rate}
                </p>
                <p className='product_review_count'>({product?.reviews.counts})</p>
            </div>
            {product?.stock >0 && user && <button className='add_to_cart' onClick={()=> addToCart(product,1)}>
                <ShoppingBasket className='basket'/>
            </button>}
            </footer>
        </div>
    </article>
  )
}

export default ProductCart