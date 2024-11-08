import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import TopHeader from "../TopHeader/TopHeader";
import HotSale from "./HotSale/HotSale";
import JustForYou from "./JustForYou/JustForYou";
import DisplayAdsOne from "../../GoogleADs/DisplayAdsOne";
import DisplayAdsTwo from "../../GoogleADs/DisplayAdsTwo";
import MultiplexAdsOne from "../../GoogleADs/MultiplexAdsTwo";
import MultiplexAdsTwo from "../../GoogleADs/MultiplexAdsTwo";
import MultiplexAdsThree from "../../GoogleADs/MultiplexAdsThree";
import ECommerce from "./ECommerce/index";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hotProductLoading, setHotProductLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("params?.search ==>", params?.search)
    if (!params?.search) {
      navigate("/");
    }
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/product?search=${
        params?.search || ""
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setAllProducts(data.data);
        } else {
        }
      })
      .finally(() => {
        setLoading(false);
        setHotProductLoading(false);
      });
  }, [params?.search]);
  useEffect(() => {
    if (document.getElementById("ads_show_div")) {
      console.log("html elements", document.getElementById("ads_show_div"));
    }
    // if (document.getElementById("ads_show_div")) {
    //   document
    //     .getElementById("ads_show_div")
    //     .insertAdjacentHTML("ads_shower", "<div id='sign-in-button'></div>");
    // }
  }, []);

  return (
    <div>
      <Header />

      <div classNameName="wraper">
        <div classNameName="mobile gird-2">
          <div>
            <ins
              className="adsbygoogle easyshop_mobile_one_h200_w170"
              data-ad-client="ca-pub-6382147321235149"
              data-ad-slot="1485144898"
            ></ins>
          </div>
          <div>
            <ins
              className="adsbygoogle easyshop_mobile_two_h200_w170"
              data-ad-client="ca-pub-6382147321235149"
              data-ad-slot="2672467001"
            ></ins>
          </div>
        </div>
        <JustForYou allProducts={allProducts} loading={loading} />
        <div classNameName="mobile gird-2">
          <div>
            <ins
              class="adsbygoogle easyshop_mobile_three_h200_w170"
              data-ad-client="ca-pub-6382147321235149"
              data-ad-slot="6162756505"
            ></ins>
          </div>

          <div>
            <ins
              class="adsbygoogle easyshop_mobile_four_h200_w170"
              data-ad-client="ca-pub-6382147321235149"
              data-ad-slot="5570077174"
            ></ins>
          </div>
        </div>
        <div className="desktop">
          <ins
            class="adsbygoogle easyshop_Desktop_two"
            data-ad-client="ca-pub-6382147321235149"
            data-ad-slot="9883343812"
          ></ins>
        </div>
        <div>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-format="fluid"
            data-ad-layout-key="-gw-3+1f-3d+2z"
            data-ad-client="ca-pub-6382147321235149"
            data-ad-slot="6678542075"
          ></ins>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
