// import React from 'react'
// import '../../App.css'
// import { useSelector } from 'react-redux'
// import { selectAllPost } from './socialSlice'
// import PostAddForm from './PostAddForm'
// import PostAuthor from './PostAuthor'
// import TimeAgo from './TimeAgo'
// import ReactionButton from './ReactionButton'


// const PostList = () => {
//     const posts= useSelector(selectAllPost)

//     const orderedPost = posts.slice().sort((a,b)=>b.date.localeCompare(a.date))

//     const renderPost = orderedPost.map(post=>{
//       return(
//       <article key={post.id}>
//           <h3>{post.title}</h3>
//           <p>{post.content}</p>
//           <p>
//             <PostAuthor userId={post.userId}/>
//             <br />
//             <TimeAgo timeStamps={post.date}/>
//           </p>
//           <ReactionButton post={post}/>
//       </article>
//       )
//     }
      
        
//     )

//   return (
//     <section>
//         <div className="postContainer">
//         <PostAddForm/>
//         <div className='seePost'>
//         {renderPost}
//         </div>
//         </div>
//     </section>
//   )
// }

// export default PostList





//fetch data from server



import React from 'react'
import '../../App.css'
import { useSelector } from 'react-redux'
// import { selectAllPost ,getPostError,getPostStatus,fetchPosts} from './socialSlice'
import { selectAllPost ,getPostError,getPostStatus} from './socialSlice.js'
// import { selectPostIds ,getPostError,getPostStatus} from './socialSlice.js' //optimized
import PostExcert from './PostExcert'
import { nanoid } from '@reduxjs/toolkit'
// import { nanoid } from '@reduxjs/toolkit'


const PostList = () => {

    const posts= useSelector(selectAllPost)

    // const orderedPosts = useSelector(selectPostIds)
    const postStatus= useSelector(getPostStatus)
    const postError= useSelector(getPostError)
    
    // useEffect(()=>{
    //   if(postStatus === 'idle'){
    //     dispatch(fetchPosts())
    //   }
    // },[postStatus,dispatch])
    
    
    // const orderedPost = posts.slice().sort((a,b)=>b.date.localeCompare(a.date))
    // const renderPost = orderedPost.map(post=>(
    //   <PostExcert post={post}/>
    //   ))


      let content;
      if(postStatus ==='loading'){
        content = <p>Loading...</p>
      }else if(postStatus ==='succeeded'){
        const orderedPost = posts.slice().sort((a,b)=>b.date.localeCompare(a.date)) 
        content = orderedPost.map(post=> <PostExcert key={nanoid()} post={post}/>)
        // content = orderedPosts.map(postId=><PostExcert key={postId} postId={postId}/>)

      }else if(postStatus ==='failed'){
        content = <p>{postError}</p>
      }

      // console.log("content -> ",content)

  return (
    <>
      <section>
        
        <div className='seePost'>
        {content}
        </div>
    </section>
    </>
  )
}

export default PostList
