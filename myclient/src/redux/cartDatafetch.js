import { createSlice } from "@reduxjs/toolkit";

const initialState ={
 cart:[]
}
const fetchusersDataSlice = createSlice({
    name: "users Data",
    initialState,
    reducers:{
        data:(state,action)=>{
state.cart =[action.payload]
console.log(state.cart)
    }

}
})
export const {data} = fetchusersDataSlice.actions
export default fetchusersDataSlice.reducer