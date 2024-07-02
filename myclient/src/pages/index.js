"use client";
import Navbar from "../components/navbar";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchData } from "../redux/fetchslice";
import { useDispatch, useSelector } from "react-redux";
import ImageSlider from "../components/image-slider";
import SaleIn from "./salein";

export default function Home() {
  const [curPage, setCurPage] = useState(4);
  const LoadMore = () => {
    setCurPage(curPage + curPage);
  };
  const dispatch = useDispatch();
  const users = useSelector((state) => state.data.fetchData);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div className="main">
      <Navbar></Navbar>
      <div>
        <ImageSlider></ImageSlider>
  <div className=" pro-item container mx-auto mt-10">
          <h1 className="pro-heading">New products</h1>
          <div className="container mx-auto grid grid-cols-4 gap-5 xs:grid xs:grid-cols-2 sm:grid-cols-3">
            {users &&
              users.slice(0, curPage).map((product, key) => {
                return (
                  <div key={product._id} className="pro-items col-span-1 xs:h-80 sm:h-80 md:h-80 lg:h-96 xl:h-96 2xl:h-96">
                    <div className="pro-image-div">
                      <Link href={`./${product._id}`}>
                        <Image
                          className="pro-image"
                          src={"/" + product.image.data}
                          width={300}
                          height={300}
                          alt="product image"
                        ></Image>
                      </Link>
                    </div>
                    <div>
                      <p className="pro-tit">{product.title}</p>
                      <p className="pro-pri">
                        RS. <b>{product.price}</b> PKR
                      </p>
                    </div>
                    <div className="pro-cat">
                      <p>{product.category}</p>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="load-more">
            <div>
              <button onClick={LoadMore}> Load More</button>
            </div>
          </div>
        </div>
        <SaleIn></SaleIn>
      </div>
    </div> /////
  );
}
