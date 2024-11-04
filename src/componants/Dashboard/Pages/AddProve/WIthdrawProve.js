import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { userHeader } from "../../../../shared/cooki";
import getImageUrl from "../../../../shared/functions/getImageUrl";

const WithdrawProve = () => {
  const [input, setInput] = useState({ images: [], removeImages: [] });
  const [condition, setCondition] = useState({ btnLoading: false });
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postID = queryParams.get("postID");

  console.log("input ==>>", input);
  useEffect(() => {
    if (postID) {
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/prove/get-post-details?postID=${postID}`,
        {
          method: "GET",
          headers: {
            ...userHeader(),
          },
        }
      )
        .then((data) => data.json())
        .then((data) => {
          if (data.data) {
            setInput((state) => {
              return {
                ...state,
                ...data.data,
              };
            });
          }
        });
    }
  }, [postID]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "img") {
      return setInput((state) => {
        return {
          ...state,
          images: [...state.images, e.target.files[0]],
        };
      });
    }
    if (name === "autoApprove") {
      return setInput((state) => {
        return {
          ...state,
          [name]: e.target.checked,
        };
      });
    }

    setInput((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (input?.images?.length) {
      input.images.forEach((img, index) => {
        if (typeof img !== "string") {
          formData.append(`img-${index + 1}`, img);
        }
      });
    }
    formData.append("data", JSON.stringify(input));
    setCondition((state) => {
      return {
        ...state,
        btnLoading: true,
      };
    });
    let endPoint = "add-prove"
    if (input._id) {
     endPoint = "edit-prove"
      
    }

    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/prove/${endPoint}`, {
      method: "POST",
      body: formData,
      headers: {
        ...userHeader(),
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.data) {
          navigate(-1);
          setInput({});
        }
      })
      .finally(() => {
        setCondition((state) => {
          return {
            ...state,
            btnLoading: false,
          };
        });
      });
  };
  const handleImgRemove = (index) => {
    setInput((state) => {
      const images = state.images.filter((item, i) => i !== index);
      const imgInfo = state.images.find((item, i) => i === index);

      let removeImages = [...state.removeImages];
      if (typeof imgInfo === "string") {
        removeImages.push(imgInfo);
      }

      state.images.filter((item, i) => i !== index);
      return {
        ...state,
        images: images,
        removeImages: removeImages,
      };
    });
  };

  return (
    <div className="admin-add-daily-task">
      <div className="wrap-contact2">
        <form className="contact2-form validate-form">
          <span className="contact2-form-title">Add Prove</span>
          <div className="validate-input">
            <input
              className={`input2 ${input.description ? "fill" : ""}`}
              type="text"
              value={input.description || ""}
              name="description"
              onChange={handleChange}
            />
            <span className="focus-input2">Description</span>
          </div>

          <div className="validate-input image-section">
            <span className="focus-input2">UPLOAD SCREEN SHORT</span>
            <input
              className="input2"
              name="img"
              value=""
              onChange={handleChange}
              type="file"
            />
          </div>
          {input?.images?.length > 0 && (
            <div className="validate-input image-view-section">
              <div className="grid-section">
                {input.images.map((item, index) => {
                  let imgUrl = "";
                  if (typeof item === "string") {
                    imgUrl = getImageUrl(item);
                  } else {
                    imgUrl = URL.createObjectURL(item);
                  }
                  return (
                    <div className="cart" key={index}>
                      <img src={imgUrl} alt="" />
                      <button
                        type="button"
                        onClick={() => handleImgRemove(index)}
                      >
                        x
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="container-contact2-form-btn">
            <button
              type="submit"
              disabled={condition?.btnLoading}
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
       
    </div>
  );
};

export default WithdrawProve;
