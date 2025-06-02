import React, { useContext, useState } from 'react'
import "./SingleProduct.css"
import QuantityInput from './QuantityInput'
import { useParams } from 'react-router-dom'
import useData from '../../hooks/useData'
import cartContext from '../../contexts/cartContext'
import userContext from '../../contexts/userContext'


function SingleProduct() {
  const {id} = useParams();
  const {data: product, error} = useData(`/products/${id}`)
    const [selectedImage,setSelectedImage] = useState(0)
    const [quantity,setQtyCount] = useState(1);
     const { addToCart } = useContext(cartContext);
     const { user } = useContext(userContext)
  return (
  <section className='align_center single_product'>
    {product && <div className='align_center'>
        <div className=' single_product_thumbnails'>
        {product.images.map((image,index) =>(<img src={`http://localhost:5000/products/${image}`} key={index} alt={product.title} className={selectedImage === index ? "selected_image" : ""} onClick={()=>setSelectedImage(index)}/>))}
        </div>

        <img src={`http://localhost:5000/products/${product.images[selectedImage]}`} alt={product.title} className='single_product_display' />
    <div className='single_product_details'>
    <h1 className="single_product_title">{product.title}</h1>
    <p className='single_product_description'>${product.description}</p>
    <p className='single_product_price'>${product.price.toFixed(2)}</p>
    {
      user && <>
      <h2 className='quantity_title'>Quantity</h2>
    <div className='align_center quantity_input'>
      <QuantityInput quantity={quantity} setQtyCount={setQtyCount} stock={product.stock}/>
    </div>
    <button className='search_button add_cart' onClick={()=>addToCart(product, quantity)}>Add to Cart</button>  
      </>
    }
    </div>
    </div>}
  </section>
  )
}

export default SingleProduct