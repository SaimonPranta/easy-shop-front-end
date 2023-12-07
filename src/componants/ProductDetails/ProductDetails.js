import React from 'react';
import './ProductDetails.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { AiFillStar } from 'react-icons/ai';
import { RiStarHalfFill } from 'react-icons/ri';
import { TbCurrencyTaka } from 'react-icons/tb';
import { BiArrowToRight } from 'react-icons/bi';
import MainPorduct from '../SubComponents/MainPorduct/MainPorduct';
import ReactImageMagnify from 'react-image-magnify';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';


const ProductDetails = () => {
    const [proudctDetails, setProductDetails] = useState({})
    const [starArray, setStartArray] = useState([])
    const [halfStarArray, setHalfStartArray] = useState([])
    const [allProducts, setAllProducts] = useState([])


    const { id } = useParams()
    useEffect(() => {
        if (id) {
            fetch(
              `${process.env.REACT_APP_SERVER_HOST_URL}/product/get_product/${id}`
            )
              .then((res) => res.json())
              .then((data) => {
                if (data.data) {
                  setProductDetails(data.data);
                }
              });
        }
    }, [id])
    useEffect(() => {
        if (proudctDetails?._id) {
            const array = []
            const emptyArray = []
            for (let i = 1; i <= proudctDetails.rating; i++) {
                array.push(i)
                setStartArray(array)
            }
            for (let i = 1; i <= (5 - proudctDetails.rating); i++) {
                emptyArray.push(i)
                setHalfStartArray(emptyArray)
            }
        }

    }, [proudctDetails])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/product`)
          .then((res) => res.json())
          .then((data) => {
            if (data.data) {
              setAllProducts(data.data);
            } else {
            }
          });
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
            const isAlreadyExistist = cartArray.find( pdInfo => pdInfo.id == productID)
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
      <main className="product-details wraper">
        <Header />
        <section className="details-body">
          <div className="porduct-heaqding">
            <p>Home > Product > {proudctDetails.title}</p>
          </div>
          <div className="product-details-wraper row pb-5">
            <div className="product-img col-12 col-lg-5">
              {/* <div> */}
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: true,
                    src: proudctDetails?.img
                      ? `${process.env.REACT_APP_SERVER_HOST_URL}/${proudctDetails.img}`
                      : "",
                  },
                  largeImage: {
                    src: proudctDetails?.img
                      ? `${process.env.REACT_APP_SERVER_HOST_URL}/${proudctDetails.img}`
                      : "",
                    width: 1000,
                    height: 320,
                  },
                }}
              />

              {/* </div> */}
            </div>
            <div className="col-12 col-lg-7 ">
              <h4>{ProductDetails?.title}</h4>
              <div className="d-flex align-items-center pb-2">
                <div className="rating flex me-2">
                  {starArray &&
                    starArray.map((count) => {
                      return <AiFillStar />;
                    })}
                  {halfStarArray &&
                    halfStarArray.map((count) => {
                      return <RiStarHalfFill />;
                    })}
                </div>
                <span>{starArray.length} Star Rating</span>
              </div>
              <div className="price-wraper pt-3">
                <p className="price d-flex align-items-center">
                  <TbCurrencyTaka />
                  {proudctDetails.price}
                </p>

                <div className="old-price-wraper d-flex align-items-center">
                  <p className="d-flex align-items-center">
                    <TbCurrencyTaka />
                    {Math.floor(
                      proudctDetails.price -
                        proudctDetails.price * (proudctDetails.discount / 100)
                    )}
                  </p>
                  <span>-{proudctDetails.discount}%</span>
                </div>
              </div>
              <div className="quantity d-flex align-items-center mt-3">
                <p>Quantity</p>
                <div className="d-flex align-items-center">
                  <span>-</span>
                  <span className="count">1</span>
                  <span>+</span>
                </div>
              </div>
              <div
                class="btn-group mt-3 d-grid  d-md-flex"
                role="group"
                aria-label="Basic mixed styles example"
              >
                <button
                  type="button"
                  class="btn btn-success my-2 my-md-0 me-md-2 me-md-3"
                >
                  <Link
                    to="/login"
                    style={{ color: "#ffffff", textDecoration: "none" }}
                  >
                    Buy Now
                  </Link>
                </button>
                <button
                  type="button"
                  class="btn btn-warning"
                  onClick={() => handleAddToCart(proudctDetails._id)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="product-full-details">
              <h5>Product details of {proudctDetails.title}</h5>
              <div>
                <ul>
                  {proudctDetails?.detailsArray &&
                    proudctDetails.detailsArray.map((info) => {
                      return (
                        <li>
                          <BiArrowToRight /> {info.property}: {info.value}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
          <div className="related-products">
            <div>
              <h5>Realated Products</h5>
            </div>
            <div className="product-container py-3">
              {allProducts.length &&
                allProducts.map((pd) => {
                  return <MainPorduct product={pd} />;
                })}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
};

export default ProductDetails;