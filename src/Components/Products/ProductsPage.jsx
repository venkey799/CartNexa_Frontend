import React from 'react'

import './ProductsPage.css'
import ProductSidebar from './ProductSidebar'
import ProductList from './ProductList'
function ProductsPage() {
  return (
    <section className='products_page'>
        <ProductSidebar/>
        <ProductList/>
    </section>
  )
}

export default ProductsPage