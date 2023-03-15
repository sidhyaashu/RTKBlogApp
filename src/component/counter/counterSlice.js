import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count:0
}

export const counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        increment:(state)=>{
            state.count +=  1
        },
        decrement:(state)=>{
            state.count -=  1
        },
        incrementbyamount:(state,action)=>{
            state.count = state.count + action.payload
        },
        decrementbyamount:(state,action)=>{
            state.count = state.count - action.payload
        },
        reset:(state)=>{
            state.count =0
        }
    }
})

export const {increment,decrement,incrementbyamount,decrementbyamount,reset} = counterSlice.actions
export default counterSlice.reducer