import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import "./EditProduct.css";

const EditProduct = () => {
  const [productInfo, setProductInfo] = useState({});
  const [message, setMessage] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/product/get_product/${id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setProductInfo(data.data);
          }
        });
    }
  }, []);

  const handleInputValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const currentInfo = { ...productInfo };
    if ((name === "discount" && value > 100) || value < 0) {
      return true;
    }
    currentInfo[name] = value;
    setProductInfo(currentInfo);
  };
  const handleFileUpload = (e) => {
    const currentInfo = { ...productInfo };
    currentInfo["newImg"] = e.target.files[0];
    setProductInfo(currentInfo);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!productInfo.rating || !productInfo.viewAs) {
      productInfo["rating"] = document.getElementById("rating").value;
      productInfo["viewAs"] = document.getElementById("viewAs").value;
    }
    if (
      !productInfo.title ||
      !productInfo.dis ||
      !productInfo.price ||
      !productInfo.discount ||
      !productInfo.rating ||
      !productInfo.viewAs ||
      !productInfo.detailsArray[0].property ||
      !productInfo.detailsArray[0].value ||
      !productInfo.img
    ) {
      setMessage({ failed: "Please fill the full form." });
      setTimeout(() => {
        setMessage({});
      }, 200);
      return;
    }
    if (productInfo.newImg) {
      formData.append("newImg", productInfo.newImg);
    }
    formData.append("data", JSON.stringify(productInfo));

    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/product/update_product`, {
      method: "PATCH",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setMessage({});
        }, 200);
        if (data.data) {
            setMessage({sucess: data.data.sucess})
          navigate("/product", { replace: true });
        } else {
            setMessage({ failed: data.failed });
        }
      });
  };
  const handleProductDetails = (e, index) => {
    const name = e.target.name;
    const value = e.target.value;
    const currentInfo = { ...productInfo };

    if (!currentInfo.detailsArray[index]) {
      currentInfo.detailsArray[index] = {};
    }
    if (name == "product_type") {
      currentInfo.detailsArray[index]["property"] = value;
    } else if (name == "product_value") {
      currentInfo.detailsArray[index]["value"] = value;
    }
    setProductInfo(currentInfo);
  };
  const handleAddDetails = () => {
    const currentCount = { ...productInfo };
    currentCount.detailsArray.push({});
    setProductInfo(currentCount);
  };
  const handleProductDetailsCsoss = (index) => {
    const currentProduct = { ...productInfo };
    if (currentProduct.detailsArray && currentProduct.detailsArray[index]) {
      const filterArray = currentProduct.detailsArray.filter(
        (value, currentIndex) => {
          return index != currentIndex;
        }
      );
      currentProduct["detailsArray"] = filterArray;
      setProductInfo(currentProduct);
    }
  };

  return (
    <section className="text-white">
      <div className="balance-transfer-section m-auto">
        <h4>Edit Product</h4>
        <div>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <div>
              <label>Title</label>
              <input
                required
                type="text"
                name="title"
                placeholder="Product Title"
                value={productInfo.title ? productInfo.title : ""}
                onChange={(e) => handleInputValue(e)}
              />
            </div>
            <div>
              <label>Product Discription</label>
              <input
                required
                type="text"
                name="dis"
                placeholder="Enter Product Discription"
                value={productInfo.dis ? productInfo.dis : ""}
                onChange={(e) => handleInputValue(e)}
              />
            </div>
            <div>
              <label>Product Price</label>
              <input
                required
                type="number"
                name="price"
                placeholder="Enter Product Price"
                value={productInfo.price ? productInfo.price : ""}
                onChange={(e) => handleInputValue(e)}
              />
            </div>
            <div>
              <label>Product Discount %</label>
              <input
                required
                type="number"
                name="discount"
                placeholder="Enter Product Discount"
                value={productInfo.discount ? productInfo.discount : ""}
                onChange={(e) => handleInputValue(e)}
              />
            </div>
            <div>
              <label>Product Rating</label>
              <select
                name="rating"
                value={productInfo.rating ? productInfo.rating : "1"}
                onChange={(e) => handleInputValue(e)}
                id="rating"
              >
                <option value="1">1 start</option>
                <option value="2">2 start</option>
                <option value="3">3 start</option>
                <option value="4">4 start</option>
                <option value="5">5 start</option>
              </select>
            </div>
            <div>
              <label>Product View As</label>
              <select
                name="viewAs"
                id="viewAs"
                value={productInfo.viewAs ? productInfo.viewAs : "General"}
                onChange={(e) => handleInputValue(e)}
              >
                <option value="General">General</option>
                <option value="Hot Sales">Hot Sales</option>
              </select>
            </div>
            <div className="product-details">
              <label>Product Details</label>
              <div className="product-details-inner">
                {productInfo &&
                  productInfo.detailsArray &&
                  productInfo.detailsArray.map((value, index) => {
                    // const property = productInfo.detailsArray[index] && productInfo.detailsArray[index].property
                    return (
                      <div className="product-wrapwer">
                        <div>
                          <label>Details Type-{index + 1}</label>
                          <input
                            required
                            type="text"
                            value={
                              productInfo.detailsArray[index] &&
                              productInfo.detailsArray[index].property
                                ? productInfo.detailsArray[index].property
                                : ""
                            }
                            name="product_type"
                            placeholder="Enter Product Type"
                            onChange={(e) => handleProductDetails(e, index)}
                          />
                        </div>
                        <div>
                          <label>Details Value-{index + 1}</label>
                          <input
                            required
                            type="text"
                            value={
                              productInfo.detailsArray[index] &&
                              productInfo.detailsArray[index].value
                                ? productInfo.detailsArray[index].value
                                : ""
                            }
                            name="product_value"
                            placeholder="Enter Product Value"
                            onChange={(e) => handleProductDetails(e, index)}
                          />
                        </div>
                        {!index == 0 && (
                          <div
                            className="cross-icon"
                            onClick={() => handleProductDetailsCsoss(index)}
                          >
                            <ImCross />
                          </div>
                        )}
                      </div>
                    );
                  })}
                {productInfo &&
                  productInfo.detailsArray?.length &&
                  productInfo.detailsArray[productInfo.detailsArray.length - 1]
                    .property &&
                  productInfo.detailsArray[productInfo.detailsArray.length - 1]
                    .value && (
                    <div>
                      <button
                        type="button"
                        class="btn btn-success mt-3 d-block mx-auto"
                        onClick={handleAddDetails}
                      >
                        Add More Details
                      </button>
                    </div>
                  )}
              </div>
            </div>
            <div>
              <label>Product Images</label>
              <input
                type="file"
                accept="image/*"
                name="newImg"
                onChange={(e) => handleFileUpload(e)}
              />
            </div>

            {productInfo.img && (
              <div className="img-conainer">
                <img
                  src={
                    productInfo.newImg
                      ? URL.createObjectURL(productInfo.newImg)
                      : `${process.env.REACT_APP_SERVER_HOST_URL}/${productInfo.img}`
                  }
                  alt="img"
                />
              </div>
            )}
            <div>
              <input required type="submit" value="Submit" />
            </div>

            <div className="resposeContainer">
              {!message.failed && message.sucess && (
                <p className="sucess">{message.sucess}</p>
              )}
              {!message.sucess && message.failed && (
                <p className="text-primary">{message.failed}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
