import React from 'react';
import './AdminProductCard.css';
import { AiFillStar } from 'react-icons/ai';
import { RiStarHalfFill } from 'react-icons/ri';
import { useState } from 'react';
import { useEffect } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb'
import { Link } from 'react-router-dom';

const AdminProductCard = ({ product }) => {
    const [starArray, setStartArray] = useState([])
    const [halfStarArray, setHalfStartArray] = useState([])
    const [wating, setWating] = useState(false)

    const handleDeleteProduct = (productID) => {
        if (wating) {
            return true
        }
        setWating(true)
        fetch(
          `${process.env.REACT_APP_SERVER_HOST_URL}/product/delete_product/${productID}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setWating(false);
            if (data.data) {
              document.getElementById(productID).style.display = "none";
            }
          });

    }
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

    return (
      <div className="admin-porduct" id={product._id}>
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
              class="btn btn-success my-2 my-md-0 me-md-2 me-md-3"
            >
              <Link
                to={`/product/edit_product/${product._id}`}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Edit
              </Link>
            </button>

            <button
              type="button"
              class="btn btn-warning"
              onClick={() => handleDeleteProduct(product._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
};

export default AdminProductCard;