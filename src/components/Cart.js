import "./styles.css";
import React from "react";
import Header from "./Header";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
export default function AddtoCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let ResFromLocalSrorage = localStorage.getItem("productsList");
    setCart(JSON.parse(ResFromLocalSrorage));
  }, []);
  useEffect(() => {
    localStorage.setItem("productsList", JSON.stringify(cart));
  }, [cart]);
  //function for to delete items irespective of quantity
  function handleDelete(e) {
    const filtered = cart.filter((element, ind) => {
      return element.id !== e;
    });
    setCart(filtered);
  }
  //function to handle reduce quantity
  function handleReduce(qty, num) {
    const minus = cart.map((ele) => {
      if (ele.id === num) {
        return { ...ele, quantity: ele.quantity - 1 };
      }
      return ele;
    });
    if (qty - 1 === 0) console.log(handleDelete(num));
    else setCart(minus);
  }
  //function to handle add items upto given stock available from backend else it will throw an error
  function handleIncrese(qty, num) {
    const increase = cart.map((ele) => {
      if (ele.id === num) {
        return { ...ele, quantity: ele.quantity + 1 };
      }

      return ele;
    });

    setCart(increase);
  }
  //function for to get total amomunt in the cart
  function getTotal() {
    let total = 0;
    if (cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
      }
    }
    return total;
  }

  return (
    <>
      <Header />
      SHOPING CART
      <hr />
      {cart.map((e) => (
        <>
          <div key={e.id}></div>
          <div className="cart">
            <div>{e.name}</div>
            <div>Item Price {e.price}</div>
            <div>
              {" "}
              Quantity {e.quantity}
              <div>
                <span>
                  <button onClick={() => handleReduce(e.quantity, e.id)}>
                    -
                  </button>
                </span>
                <span>
                  <button onClick={() => handleIncrese(e.quantity, e.id)}>
                    +
                  </button>
                </span>
                <span>
                  <Button onClick={() => handleDelete(e.id)}>Delete</Button>
                </span>
              </div>
            </div>
          </div>
          <hr />
        </>
      ))}
      <p>TOTAL</p>
      {getTotal()}
      <hr />
      <p>
        <Button>CHECKOUT</Button>
      </p>
    </>
  );
}
