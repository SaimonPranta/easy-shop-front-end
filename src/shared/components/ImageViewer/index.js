import React, { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { imageContext } from "../../../App";

const Index = () => {
  const { viewImage, setViewImage } = useContext(imageContext);
  const [imgIndex, setImgIndex] = useState(0);
  const [imageList, setImageList] = useState([]);
  const handleImageClose = () => {
    setViewImage([]);
  };
  useEffect(() => {
    if (viewImage) {
      if (typeof viewImage === "string") {
        let finalImg = viewImage;
        if (!finalImg.includes(process.env.REACT_APP_SERVER_HOST_URL)) {
          finalImg = `${process.env.REACT_APP_SERVER_HOST_URL}/${viewImage}`;
        }
        setImageList([finalImg]);
      } else if (Array.isArray(viewImage)) {
        let finalImgList = viewImage.map((img) => {
          let finalImg = img;
          if (!img.includes(process.env.REACT_APP_SERVER_HOST_URL)) {
            finalImg = `${process.env.REACT_APP_SERVER_HOST_URL}/${img}`;
          }
          return finalImg;
        });
        setImageList([...finalImgList]);
      }
    }
    setImgIndex(0)
  }, [viewImage]);
  if (!imageList || !imageList.length) {
    return <></>;
  }

  return (
    <div className="image-viewer">
      <div className="inner-container">
        <button className="close-btn" onClick={handleImageClose}>
          <IoClose />
        </button>
        <img className="view-img" src={imageList[imgIndex]} alt="" />
        <div className="img-list">
          {imageList.map((img, index) => {
            return (
              <button
                className={imgIndex === index ? "active" : ""}
                onClick={() => setImgIndex(index)}
              >
                <img src={img} alt="" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
