import React from 'react'
import '../../App.css'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButton from './ReactionButton'
import { NavLink } from 'react-router-dom'
// import { useSelector } from 'react-redux' //optimized
// import { selectPostById } from './socialSlice.js' //optimized



const PostExcert = ({post}) => {
  // const post = useSelector(state=>selectPostById(state,postId)) //optimized
  return (
    <article>
          
          <NavLink className='navLink' to={`post/${post.id}`}><h3>{post.title.substring(0, 20)}</h3></NavLink>
          <p className='excerpt' >{post.body.substring(0, 20)}...</p>
          <p>{post.id}</p>
          <p className='postCredit'>
            
            <PostAuthor userId={post.userId}/>
            <br />
            <TimeAgo timeStamps={post.date}/>
          </p>
          <ReactionButton post={post}/>
      </article>
  )
}


export default PostExcert
