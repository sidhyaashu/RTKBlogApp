import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams ,useNavigate} from 'react-router-dom'
import { selectAllUser } from '../user/userSlice.js'
import { selectPostById,updatePost,deletePost } from './socialSlice.js'




const EditPostForm = () => {
    const {postId} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector(selectAllUser)
    const post = useSelector((state)=>selectPostById(state,Number(postId)))

    const [title,setTitle] = useState(post?.title)
    const [content,setContent] = useState(post?.body)
    const [userId,setUserId] = useState(post?.userId)
    const [requestStatus,setRequestStatus] = useState('idle')


    if(!post){
        return <section>
            <h2>Post not found</h2>
        </section>
    }

    const onTitleChange = e=> setTitle(e.target.value)    
    const onContentChange = e=> setContent(e.target.value)
    const onAuthorChange = e=> setUserId(e.target.value)

    const canSave = [title,content,userId].every(Boolean) && requestStatus==='idle'

    const onSavePostClicked=()=>{
        if(canSave){
            try {
                setRequestStatus('pending')
                dispatch(updatePost({
                    id:post.id,
                    title,
                    body:content,
                    userId,
                    reactions:post.reactions
                })).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
                
            } catch (err) {
                console.error('Failed to save the post ',err)
            }finally{
                setRequestStatus('idle')
            }
        }
    }

    const onDeletePostByClicked=()=>{
        try {
            setRequestStatus('pending')
            dispatch(
                deletePost({
                    id:post.id
                })
            ).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
            
        } catch (err) {
            console.error('Failed to delete the post ',err)
        }finally{
            setRequestStatus('idle')
        }
    }

    const userOptions=users.map(user=>{
        return <option key={user.id} value={user.id} >
            {user.name}
        </option>
    })

  return (
    <section>
        <h2>Edit Post</h2>
        <form>
            <label htmlFor="postTitle">Post Title:</label>
            <input
            type="text"
            id='postTitle'
            name='postTitle'
            value={title}
            onChange={onTitleChange}
            />


            <label htmlFor="postAuthor">Post Author:</label>
            <select name="postAuthor" id="postAuthor" defaultValue={userId} onChange={onAuthorChange} >
                <option value=""></option>
                {userOptions}
            </select>

            <label htmlFor="postContent">Content:</label>
            <textarea name="postContent" id="postContent" value={content} onChange={onContentChange}/>

            <button type='button' onClick={onSavePostClicked}  disabled={!canSave}>Save</button>
            <button type='button' onClick={onDeletePostByClicked} className='deleteButton'  disabled={!canSave}>Delete</button>

        </form>
    </section>
  )
}

export default EditPostForm
