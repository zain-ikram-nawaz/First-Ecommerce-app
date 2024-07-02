import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState ={
 productAPIData:[],
}
export const fetchData = createAsyncThunk("fetchData",async()=>{
    const result = await fetch('http://localhost:5000/product')
    return result.json()
})
const fetchDataSlice = createSlice({
    name: "All-Data",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchData.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.fetchData = action.payload

        })
    }
})

export default fetchDataSlice.reducer