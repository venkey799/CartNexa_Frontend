import ProductCart from './ProductCart'
import './ProductList.css'
import useData from '../../hooks/useData';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Common/Pagination';
import { useState, useEffect } from 'react';
function ProductList() {
const [search, setSearch] = useSearchParams()
const category = search.get("category")
const page = search.get("page")
const searchQuery = search.get("search")
const [sortBy, setSortBy] = useState("");
const [sortedProducts,setProducts] = useState([])

const {data, error} = useData("/products",{
  params: {
    search:searchQuery,
    category,
    page,
  }
},[searchQuery, category])


const handlePageChange = (page) =>{
  const currentParams = Object.fromEntries([...search])
  console.log(currentParams)
    setSearch({...currentParams, page: page})
  }

  useEffect(() => {
   if(data && data.products){
    const products = [...data.products];

    if(sortBy === "price desc"){
      setProducts(products.sort((a,b) => b.price - a.price))
    } else if(sortBy === "price asc"){
      setProducts(products.sort((a,b) => a.price - b.price))
    } else if(sortBy === "rate desc"){
      setProducts(products.sort((a,b) => b.reviews.rate - a.reviews.rate))
    } else if(sortBy === "price asc"){
      setProducts(products.sort((a,b) => a.reviews.rate - b.reviews.rate))
    }else {
      setProducts(products);
    }
   }
  }, [sortBy, data])
  
  return (
    <section className='product_list_section'>
        <header className='align_center products_list_header'>
            <h2>Products</h2>
            <select name="" id="" className='products_sorting' onChange={e => setSortBy(e.target.value)}>
                <option value="">Relevance</option>
                <option value="price desc">Price HIGH to LOW</option>
                <option value="price asc">Price LOW to HIGH</option>
                <option value="rate desc">Rate HIGH to Low</option>
                <option value="rate asc">Rate LOW to HIGH</option>
            </select>
        </header>

        <div className='products_list'>
          {error && <em className='form_error'>{error}</em>}
           {
            data?.products && sortedProducts.map(product=> <ProductCart key={product._id} product={product}/>)
           }
        </div>
        {
           data && <Pagination totalPosts={data.totalProducts} postsPerPage={8} onClick={handlePageChange} currentPage={page}/>
           }
    </section>
  )
}

export default ProductList