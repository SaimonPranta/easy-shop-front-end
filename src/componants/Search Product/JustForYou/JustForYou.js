import React, { useState, useEffect } from "react";
import "./JustForYou.scss";
import MainPorduct from "../../SubComponents/MainPorduct/MainPorduct";
import { useParams } from "react-router-dom";

const JustForYou = ({ allProducts, loading }) => {
  const params = useParams()
  console.log("params ==>>", params)
  return (
    <div>
      <div className="just-for-you-head product-sction-titile">
        <h3>{`Search result for : "${params?.search}"`}</h3>
      </div>
      <div className="just-for-you">
        {allProducts.length &&
          allProducts.map((pd) => {
            return <MainPorduct product={pd} />;
          })}
        {loading &&
          new Array(30).fill("").map((item, index) => {
            return (
              <div className="cart-skeleton" key={index}>
                <span className="img" />
                <div className="des">
                  <span className="title" />
                  <span className="title-2" />
                  <span className="price" />
                  <span className="price-2" />
                  <span className="point" />
                  <span className="star" />
                </div>
                <div className="btn-container">
                  <span />
                  <span />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default JustForYou;
