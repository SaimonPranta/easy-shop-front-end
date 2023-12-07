import React, { useState, useEffect } from 'react';
import './JustForYou.css';
import product from '../../../assets/DB/products.json';
import MainPorduct from '../../SubComponents/MainPorduct/MainPorduct';

const JustForYou = ({allProducts}) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(product)
    }, [])



    return (
        <div>
            <div className='just-for-you-head product-sction-titile'>
                <h3>Just For You</h3>
            </div>
            <div className='just-for-you'>
                {
                    allProducts.length && allProducts.map( pd => {
                        return <MainPorduct product={pd} />
                    })
                }
            </div>
        </div>
    );
};

export default JustForYou;