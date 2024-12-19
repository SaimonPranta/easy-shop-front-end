import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/images/logo.png";
import { BsCart4 } from "react-icons/bs";
import { useEffect } from "react";
import { useState } from "react";
import { BiSupport } from "react-icons/bi";
import { IoCloseSharp, IoSearchSharp } from "react-icons/io5";

const Header = () => {
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  console.log("location ==>>", location);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartArray"));
    if (cart?.length) {
      setCartItems(cart);
    }
  }, []);
  const handleSearch = () => {
    navigate(`/search/${search}`);
  };
  const handleClose = () => {
    const navList = document.querySelector("#navbarTogglerDemo02")
    if (navList) {
      navList.classList.remove("show")
    }
  };

  return (
    <section className="mb-3">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="EasyShop50" className="logo" /> .
          </Link>

          {location.pathname === "/" && (
            <div className="search-container">
              <div className="search-body">
                <IoSearchSharp />
                <input
                  type="text"
                  placeholder="Search "
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
                <button onClick={handleSearch}>Search</button>
              </div>
            </div>
          )}

          <div className="header-right">
            {location.pathname !== "/" && (
              <div className="nav-item help-section mobile">
                <NavLink
                  to="/helpline"
                  className="nav-link"
                  aria-current="page"
                >
                  {" "}
                  <BiSupport /> Helpline
                </NavLink>
              </div>
            )}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div
            className="collapse navbar-collapse navbar-container"
            id="navbarTogglerDemo02"
          >
            {/* <div
            className="collapse navbar-collapse navbar-container"
            id="navbarTogglerDemo02"
          > */}
            <div className="nav-logo">
              <Link className="navbar-brand" to="/">
                <img src={logo} alt="EasyShop50" className="logo" /> .
              </Link>
              <button className="close-btn" onClick={handleClose}>
                <IoCloseSharp />
              </button>
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* <li className="nav-item help-section desktop">
                <NavLink
                  to="/helpline"
                  className="nav-link active"
                  aria-current="page"
                >
                  {" "}
                  <BiSupport /> Helpline
                </NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink to="/" className="nav-link " aria-current="page">
                  HOME
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/earn-money"
                  className="nav-link "
                  aria-current="page"
                >
                  EARN MONEY
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  PRODUCTS
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about_us"
                  className="nav-link"
                  aria-current="page"
                >
                  ABOUT US
                </NavLink>
              </li>

              <li className="nav-item menu-icons">
                <NavLink
                  to="/cart"
                  className="nav-link cart-link "
                  aria-current="page"
                >
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
