import React from 'react'
import { NavLink } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux'
import { getCount, increseCount } from '../component/social/socialSlice';


const Header = () => {

  const dispatch = useDispatch()
  const count = useSelector(getCount)


  return (
    <header className='Header' >
      <h3>RTK BLOG</h3>
      <nav>
        <ul>
            <li>
                <NavLink to='/'>Home</NavLink>
            </li>
            <li>
                <NavLink to='post' >Posts</NavLink>
            </li>
            <li>
                <NavLink to='user' >Users</NavLink>
            </li> 
            <li>
                <NavLink to='counter' >Counter</NavLink>
            </li> 
            
        </ul>
        <button className='cBtn' onClick={()=>dispatch(increseCount())} >
          {count}
        </button>
      </nav>
    </header>
  )
}

export default Header
