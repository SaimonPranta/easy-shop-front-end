import React from 'react';
import './MainPorduct.css';
import { AiFillStar } from 'react-icons/ai';
import { RiStarHalfFill } from 'react-icons/ri';
import { useState } from 'react';
import { useEffect } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb'
import { Link } from 'react-router-dom';

const MainPorduct = ({ product }) => {
    const [starArray, setStartArray] = useState([])
    const [halfStarArray, setHalfStartArray] = useState([])

    useEffect(() => {
        const array = []
        const emptyArray = []
        for (let i = 1; i <= product.rating; i++) {
            array.push(i)
            setStartArray(array)
        }
        for (let i = 1; i <= (5 - product.rating); i++) {
            emptyArray.push(i)
            setHalfStartArray(emptyArray)
        }

    }, [])

    const handleAddToCart = (productID) => {
        if (localStorage.getItem("cartArray") == null) {
            const array = [{
                id: productID,
                quantity: 1
            }]
            localStorage.setItem("cartArray", JSON.stringify(array));
        } else {
            const cartArray = JSON.parse(localStorage.getItem("cartArray"));
            const isAlreadyExistist = cartArray.find(pdInfo => pdInfo.id == productID)
            const newCartArray = cartArray.map(info => {
                if (info.id == productID) {
                    info["quantity"] = info.quantity + 1
                }
                return info
            })
            if (!isAlreadyExistist) {
                newCartArray.push({
                    id: productID,
                    quantity: 1
                })
            }
            localStorage.setItem("cartArray", JSON.stringify(newCartArray));
        }

    }


    return (
      <div className="main-porduct">
        <Link to={`/product/${product._id}`}>
          <div className="card-img">
            <img
              src={
                product.img
                  ? `${process.env.REACT_APP_SERVER_HOST_URL}/${product.img}`
                  : ""
              }
              alt=""
            />
          </div>
          <div className="porduct-details">
            <h6>{product.title}</h6>
            <p className="price">
              <TbCurrencyTaka />
              {Math.floor(product.price)}
            </p>
            <p className="old-price">
              <TbCurrencyTaka />
              {Math.floor(
                product.price - product.price * (product.discount / 100)
              )}
            </p>
            <p className="point">
              Point: {Math.floor(Number(product.price) / 12)}
            </p>

            <div>
              {starArray.map((ele) => {
                return <AiFillStar />;
              })}
              {halfStarArray.map((ele) => {
                return <RiStarHalfFill />;
              })}
            </div>
            <div
              class="btn-group mt-md-3 d-grid  d-md-flex"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button
                type="button"
                class="buy-now-btn btn btn-success my-2 my-md-0 me-md-2 me-md-3"
              >
                <Link
                  to="/login"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Buy Now
                </Link>
              </button>
              <button
                type="button"
                class="btn btn-warning"
                onClick={() => handleAddToCart(product._id)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </Link>
      </div>
    );
};

export default MainPorduct;

