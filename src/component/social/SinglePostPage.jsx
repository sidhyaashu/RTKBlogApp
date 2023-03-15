import React from 'react'
import '../../App.css'
import { selectPostById } from './socialSlice'
import { useSelector } from 'react-redux'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButton from './ReactionButton'
import { NavLink, useParams } from 'react-router-dom'


const SinglePostPage = () => {
    const {postId} = useParams()
    const post= useSelector(state=>selectPostById(state,Number(postId)))
    console.log("post -->",post)
    if(!post){
        return <section>
            <h2>Opps! post not found</h2>
        </section>
    }
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <NavLink to={`/post/edit/${post.id}`}>Edit Post</NavLink>
        <PostAuthor userId={post.userId}/>
        <TimeAgo timeStamps={post.date}/>
      </p>
      <ReactionButton post={post}/>
    </article>
  )
}

export default SinglePostPage
