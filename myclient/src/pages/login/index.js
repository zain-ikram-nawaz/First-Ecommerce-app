"use client";
// import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Navbar from "../../components/navbar";

export default function login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // axios.defaults.withCredentials = true;
  async function handlerSubmit(e) {
    e.preventDefault();
    let userData = {
      email: email,
      password: password,
    };

    if (!email || !password) {
      alert("plz fill all field");
    }
    const res = await fetch("http://localhost:5000/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Redirect to the specified route
          alert(data.message)
          window.location.href = data.redirect;

        } else {
          console.error(data.error);
          // Handle unsuccessful login
        }
      })
      .catch((error) => console.error("Error:", error));
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="center-div container mx-auto">
        <div className="main-form  container mx-auto grid gap-4  xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-2  xl:grid-cols-2 2xl:grid-cols-2 ">
          <div className="form xs:col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
            <form action="" onSubmit={handlerSubmit}>
              <h1>Login </h1>
              <input
                type="email"
                placeholder="Enter Your Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Link href="/signup">
                {" "}
                <p>I dont have a account</p>
              </Link>
              <button className="btn" type="submit">
                Login
              </button>
            </form>
          </div>
          <div className="signup-image md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
            <Image src="/signup.jpg" width={400} height={400} alt="Login image" priority="true"></Image>
          </div>
        </div>
      </div>
    </>
  );
}
