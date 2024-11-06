import React, { useState } from "react";
import Delete_slider from "./Delete_slider";
import { getCooki } from "../../../../shared/cooki";
import "./Index.scss";

const Index = () => {
  const [activeTab, setActiveTab] = useState("Work Slider");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState({});

  const handleInput = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cooki = getCooki();
    if (image && cooki) {
      setMessage({});
      const formData = new FormData();
      formData.append("image", image);
      formData.append("tab", activeTab);

      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/addSlider`, {
        method: "POST",
        body: formData,
        headers: {
          authorization: `Bearer ${cooki}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.sucess) {
            setMessage({ sucess: data.sucess });
          } else {
            setMessage({ failed: data.failed });
          }
        });
    } else {
      setMessage({ failed: "Please Select an image and try again." });
    }
  };

  return (
    <div className="admin-slider">
      <div className="header-section">
        <button
          className={activeTab === "Work Slider" ? "active" : ""}
          onClick={() => setActiveTab("Work Slider")}
        >
          Work Slider
        </button>
        <button
          className={activeTab === "E-Commerce Slider" ? "active" : ""}
          onClick={() => setActiveTab("E-Commerce Slider")}
        >
          E-Commerce Slider
        </button>
        
      </div>
      <div>
        <Delete_slider controler={message} activeTab={activeTab} />
      </div>
      <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Slider Image
          </label>
          <input
            type="file"
            className="form-control"
            name="image"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleInput}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mx-3"
          onClick={handleSubmit}
        >
          Upload
        </button>
        <div>
          {message.sucess && !message.failed ? (
            <p style={{ color: "green" }}>{message.sucess}</p>
          ) : (
            <p style={{ color: "yellow" }}>{message.failed}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Index;
