import React, { useEffect, useState } from "react";
import "./Delete_slider.css";
import { userHeader } from "../../../../shared/cooki";
import { ToastContainer } from "react-toastify";
import SuccessTost from "../../../../shared/components/SuccessTost/SuccessTost";
import FailedTost from "../../../../shared/components/FailedTost/FailedTost";

const Delete_slider = ({ controler, activeTab }) => {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/slider_provider?tab=${activeTab}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSlider(data);
      });
  }, [controler, activeTab]);

  const sliderImgDelet = (e, id) => {
    if (id) {
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/slider_img_delete?id=${id}&tab=${activeTab}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json; charset=UTF-8",
            ...userHeader(),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) { 
            SuccessTost(data.success || "");
            e.target.parentNode.parentNode.style.display = "none";
          } else {
            FailedTost(data.failed || "");
          }
        });
    }
  };

  return (
    <section className="delet_slider">
      {slider?.length > 0 &&
        slider.map((image, index) => {
          return (
            <div key={index}>
              <img
                className="d-block w-100"
                src={`${process.env.REACT_APP_SERVER_HOST_URL}/${image.img}`}
                alt={"slider" + index}
              />
              <div className="btn-group">
                <button
                  className="btn btn-primary active"
                  aria-current="page"
                  onClick={(e) => sliderImgDelet(e, image._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      <ToastContainer />
    </section>
  );
};

export default Delete_slider;
