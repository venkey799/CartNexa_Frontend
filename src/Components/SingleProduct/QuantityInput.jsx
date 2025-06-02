import './QuantityInput.css'
function QuantityInput({quantity, setQtyCount, stock, cartPage, productId}) {
  return (
    <>
        <button className='quantity_input_button' disabled={quantity <=1} onClick={()=>{cartPage ? setQtyCount("decrease", productId) : setQtyCount(quantity - 1)}}>{" "} - {" "} </button>
        <p className='quantity_input_count'>{quantity}</p>
      <button className='quantity_input_button'disabled={quantity >= stock} onClick={()=> {cartPage ? setQtyCount("increase", productId) : setQtyCount(quantity + 1)}}> {" "} + {" "}</button>
    </>
  )
}

export default QuantityInput