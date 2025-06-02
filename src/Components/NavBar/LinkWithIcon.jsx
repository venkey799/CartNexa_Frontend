import './LinkWithIcon.css'
import { Link } from 'react-router-dom'
function LinkWithIcon({title,link,emoji}) {
  return (
    <Link to={link} className='align_center'><img src={emoji} alt='' className='link_emoji'/>{title}</Link>
  )
}

export default LinkWithIcon