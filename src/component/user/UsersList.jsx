import React from 'react'
import { useSelector } from "react-redux";
import { selectAllUser } from './userSlice.js'
import { NavLink } from 'react-router-dom'
import '../../App.css'




const UsersList = () => {
    
    const users = useSelector(selectAllUser)

    const renderUser=users.map(user=>(
        <li key={user.id}>
            <NavLink to={`/user/${user.id}`}>{user.name}</NavLink>
        </li>
    ))


  return (
    <section>
        <h2>Users</h2>
        <ul>{renderUser}</ul>
      
    </section>
  )
}

export default UsersList
