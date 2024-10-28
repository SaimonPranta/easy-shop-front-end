import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { imageContext } from "../../../App";

const Index = () => {
  const {viewImage, setViewImage} = useContext(imageContext);
  const handleImageClose = () => {
    setViewImage("");
  };

  if (!viewImage) {
    return <></>;
  }
  
  return (
    <div className="image-viewer">
      <div className="inner-container">
        <button onClick={handleImageClose}>
          <IoClose />
        </button>
        <img src={viewImage} alt="" />
      </div>
    </div>
  );
};

export default Index;
