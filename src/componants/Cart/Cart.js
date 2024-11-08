import React from 'react';
import './Cart.css';
import { Link, NavLink } from 'react-router-dom';
import Header from '../Header/Header';
import CartPorduct from './CartPorduct/CartPorduct';
import { useEffect } from 'react';
import { useState } from 'react';

const Cart = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [cartItemInfo, setCartItemInfo] = useState([]);
    const [summaryInfo, setSummaryInfo] = useState({
        totaProduct: 0,
        delvaryCharge: 0,
        totalPrice: 0
    })

    const cartItems = JSON.parse(localStorage.getItem("cartArray"))

    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            setCartItemInfo(cartItems)
        }
    }, [])

    useEffect(() => {

        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/product`)
          .then((res) => res.json())
          .then((data) => {
            if (data.data) {
              const currentSummary = { ...summaryInfo };

              if (cartItems?.length) {
                if (data.data?.length) {
                  const filerProducts = data.data.filter((pd) => {
                    if (cartItems) {
                      for (let i = 0; i < cartItems.length; i++) {
                        if (cartItems[i].id === pd._id) {
                          currentSummary.totaProduct =
                            Number(currentSummary.totaProduct) +
                            Number(cartItems[i].quantity);
                          currentSummary.totalPrice =
                            Math.floor(currentSummary.totalPrice) +
                            (Number(pd.price) -
                              (Number(pd.price) * Number(pd.discount)) / 100) *
                              Number(cartItems[i].quantity);
                          setSummaryInfo(currentSummary);
                          pd["quantity"] = cartItems[i].quantity;
                          return pd;
                        }
                      }
                    }
                  });
                  setCartProducts(filerProducts);
                }
              }
            } else {
            }
          });
    }, [cartItemInfo])
 

    const handleQuentity = (type, id) => {
        
        const cartItems = [...cartItemInfo]

        const newArray = cartItems.map(pd => {
            if (pd.id == id) {
                if (type === "increment") {
                    pd["quantity"] = Number(pd.quantity) + 1
                }
                if (type === "dicriment" && Number(pd.quantity) > 1) {
                    pd["quantity"] = Number(pd.quantity) - 1
                }
                return pd
            } else {
                return pd
            }

        })
        localStorage.setItem("cartArray", JSON.stringify(newArray));
        setCartItemInfo(newArray)
    }

    return (
        <div className=''>
            <Header />
            <div className='cart-body'>
                {
                    cartProducts?.length ? <div className=''>
                        <div className='item-container'>
                            {
                                cartProducts?.length && cartProducts.map(pd => {
                                    return <CartPorduct handleQuentity={handleQuentity} product={pd} />
                                })
                            }

                        </div>
                    </div> : <div className='no-item'>
                        <h6>There Are NO Items In This Cart</h6>
                        <NavLink to="/" >CONTINUE SHOPING</NavLink>
                    </div>
                }

                <div>
                    <div className='cart-summary'>
                        <h5>Order Summary</h5>
                        <p>Total Products: {summaryInfo.totaProduct}pic</p>
                        <p>Delevary Charge: 0 TK</p>
                        <p>Products Price Charge: {summaryInfo.totalPrice} TK</p>
                        <span>Total: {summaryInfo.totalPrice} Tk</span>
                        <button type="button" class="btn btn-success mt-3 d-block mx-auto">
                            <Link to="/login" style={{color: "#fff", textDecoration: "none"}}>
                            Process To Checkout
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;