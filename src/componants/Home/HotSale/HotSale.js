import React from 'react';
import './HotSale.css';
import ProductCardOne from '../../SubComponents/ProductCardOne/ProductCardOne';
import { Link } from 'react-router-dom';

const HotSale = ({ hotSales }) => {

    return (
        <div className='hot-sale'>
            <div className='product-sction-titile'>
                <h3>Hot Sales</h3>
            </div>
            <div className='hot-sale-cart-container'>
                {
                    hotSales.length && hotSales.slice((hotSales.length - 5), (hotSales.length)).map(pd => {
                        return <ProductCardOne porduct={pd} />
                    })
                }
            </div>
        </div>
    );
};

export default HotSale;