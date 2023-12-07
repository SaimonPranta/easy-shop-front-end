import React from 'react';
import './ProductCardOne.css';
import {TbCurrencyTaka} from 'react-icons/tb'
import { Link } from 'react-router-dom';

const ProductCardOne = ({porduct}) => {
    return (
      <div className="porduct-one-curd">
        <Link to={`/product/${porduct._id}`}>
          <div className="card-img">
            <img
              src={
                porduct.img
                  ? `${process.env.REACT_APP_SERVER_HOST_URL}/${porduct.img}`
                  : ""
              }
              alt=""
            ></img>
            <span>{porduct.discount}%</span>
          </div>
          <div className="porduct-details">
            <h6>{porduct.title}</h6>
            <p className="price">
              <TbCurrencyTaka />
              {Math.floor(porduct.price) * 100}
            </p>
            <p className="old-price">
              <TbCurrencyTaka />
              {Math.floor(
                porduct.price - porduct.price * (porduct.discount / 100)
              )}
            </p>
          </div>
        </Link>
      </div>
    );
};

export default ProductCardOne;