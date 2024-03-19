import React, { useEffect, useState } from "react";
import "./Delete_slider.css";
import { getCooki } from "../../../../shared/cooki";

const Delete_slider = ({ controler }) => {
  const [slider, setSlider] = useState([]);
  const [message, setMessage] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/slider_provider`)
      .then((res) => res.json())
      .then((data) => {
        setSlider(data);
      });
  }, [controler]);

  const sliderImgDelet = (e, id) => {
    const cooki = getCooki()
    setMessage({});

    if (id) {
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/slider_img_delete?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json; charset=UTF-8",
            authorization: `Bearer ${cooki}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.sucess) {
            setMessage({});
            e.target.parentNode.parentNode.style.display = "none";
          } else {
            setMessage({ failed: data.failed });
          }
        });
    }
  };

  return (
    <section className=" delet_slider">
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
      {message.failed && <p style={{ color: "yellow" }}>{message.failed}</p>}
    </section>
  );
};

export default Delete_slider;
