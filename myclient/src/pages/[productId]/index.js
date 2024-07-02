import React   from "react";
import Navbar from "../../components/navbar";
import Image from "next/image";
import { RiStarSFill } from "react-icons/ri";



export default function ProductId({ repo }) {



  if(!repo){
    return <div>...loading</div>
  }
const sendDatatoFetch = async(cartData)=>{
  try {
    await fetch("http://localhost:5000/cartdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartData }),
      credentials: "include",
    });
  } catch (error) {
    console.error("Error sending data:", error);
  }

};

  return (
    <>
      <Navbar></Navbar>
      <div className="detailed-page mt-4">
        <div key={repo._id} className="single-item-div container mx-auto grid sm:grid-cols-2 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-10">
          <div className="  detail-img">
            <div>
              <Image
                src={`/${repo.image.name}`}
                width={400}
                height={400}
                alt="single-item image"
                className="detail-photo"
              ></Image>
            </div>
          </div>
          <div className="detaile-text">
            <div>
              <p className="detail-title">{repo.title}</p>
              <span className="detail-price">
                <p>
                  Rs. <b>{repo.price}</b>
                </p>
              </span>
              <p className="rating-icon">
                <RiStarSFill className="inline-block" />
                <RiStarSFill className="inline-block" />
                <RiStarSFill className="inline-block" />
                <RiStarSFill className="inline-block" />
                <RiStarSFill className="inline-block" />
              </p>
              <h1 className="detail-des-heading">Description:</h1>
             
              <p className="detail-text">{repo.description}</p>
         
                <button onClick={()=>{sendDatatoFetch(repo)} }>Add to card</button>
       
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:5000/product/`);
  const repo = await res.json();
const paths = repo.map((curElem)=>{
return{
  params:{productId:curElem._id.toString()},
}
})
  return {
  paths,
    fallback: false, // false or "blocking"
  };
}

export async function getStaticProps({ params }) {
  const { productId } = params;

  // console.log(productId)
  const res = await fetch(`http://localhost:5000/product/${productId}`);
  const repo = await res.json();
  return { props: { repo } };
}
