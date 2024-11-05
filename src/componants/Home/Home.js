import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import TopHeader from "../TopHeader/TopHeader";
import HotSale from "./HotSale/HotSale";
import JustForYou from "./JustForYou/JustForYou";
import Slider from "./Slider/Slider";
import DisplayAdsOne from "../../GoogleADs/DisplayAdsOne";
import DisplayAdsTwo from "../../GoogleADs/DisplayAdsTwo";
import DisplayAdsThree from "../../GoogleADs/DisplayAdsThree";
import MultiplexAdsOne from "../../GoogleADs/MultiplexAdsTwo";
import MultiplexAdsTwo from "../../GoogleADs/MultiplexAdsTwo";
import MultiplexAdsThree from "../../GoogleADs/MultiplexAdsThree";
import PostProve from "./PostProve/index";
import ECommerce from "./ECommerce/index";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState("earn-page");
  const [hotSales, setHotSales] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/product`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setAllProducts(data.data);
          const hotProductArray = data.data.filter(
            (pd) => pd.viewAs === "Hot Sales"
          );
          setHotSales(hotProductArray);
        } else {
        }
      });
  }, []);
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
      <TopHeader />

      <DisplayAdsOne />
      <MultiplexAdsOne />
      {/* <ins
        class="adsbygoogle easyshop_responsive_two"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6382147321235149"
        data-ad-slot="8350770298"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>   */}
      <Slider />
      {page !== "earn-page" && <PostProve />}
      {page === "earn-page" && <ECommerce />}

      <div id="ads_show_div">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-6382147321235149"
          data-ad-slot="6866260249"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
      <div>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-6382147321235149"
          data-ad-slot="8080103715"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>

      <div classNameName="wraper">
        <HotSale hotSales={hotSales} />
        <div>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-format="autorelaxed"
            data-ad-client="ca-pub-6382147321235149"
            data-ad-slot="8543138146"
          ></ins>
        </div>

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
        <MultiplexAdsThree />
        <DisplayAdsTwo />
        <MultiplexAdsTwo />
        {/* <div className="desktop">
          <ins
            class="adsbygoogle easyshop_Desktop_one"
            data-ad-client="ca-pub-6382147321235149"
            data-ad-slot="5586389048"
          ></ins>
        </div> */}
        {/* <Categories /> */}
        <JustForYou allProducts={allProducts} />
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
