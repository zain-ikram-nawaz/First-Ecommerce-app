"use client";
import Link from "next/link";
import {useState} from "react";
import { TiThMenuOutline } from "react-icons/ti";
import { FaHome } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { SiGnuprivacyguard, SiAboutdotme } from "react-icons/si";
import { ImProfile } from "react-icons/im";
import { LuLogIn } from "react-icons/lu";
import { FaShoppingCart } from "react-icons/fa";
import Logout from "../../pages/logout";
import cookies from "js-cookie";
import dynamic from "next/dynamic";


function Navbar() {

  const [isclick, SetIsclick] = useState(true);
  const token = cookies.get("newToken");
  console.log(token)

  return (
    <div>
      <div>
        <div className="cod">
          <Link href="www.googole.com">
            <marquee behavior="scroll" direction="right">
              {" "}
              <p>
                Cash on Delivery | WhatsApp # <b>0330-3042267</b>
              </p>
            </marquee>
          </Link>
        </div>
      </div>

      <nav className=" mt-2">
        <div className="navbar grid container mx-auto xs:grid xs:grid-cols-8 sm:grid-cols-8 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 3xl:grid-cols-6">
          <div className=" logo xs:col-span-2 sm:col-span-2md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
            <p>logo</p>
          </div>
          <div className="link  xs:col-span-4 sm:col-span-3  sm:bg-red-400-600 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4 3xl:col-span-4">
            <div className={isclick ? "li" : "zain"}>
              <ul className="3xl:flex">
                <li>
                  <Link href="./">
                    <i>
                      <FaHome />
                    </i>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="../about">
                    <i>
                      <SiAboutdotme />
                    </i>
                    About
                  </Link>
                </li>
                <li>
                  <Link href="../contact">
                    <i>
                      <IoMdContact />
                    </i>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="../shop">
                    <i>
                      <ImProfile />
                    </i>
                    Shop
                  </Link>
                </li>

                {!token ? (
                  <Link href="../login">
                    <li>
                      <i>
                        <LuLogIn />
                      </i>
                      Login
                    </li>
                  </Link>
                ) : (
                  <Link href="#" onClick={Logout}>
                    <li>
                      <i>
                        <SiGnuprivacyguard />
                      </i>
                      Logout
                    </li>
                  </Link>
                )}

                <li></li>
              </ul>
            </div>
          </div>
          <div className="menu xs:col-span-1  md:hidden lg:hidden xl:hidden 2xl:hidden">
            <span
              onClick={() => {
                SetIsclick(!isclick);
              }}
            >
              <TiThMenuOutline></TiThMenuOutline>
            </span>
          </div>
          <div className="cart-icon xs:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1 3xl:col-span-1 ">
            <Link href="../cart">
              <i>
                <FaShoppingCart className="inline-block" />
              </i>
              {/* (<span className="cart-qua">{cart.length}</span>) */}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
