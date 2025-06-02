
import './ProductSidebar.css'

import LinkWithIcon from '../NavBar/LinkWithIcon'
import useData from '../../hooks/useData'
function ProductSidebar() {
 const {data: categories, error} = useData("/category")
  return (
    <aside className='products_sidebar'> 
        <h2>Category</h2>
        <div className='category_links'>
        {error && <em className='form_error'>{error}</em>}
            {
              categories && categories.map(category=><LinkWithIcon key={category._id} id={category._id} title={category.name} link={`/products?category=${category.name}`} emoji={`http://localhost:5000/category/${category.image}`} sidebar={true}/>)
            }
            <LinkWithIcon />
        </div>
    </aside>
  )
}

export default ProductSidebar