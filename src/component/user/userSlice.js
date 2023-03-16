// import { createSlice } from "@reduxjs/toolkit";

// const initialState=[
//     {id:'1',name:"Asutosh sdihaya"},
//     {id:'2',name:"Biswanath sdihaya"},
//     {id:'3',name:"Rama sdihaya"},
//     {id:'4',name:"Joshna sdihaya"},
// ]


// const userSlice = createSlice({
//     name:"users",
//     initialState,
//     reducers:{}
// })

// export const selectAllUser =(state)=>state.users;

// // export const {  } = userSlice.actions
// export default userSlice.reducer



//user from server

import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USER_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState=[]

export const fetchUsers = createAsyncThunk('users/fetchUsers',async()=>{
    try {
        const response = await axios.get(USER_URL)
        return [...response.data]
    } catch (error) {
        return error.message
    }
})


const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            return action.payload
        })
    }
})

export const selectAllUser =(state)=>state.users;

export const selectUserById=(state,userId)=>{
    state.users.find(user=>user.id === userId)
}

// export const {  } = userSlice.actions
export default userSlice.reducer