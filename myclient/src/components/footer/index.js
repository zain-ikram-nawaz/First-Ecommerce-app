import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="main-footer mt-12">
      <div className="footer grid gap-5 xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6">
        {/* /////1 */}
        <div className="xs:col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
          <ul>
            <li className="footer-heading">Birds zone</li>
            <li>
              <p>
                Address:16 C, Abu Asfani Road, Faisal Town Near Mobilink
                Franchise, Lahore{" "}
              </p>
            </li>
            <li>
              <p>email: Info@Birdsplanet.Pk</p>
            </li>
            <li>
              <p>Phone:03008874039</p>
            </li>
          </ul>
        </div>
        {/* //////2 */}
        <div className="xs:col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
          <ul>
            <li className="footer-heading">About</li>
            <li>
              <p>About</p>
            </li>
            <li>
              <p>Terms & Conditions</p>
            </li>
            <li>
              <p>Payment Methods</p>
            </li>
            <li>
              <p>Buyer's Guide</p>
            </li>
            <li>
              <p>Contact</p>
            </li>
          </ul>
        </div>
        {/* //// 3 */}
        <div className="xs:col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
          <ul>
            <li className="footer-heading">Quick links</li>
            <li>
              <p>My Account</p>
            </li>
            <li>
              <p>Additional Suport</p>
            </li>
            <li>
              <p>Deliver Imformation</p>
            </li>
            <li>
              <p>Testimoials</p>
            </li>
          </ul>
        </div>
      </div>
      {/* //// 4 icons */}
      <div className="footer-icon">
        <div className="icon-div">
          <i>
            <FaFacebookF></FaFacebookF>
          </i>
          <i>
            <FaTwitter></FaTwitter>
          </i>
          <i>
            <FaYoutube></FaYoutube>
          </i>
          <i>
            <FaPinterestP></FaPinterestP>
          </i>
        </div>
      </div>
        <hr />
      <div className="copy-right">
        <div>
<p>© 2024, Birds wala Powered by Web Developer</p>
        </div>
      </div>
    </div> /////
  );
}
