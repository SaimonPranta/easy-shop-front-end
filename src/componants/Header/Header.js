import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/images/logo.png';
import { BsCart4 } from 'react-icons/bs';
import { useEffect } from 'react';
import { useState } from 'react';
import { BiSupport } from 'react-icons/bi';


const Header = () => {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cartArray"))
        if (cart?.length) {
            setCartItems(cart)
        }
    }, [])


    return (
        <section className='mb-3'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src={logo} alt="EasyShop50" className='logo' /> .</Link>


                    <div className='header-right'>
                        <div className="nav-item help-section mobile">
                            <NavLink to="/helpline" className="nav-link active" aria-current="page" > <BiSupport /> Helpline</NavLink>
                        </div>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>

                    <div className="collapse navbar-collapse navbar-container" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li className="nav-item help-section desktop">
                                <NavLink to="/helpline" className="nav-link active" aria-current="page" > <BiSupport /> Helpline</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link active" aria-current="page" >HOME</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" aria-current="page" >PRODUCTS</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about_us" className="nav-link active" aria-current="page" >ABOUT US</NavLink>
                            </li>

                            <li className="nav-item menu-icons">
                                <NavLink to="/cart" className="nav-link active" aria-current="page" >
                                    <BsCart4 />
                                    <span>{cartItems?.length && cartItems.length}</span>

                                </NavLink>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </section>
    );
};

export default Header;