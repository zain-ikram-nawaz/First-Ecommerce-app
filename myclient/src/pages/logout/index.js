"use client"
import React from "react"
export default  function Logout() {

  

 fetch("http://localhost:5000/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(meesage=>{
 const result =(meesage.data,{message:"You are Logout successfully"})
 return alert(result.message)
    })
    .catch(error=>{
      console.error("You Are Not Logged in ",error)
    })


  return(
      
      <>
  </>
      ) 
}
