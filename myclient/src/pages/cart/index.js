// "use client"
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Image from "next/image";
// import {useDispatch, useSelector } from "react-redux";
// import {data} from "../../redux/cartDatafetch"
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";





export default function CartDispaly() {
  const [cart, setCart] = useState([]);
 
  // const dispatch = useDispatch()
  // dispatch(data(cart))
  const router = useRouter();
  const callContactPage = async () => {
    try {
      const res = await fetch("http://localhost:5000/cartitems", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        return setCart(data.cartData);
      } else {
        alert("You Are Not Looged in")
        router.push("/login");
      }
    } catch (error) {
      console.error("your are not logged in");
    }
  };

  const RemoveItem = async (id) => {
    await fetch(`http://localhost:5000/cartremove/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    callContactPage();
  };
  const IncreasseQuantity = async (id) => {
    await fetch(`http://localhost:5000/increase/${id}`, {
      method: "PUT",
      credentials: "include",
    });
    callContactPage();
  };
  const DecreasedQuantity = async (id) => {
    await fetch(`http://localhost:5000/decrease/${id}`, {
      method: "PUT",
      credentials: "include",
    });
    callContactPage();
  };

  useEffect(() => {
 
    callContactPage();
  }, []);


  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OqY7TAM6LXkQCi4wf9x8UPoUfrAVQuDoI8Jclx4Y2V6rJGOpgLSWLxdpnAh2gvahI6oRtrd78pCS8gRhe5IUKjF00EsEV7iMw"
    );

    const res = await fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });
    const session = await res.json();

    return stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };
  const sum = cart.reduce((firstitem,allitems)=>
      firstitem + allitems.quantity,0)
      const totalprice = cart.reduce((firstitem,allitems)=>
      firstitem + allitems.price * allitems.quantity,0)

      
  return (
    <>
      <Navbar></Navbar>

      <div className="container mx-auto">
        <h1></h1>
        <div>
          <h1></h1>
          {cart &&
            cart.map((item, i) => {
              return (
                <div
                  key={item._id}
                  className="grid xs:grid-cols-1 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3"
                >
                  <div className="cart-image ">
                    <Image
                      src={`/${item.image.data}`}
                      width={200}
                      height={200}
                      alt="cart img"
                      className="cart-photo"
                    ></Image>
                  </div>

                  <div className="cart-in-btn">
                    <div>
                      <button
                        onClick={() => {
                          item.quantity > 1
                            ? DecreasedQuantity(item._id)
                            : item.quantity;
                        }}
                      >
                        -
                      </button>{" "}
                    </div>
                    <p>{item?.quantity}</p>
                    <div>
                      <button
                        onClick={() => {
                          IncreasseQuantity(item._id);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="delete-btn">
                    <div>
                      <button
                        onClick={() => {
                          RemoveItem(item._id);
                        }}
                      >
                        remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div>

        <div className="total-quan ">
          TotalQuatity :
          <span>
            <b>{sum}</b>
          </span>
        </div>
        <div className="total-pri">
          TotalPrice :
          <span>
            <b>{totalprice}</b>
          </span>
        </div>
        <button
          onClick={makePayment}
          type="submit"
          className="btn bg-green-800 py-2 px-6 mt-4 text-white font-semibold"
          >
          checkout
        </button>
          </div>
      </div>
    </>
  );

  //     useEffect(()=>{
  //         localStorage.setItem("cart",JSON.stringify(cart))
  //     })

  //     // console.log(cartdata)

  //     const sum = cart.reduce((firstitem,allitems)=>
  //     firstitem + allitems.quantity,0)
  //     const totalprice = cart.reduce((firstitem,allitems)=>
  //     firstitem + allitems.price * allitems.quantity,0)

  //   return (
  //     <>

  // <Navbar></Navbar>

  // <div className='container mx-auto'>

  // <div >
  //     <h1></h1>
  // {cart && cart.map((item,i) =>{
  //     return(
  //         <div key={item._id} className="grid xs:grid-cols-1 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3">
  // <div className='cart-image '>
  // <Image src={`/${item.image.data}`} width={200} height={200} alt='cart img' className='cart-photo'></Image>
  // </div>
  // {/* //// */}
  // <div className='cart-in-btn'>
  // <div><button onClick={()=> item.quantity > 0 ? dispatch(Decreament(item?._id)) : item.quantity }>-</button> </div><p>{item?.quantity}</p>
  // <div><button onClick={()=>dispatch(Increament(item?._id))}>+</button></div>
  // </div>
  // <div className='delete-btn'>
  // <div><button onClick={()=>{dispatch(RemoveCart(item._id))}}>remove</button></div>
  // </div>
  //         </div>
  //     )
  // })}

  // </div>
  // </div>
  // <div className='cart-sum container mx-auto'>

  // <div className='total-quan '>TotalQuatity :
  //     <span><b>{sum}</b></span></div>
  // <div  className='total-pri'>TotalPrice :
  //     <span><b>{totalprice}</b></span></div>
  //     <button onClick={makePayment} type="submit" className='btn bg-green-800 py-2 px-6 mt-4 text-white font-semibold'>checkout</button>
  // </div>

  //     </>
  //   )
}
