import React from 'react'
import './FeaturesSection.css'
import ProductCart from '../Products/ProductCart'
import useData from '../../hooks/useData'
function FeaturesSection() {
   const { data, error} = useData("/products/featured")
  return (

    <section className=" featured_products">
        <h2>Featured Products</h2>

        <div className='align_center featured_products_list'>
            {
            data && data.map(product=> <ProductCart key={product._id} product={product}/>)
           }
        </div>
    </section>
  )
}

export default FeaturesSection