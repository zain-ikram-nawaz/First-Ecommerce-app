"use client";

import React,{ useState,useEffect} from "react";
import Navbar from "../../components/navbar";
import { fetchData } from "../../redux/fetchslice";
import { useSelector,useDispatch} from "react-redux";
import Link from "next/link";
import Image from "next/image";


export default function Shop() {
  const [curPage,setCurPage] = useState(3)
  const users = useSelector((state) => state.data.fetchData);
  const [data,setData]=useState(users)
  const [priceRange, setPriceRange] = useState([0, 1000]); 
  const dispatch = useDispatch();
  const LoadMore =()=>{
    setCurPage(curPage + curPage)
  }
  useEffect(() => {
    dispatch(fetchData());
  }, []);
const descendingByPrice = ()=>{
  const sortData = [...data].sort((a,b)=>b.price - a.price)
  setData(sortData)
}
const AescendingByPrice = ()=>{
  const sortData = [...data].sort((a,b)=>a.price - b.price)
  setData(sortData)
}
const handleSelector =(e)=>{
const sortOption = e.target.value;
if(sortOption === "price-des")
{
  descendingByPrice();
}
else if(sortOption === "price-asc"){
  AescendingByPrice()
}
}

  const filterResult = (catItem)=>{
    const result = users.filter((cureData)=>{
return cureData.category === catItem
    })
setData(result)
  }
  const handleChange =()=>{
 const filteredData = users.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    setData(filteredData);
  }
  const resetSearch = () => {
    setData(users);
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className=" h-full">
        <div className="banner-shop"></div>
        <div className="filter container mx-auto">

         
        </div>
      
  
        <div className=" container mx-auto shop grid grid-cols-4 gap-4">
          <div className="category col-span-1">
          <span >Select Category</span>
            {/* <input type="search" placeholder="search item"/><span><button>search</button></span> */}
            <button onClick={()=>{
              filterResult("roetell")
            }}>Roetell</button>
            <button onClick={()=>{
              filterResult("perky pet")
            }}>Perky pet</button>
            <button onClick={()=>{
              filterResult("woodlink")
            }}>woodlink</button>
            <button onClick={()=>{
              filterResult("rolli pet")
            }}>Rolli pet</button>
            <button onClick={()=>{
              filterResult("C&S products")
            }}>C&S products</button>
            <button onClick={()=>{
              filterResult("backyard chirper")
            }}>Backyard chirper</button>
            <div className="price-range">  <p>price {priceRange[0]}</p>
        <input type="range" value={priceRange[0]}
         min="0"
         max="1000" 
         onChange={(e) => setPriceRange([parseFloat(e.target.value), priceRange[1]], handleChange()) }/>
         </div>
         <button onClick={resetSearch}>reset search</button>
          </div>
          <div className="product-item col-span-3">
          <div className="price-as-des">
         <select name="" id="" onChange={handleSelector}>
    <option value="price-des" onClick={descendingByPrice}>price by descending</option>
    <option value="price-asc" onClick={AescendingByPrice}>price by Ascending </option>
   </select>
 
         </div>
          <div className="container mx-auto grid  xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
       
            {data &&
              data.slice(0,curPage).map((product) => {
                return (
                  <div key={product._id} className=" pro-items p-4">
                    <div>
                      <Link href={"/" + product._id}>
                        <Image
                          className="shop-image"
                          src={"/" + product.image.data}
                          width={300}
                          height={300}
                          alt="product image"
                        ></Image>
                      </Link>
                    </div>
                    <div >
                      <p className="shop-tit">{product.title}</p>
                      <p className="shop-pri">RS.{product.price} PKR</p>
                    </div>
                    <div className="shop-cat">
                      <p>{product.category}</p>
                    </div>
                   
                  </div>
                );
              })}
          </div>
          <div className="load-more mb-10">
                      <div>
                        <button onClick={LoadMore}> Load More</button>
                      </div>
                    </div>
          </div>
        </div>
    

      </div>
    </div>
  );
}
