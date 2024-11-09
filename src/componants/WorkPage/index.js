import React from "react";
import { useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import TopHeader from "../TopHeader/TopHeader";
import Slider from "./Slider/Slider";
import DisplayAdsOne from "../../GoogleADs/DisplayAdsOne";
import MultiplexAdsOne from "../../GoogleADs/MultiplexAdsTwo";
import PostProve from "./PostProve/index";

const Index = () => { 
 
  useEffect(() => {
    if (document.getElementById("ads_show_div")) {
      console.log("html elements", document.getElementById("ads_show_div"));
    }
    
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
      <PostProve />

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
        <Footer />
      </div>
    </div>
  );
};

export default Index;
