import React from "react";
import "./HotSale.scss";
import ProductCardOne from "../../SubComponents/ProductCardOne/ProductCardOne";


const HotSale = ({ hotSales, loading }) => {
  return (
    <div className="hot-sale">
      <div className="product-sction-titile">
        <h3>Hot Sales</h3>
      </div>
      <div className="hot-sale-cart-container">
        {hotSales.length > 0 &&
          hotSales.slice(hotSales.length - 5, hotSales.length).map((pd) => {
            return <ProductCardOne porduct={pd} />;
          })}
        {loading &&
          new Array(6).fill("").map((item, index) => {
            return (
              <div className="cart-skeleton" key={index}>
                <span className="img" />
                <div className="des">
                  <span className="title" />
                  <span className="title-2" />
                  <span className="price" />
                  <span className="price-2" /> 
                </div> 
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HotSale;
