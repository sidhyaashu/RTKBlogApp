import React from 'react'
import { useSelector } from 'react-redux'
import '../../App.css'
import { selectAllUser } from '../user/userSlice.js'



const PostAuthor = ({userId}) => {
    const users=useSelector(selectAllUser)

    const author = users.find(user=>user.id === userId)

  return <span>by {author? author.name : "Unknown author"}</span>
}

export default PostAuthor
