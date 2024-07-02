"use client"
import { configureStore } from '@reduxjs/toolkit'


import cartReducer from "./cartDatafetch"
import dataReducer from "./fetchslice"
import usersDataReducer from "./cartDatafetch"


export const store = configureStore({
  reducer:{

    // allcart :CartRducer,
    data:dataReducer,
    userData:usersDataReducer,
    cartData : cartReducer,
   
  },
 
})


