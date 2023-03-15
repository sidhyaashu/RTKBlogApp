// import React,{useState} from 'react'
// import { useDispatch,useSelector } from 'react-redux'
// import {selectAllUser} from '../user/userSlice.js'
// import '../../App.css'
// import { postAdded } from './socialSlice.js'
// const PostAddForm = () => {
//     const dispatch = useDispatch()
//     const users = useSelector(selectAllUser)

//     const [title,setTitle] = useState('')
//     const [content,setContent] = useState('')
//     const [userId,setUserId] = useState('')

//     const saveBtn = Boolean(title) && Boolean(content) && Boolean(userId)


//     const onchanegeTitle=(e)=>setTitle(e.target.value) 
//     const onchanegeContent=(e)=>setContent(e.target.value) 
//     const onAuthorChange=(e)=>setUserId(e.target.value) 

//     const handleSubmit=()=>{
//         if(title && content){
//             dispatch(postAdded(title,content,userId))
//         }
//         setTitle('')
//         setContent('')
//         setUserId('')
//     }

//     const userOptions =users.map(user=>(
//         <option key={user.id} value={user.id} >
//             {user.name}
//         </option>
//     ))
//   return (
//     <section>
//         <h2>Add a new post</h2>
//         <form>
//             <label htmlFor="postTitle">Post Title</label>
//             <input
//             type="text"
//             id="postTitle"
//             value={title}
//             onChange={onchanegeTitle} />

//             <label htmlFor="postAuthor">Author</label>
//             <select id="postAuthor" value={userId} onChange={onAuthorChange} >
//                 <option value=''></option>
//                 {userOptions}
//             </select>
        
//             <label htmlFor="postContent">Post Body</label>
//             <textarea
//             id="postContent"
//             value={content}
//             onChange={onchanegeContent} />

//             <button type='button' disabled={!saveBtn} onClick={handleSubmit} >Save</button>
//         </form>
      
//     </section>
//   )
// }

// export default PostAddForm






// Post in api 


import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {selectAllUser} from '../user/userSlice.js'
import '../../App.css'
import { addNewPost } from './socialSlice.js'
import { useNavigate } from 'react-router-dom'

const PostAddForm = () => {
    const dispatch = useDispatch()
    const users = useSelector(selectAllUser)
    const navigate = useNavigate()

    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [userId,setUserId] = useState('')
    const [addRequistStatus,setAddRequistStatus] = useState('idle')

    // const saveBtn = Boolean(title) && Boolean(content) && Boolean(userId)
    const saveBtn = [title,content,userId].every(Boolean) && addRequistStatus ==='idle'



    const onchanegeTitle=(e)=>setTitle(e.target.value) 
    const onchanegeContent=(e)=>setContent(e.target.value) 
    const onAuthorChange=(e)=>setUserId(e.target.value) 

    const handleSubmit=()=>{
        if(saveBtn){
            try {
                setAddRequistStatus('pending')
                dispatch(addNewPost({title,body:content,userId})).unwrap()
                
                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')
            } catch (err) {
                console.error("Failed to save the post ",err)
            }finally{
                setAddRequistStatus('idle')
            }
        }
    }

    const userOptions =users.map(user=>(
        <option key={user.id} value={user.id} >
            {user.name}
        </option>
    ))
  return (
    <section>
        <h2>Add a new post</h2>
        <form>
            <label htmlFor="postTitle">Post Title</label>
            <input
            type="text"
            id="postTitle"
            value={title}
            onChange={onchanegeTitle} />

            <label htmlFor="postAuthor">Author</label>
            <select id="postAuthor" value={userId} onChange={onAuthorChange} >
                <option value=''></option>
                {userOptions}
            </select>
        
            <label htmlFor="postContent">Post Body</label>
            <textarea
            id="postContent"
            value={content}
            onChange={onchanegeContent} />

            <button type='button' disabled={!saveBtn} onClick={handleSubmit} >Save</button>
        </form>
      
    </section>
  )
}

export default PostAddForm
