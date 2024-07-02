"use client";
import Navbar from "../../components/navbar";
import { FaPhone } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";
import { useEffect } from "react";
import { useRouter} from "next/navigation";
import { useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import {data} from "../../redux/cartDatafetch"



export default function Contact() {
  const [user,setUser] = useState('')
  const router = useRouter();
  const dispatch = useDispatch()
  dispatch(data(user))
 const callContactPage = async () => {
    try {
      const res = await fetch("http://localhost:5000/contact", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      
      if (res.ok) {
        const data = await res.json() 
   return setUser(data.data);
        
      }
      else{
        alert("You Are Not Looged in")
        router.push("/login")

      }
      
    } catch (error) {
    console.error("signUp first")
      
    }
  };

  useEffect(() => {
    callContactPage();
  }, []);
console.log(user)
  return (
    <>
      <Navbar></Navbar>
      <div className="con-detail gap-4 container mx-auto xs:grid xs:grid-cols-1 sm:grid sm:grid-cols-6 md:grid md:grid-cols-6 lg:grid lg:grid-cols-6 xl:grid xl:grid-cols-6 2xl:grid 2xl:grid-cols-6">
        <div className="xs:col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
          <i>
            <FaPhone></FaPhone>
          </i>
          <p className="inline-block">
            <b>phone</b>
          </p>
          <p>
            <em>03303042267</em>
          </p>
        </div>
        <div className="  xs:col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
          <i>
            <MdMarkEmailUnread></MdMarkEmailUnread>
          </i>
          <p className="inline-block">
            <b>Email</b>
          </p>
          <p>
            <em>{user.email}</em>
          </p>
        </div>
        <div className=" xs:col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
          <i>
            <FaAddressBook></FaAddressBook>
          </i>
          <p className="inline-block">
            <b>Adress</b>
          </p>
          <p>
            <em>Karachi.</em>
          </p>
        </div>
      </div>

      {/* get in touch */}
      <div className="container mx-auto get-in">
        <div>
          <div className="container mx-auto ">
            <div className="con-form bg-slate-900">
              <form action="GET">
                <p>Get in Touch</p>
                <input type="text" placeholder="Your Name" value={user.firstName} />
                <input type="text" placeholder="Your Email" value={user.email}/>
                <input type="text" placeholder="Your Phone Numer" />
                <textarea name="" id="" cols="30" rows="7"></textarea>
                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
