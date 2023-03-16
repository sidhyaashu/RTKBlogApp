import React from 'react'
import { useParams,NavLink } from 'react-router-dom'
import '../../App.css'
import { selectUserById } from './userSlice.js'
import { selectAllPost,selectPostByUser } from '../social/socialSlice.js'
import { useSelector } from 'react-redux'



const UserPage = () => {

    const { userId } = useParams()

    const user = useSelector(state=>selectUserById(state, Number(userId)))

    // const postsForUser = useSelector(state=>{
    //     const allPosts = selectAllPost(state)
    //     return allPosts.filter(post=>post.userId === Number(userId))
    // })

    const postsForUser = useSelector(state => selectPostByUser(state , Number(userId)))

    const postTitle = postsForUser.map(post=>(
        <li key={post.id}>
            <NavLink to={`/post/${post.id}`}>{post.title}</NavLink>
        </li>
    ))



  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{postTitle}</ol>
    </section>
  )
}

export default UserPage
