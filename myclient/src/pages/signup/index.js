"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/navbar"
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter()
  const [firstName, setFirstName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function onHandleSubmit(e) {
    e.preventDefault();
    let userData = {
      firstName: firstName,
      email: email,
      password: password,
    };

    if (!firstName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    const response = await fetch("http://localhost:5000/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    })
    if (!response.ok) {
      const errorMessage = await response.json(); // Assuming your backend returns JSON
    alert(errorMessage.error); // Log the error to console or handle it as per your UI requirements
    } else {
      const responseData = await response.json(); // Assuming your backend returns JSON
alert(responseData.message); 
router.push("/login")
// Log the successful response or handle it as per your UI requirements
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="center-div container mx-auto">
      <div className="main-form container mx-auto grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-2  xl:grid-cols-2 2xl:grid-cols-2">
        <div className="form xs:col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
          <form onSubmit={onHandleSubmit}>
            <h1>Sign up</h1>
            <input
              type="text"
              name="firstName"
              placeholder="Enter Your Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              name="email"
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>
              <Link href="./login"> Already have a Account </Link>
            </p>
            <button type="submit">Sign up</button>
          </form>
        </div>
        <div className="signup-image md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
          <Image src="/signup.jpg" width={350} height={400} alt="signup image"></Image>
        </div>
      </div>
      </div>
      
    </>
  );
}
