import React, { useState, useEffect } from "react";
import "./JustForYou.scss";
import MainPorduct from "../../SubComponents/MainPorduct/MainPorduct";

const JustForYou = ({ allProducts, loading }) => {
  return (
    <div className="just-for-you-container">
      <div className="just-for-you-head product-sction-titile">
        <h3>Just For You</h3>
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
