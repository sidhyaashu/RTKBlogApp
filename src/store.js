import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './component/counter/counterSlice.js'
import postReducer from './component/social/socialSlice.js'
import userReducer from './component/user/userSlice.js'

export const store = configureStore({
    reducer:{
        counter:counterReducer,
        posts:postReducer,
        users:userReducer
    }
})