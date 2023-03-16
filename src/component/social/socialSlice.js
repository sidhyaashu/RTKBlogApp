// import { createSlice, nanoid } from "@reduxjs/toolkit";
// import {sub} from 'date-fns'

// const initialState=[
//     {
//         id:'1',
//         title:"one",
//         content:"one content",
//         date:sub(new Date(),
//         {minutes:10}).toISOString(),
//         reactions:{
//             thumbsUp:0,
//             wow:0,
//             heart:0,
//             rocket:0,
//             coffee:0
//         }
//     },
// ]

// const postSlice=createSlice({
//     name:"posts",
//     initialState,
//     reducers:{
//         postAdded:{
//             reducer(state,action){
//             state.push(action.payload)
//             },
//             prepare(title,content,userId){
//                 return{
//                     payload:{
//                         id:nanoid(),
//                         title:title,
//                         content:content,
//                         date:new Date().toISOString(),
//                         userId,
//                         reactions:{
//                             thumbsUp:0,
//                             wow:0,
//                             heart:0,
//                             rocket:0,
//                             coffee:0
//                         }
//                     }
//                 }
//             }
//         },
//         reactionAdded(state,action){
//             const { postId,reaction } = action.payload
//             const existingPost = state.find(post=>post.id ===postId)
//             if(existingPost){
//                 existingPost.reactions[reaction]++
//             }
//         }
//     }
// })

// export const selectAllPost = (state)=>state.posts

// export const { postAdded,reactionAdded } = postSlice.actions
// export default postSlice.reducer







// work with apli json placeholder

import {
    createSlice,
    createAsyncThunk,
    createSelector,
    //createEntityAdapter //optimized
    } from "@reduxjs/toolkit";
    import axios from 'axios'
    import {sub} from 'date-fns'
    
    const POST_URL = 'https://jsonplaceholder.typicode.com/posts'

    //Optimized
    // const postAdapter =createEntityAdapter({
    //     sortComparer:(a,b)=>b.date.localeCompare(a.date)
    // })

    const initialState ={
    posts:[],
    status:'idle',
    error:null,
    count:0
    }

// const initialState =postAdapter.getInitialState({
//     status:'idle',
//     error:null,
//     count:0
// })

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async()=>{
    try {
        const response = await axios.get(POST_URL)
        return [...response.data]
    } catch (error) {
        return error.message
    }
})

export const addNewPost = createAsyncThunk('posts/addNewPost',async(initialState)=>{
    try {
        const response = await axios.post(POST_URL,initialState)
        return response.data
    } catch (error) {
        return error.message
    }
})


export const updatePost = createAsyncThunk('posts/updatePost',async(initialState)=>{
    const {id} = initialState

    try {
        const response = await axios.put(`${POST_URL}/${id}`,initialState)
        return response.data
    } catch (err) {
        // return err.message
        return initialState
    }
})

export const deletePost = createAsyncThunk('posts/deletePost',async(initialState)=>{
    const {id} = initialState
    try {
        const response = await axios.delete(`${POST_URL}/${id}`)
        if(response?.status ===200) return initialState
        return `${response?.status}:${response?.statusText}`
    } catch (err) {
        return err.message
    }
})



const postSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{


        reactionAdded(state,action){
            const { postId,reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            // const existingPost = state.entities[postId]
            if(existingPost){
                existingPost.reactions[reaction]++
            }
        },
        
        increseCount:(state,action)=>{
            state.count +=1
        }
    },
    //for an api call all casees
    extraReducers(builder){
        builder
        .addCase(fetchPosts.pending,(state,action)=>{
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            let min = 1;
            const loadedPost = action.payload.map(post=>{
                post.date = sub(new Date(),{minutes:min++}).toISOString()
                post.reactions={
                    thumbsUp:0,
                    wow:0,
                    heart:0,
                    rocket:0,
                    coffee:0
                }
                return post
            })
            state.posts = state.posts.concat(loadedPost)
            // postAdapter.updateMany(state,loadedPost)
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.status = 'failed',
            state.error = action.error.message
        })
        .addCase(addNewPost.fulfilled,(state,action)=>{
            action.payload.userId = Number(action.payload.userId)
            action.payload.date = new Date().toISOString()
            action.payload.reactions={
                thumbsUp:0,
                wow:0,
                heart:0,
                rocket:0,
                coffee:0  
            }
            console.log(action.payload)
            state.posts.push(action.payload)
            // postAdapter.addOne(state,action.payload)
        })
        .addCase(updatePost.fulfilled,(state,action)=>{
            if(!action.payload?.id){
                console.log("Update could not compelete")
                console.log(action.payload)
                return;
            }
            const {id} = action.payload
            action.payload.date = new Date().toISOString()
            const posts = state.posts.filter(post=>post.id !==id)
            state.posts = [...posts,action.payload]
            // postAdapter.upsertOne(state,action.payload)

        })
        .addCase(deletePost.fulfilled,(state,action)=>{
            if(!action.payload?.id){
                console.log("Delete could not compelete")
                console.log(action.payload)
                return;
            }

            const {id} = action.payload
            const posts = state.posts.filter(post=>post.id !== id)
            state.posts = posts
            // postAdapter.removeOne(state,id)
        })
    }
})


// export const {
//     selectAll:selectAllPost ,
//     selectById: selectPostById,
//     selectIds:selectPostIds ,
// } = postAdapter.getSelectors(state=>state.posts)


export const selectAllPost = (state)=>state.posts.posts
export const getPostStatus = (state)=>state.posts.status
export const getPostError = (state)=>state.posts.error
export const getCount = (state)=>state.posts.count

export const selectPostById = (state,postId)=>{
   return state.posts.posts.find(post=>post.id === postId)
}

export const selectPostByUser =createSelector(
    [selectAllPost,(state,userId)=>userId],
    (posts,userId)=>posts.filter(post=>post.userId ===userId)
)

export const { reactionAdded,increseCount } = postSlice.actions
export default postSlice.reducer