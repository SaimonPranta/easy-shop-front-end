import React, {  useEffect, useState } from "react";
import "./style.scss";
import { userHeader } from "../../../shared/cooki"; 
import {   useNavigate, useParams } from "react-router-dom";
import getImageUrl from "../../../shared/functions/getImageUrl";
 

const AdminAddDailyTask = () => {
  const [input, setInput] = useState({});
  const [condition, setCondition] = useState({ btnLoading: false }); 
  const { userID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/admin-profile/get-ranks?userID=${userID}`,
      {
        headers: {
          ...userHeader(),
        },
      }
    )
      .then((data) => data.json())
      .then(({ data }) => { 
        if (data?._id) {
          setInput({
            ...data,
          });
        }
      });
  }, []); 

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "img") {
      return setInput((state) => {
        return {
          ...state,
          imageUpdate: true,
          [name]: e.target.files[0],
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
 
    formData.append("img", input.img);
    formData.append("data", JSON.stringify(input));
    setCondition((state) => {
      return {
        ...state,
        btnLoading: true,
      };
    });
    let endPoint = `/admin-profile/set-ranks/${userID}`;

    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}${endPoint}`, {
      method: "POST",
      body: formData,
      headers: {
        ...userHeader(),
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("data ===>>>", data);
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
 
  return (
    <div className="admin-add-daily-task">
      <div className="wrap-contact2">
        <form className="contact2-form validate-form">
          <span className="contact2-form-title">Set Ranks</span>
          <div className="validate-input">
            <input
              className={`input2 ${input.name ? "fill" : ""}`}
              type="text"
              value={input.name || ""}
              name="name"
              onChange={handleChange}
            />
            <span className="focus-input2">NAME</span>
          </div>
          <div className="validate-input">
            <input
              className={`input2 ${input.accountNumber ? "fill" : ""}`}
              type="text"
              value={input.accountNumber || ""}
              name="accountNumber"
              onChange={handleChange}
            />
            <span className="focus-input2">ACCOUNT NUMBER</span>
          </div>
          <div className="validate-input">
            <input
              className={`input2 ${input.rank ? "fill" : ""}`}
              type="text"
              value={input.rank || ""}
              name="rank"
              onChange={handleChange}
            />
            <span className="focus-input2">RANK</span>
          </div>
          <div className="validate-input">
            <input
              className={`input2 ${input.mobileNumber ? "fill" : ""}`}
              type="text"
              value={input.mobileNumber || ""}
              name="mobileNumber"
              onChange={handleChange}
            />
            <span className="focus-input2">MOBILE NUMBER</span>
          </div>
          <div className="validate-input">
            <input
              className={`input2 ${input.district ? "fill" : ""}`}
              type="text"
              value={input.district || ""}
              name="district"
              onChange={handleChange}
            />
            <span className="focus-input2">DISTRICT</span>
          </div>
          <div className="validate-input">
            <input
              className={`input2 ${input.thana ? "fill" : ""}`}
              type="text"
              value={input.thana || ""}
              name="thana"
              onChange={handleChange}
            />
            <span className="focus-input2">THANA</span>
          </div>

          <div className="validate-input image-section">
            <span className="focus-input2">UPLOAD PROFILE PICTURE</span>
            <input
              className="input2"
              name="img"
              onChange={handleChange}
              type="file"
            />
          </div>
          {(input.profilePicture || input.img) && (
            <div className="validate-input image-view-section">
              <div className="grid-section">
                <div className="cart"> 
                  <img src={input.img ? URL.createObjectURL(input.img) : getImageUrl(input.profilePicture)} alt="" />
                </div>
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

export default AdminAddDailyTask;
