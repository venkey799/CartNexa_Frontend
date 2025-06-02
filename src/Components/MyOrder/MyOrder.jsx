import useData from '../../hooks/useData'
import './MyOrder.css'
import Table from '../Common/Table'
function MyOrder() {
  const  {data: orders, error} = useData("/order");
  const getProductString = order => {
    const productStringArr =  order.products.map(p => `${p.product.title}(${p.quantity})`)
    return productStringArr.join(",");
  }
  return (
    <section className='align_center myorder_page'>
      {!error && <em className='form-error'>{error}</em>}
        {
          orders && <Table headings={["Order","Products","Total","Status"]}>
            <tbody>
                {
                  orders.map((order, index) =><tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{getProductString(order)}</td>
                    <td>&#8377;{order.total}</td>
                    <td>{order.status}</td>
                </tr>)
                }
            </tbody>
        </Table>
        }
    </section>
  )
}

export default MyOrder