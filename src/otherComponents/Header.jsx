import React from 'react'
import { NavLink } from "react-router-dom";


const Header = () => {
  return (
    <header className='Header' >
      <h1>RTK BLOG</h1>
      <nav>
        <ul>
            <li>
                <NavLink to='/'>Home</NavLink>
            </li>
            <li>
                <NavLink to='post' >Posts</NavLink>
            </li>
            {/* <li>
                <NavLink to='counter' >Counter</NavLink>
            </li> */}
            
        </ul>
      </nav>
    </header>
  )
}

export default Header
