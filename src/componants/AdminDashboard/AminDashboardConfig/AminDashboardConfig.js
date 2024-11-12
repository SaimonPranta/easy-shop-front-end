import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { userHeader } from "../../../shared/cooki";
import { useNavigate } from "react-router-dom";
import { configContext } from "../../../App";

const AminDashboardConfig = () => {
  const [input, setInput] = useState({});
  const [config, setConfig] = useContext(configContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (config?.tutorial) {
      setInput((state) => {
        return {
          ...state,
          ...config.tutorial,
        };
      });
    }
  }, [config]);
  const handleChange = (e) => {
    let name = e.target.name;
    const value = e.target.value;
    if (name === "socialMediaLogo") {
      setInput((state) => {
        return {
          ...state,
          socialMediaLogo: e.target.files[0]
        };
      });
      return;
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
    console.log("input.socialMediaLogo ==>>", input);
    if (input.socialMediaLogo) {
      formData.append("img", input.socialMediaLogo);
    }
    formData.append("data", JSON.stringify(input));

    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/admin-dashboard/set-config`,
      {
        method: "POST",
        headers: {
          ...userHeader(),
        },
        body: formData,
      }
    )
      .then((data) => data.json())
      .then((data) => {
        if (data.data) {
          setConfig(data.data);
          navigate(-1);
        }
      });
  };

  return (
    <div className="admin-add-daily-task">
      <div className="wrap-contact2">
        <form className="contact2-form validate-form">
          <span className="contact2-form-title">Admin Dashboard Config</span>
          {/* videoID */}
          <div className="validate-input">
            <input
              className={`input2 ${input?.socialMediaTitle ? "fill" : ""}`}
              type="text"
              value={input?.socialMediaTitle || ""}
              name="socialMediaTitle"
              onChange={handleChange}
            />
            <span className="focus-input2">Social Media Title</span>
          </div>
          <div className="validate-input">
            <input
              className={`input2 ${input?.socialMediaLink ? "fill" : ""}`}
              type="text"
              value={input?.socialMediaLink || ""}
              name="socialMediaLink"
              onChange={handleChange}
            />
            <span className="focus-input2">Social Media Link</span>
          </div>
          <div className="validate-input image-section">
            <span className="focus-input2">Social Media Logo</span>
            <input
              className="input2"
              name="socialMediaLogo"
              onChange={handleChange}
              type="file"
            />
          </div>
          <div className="container-contact2-form-btn">
            <button type="submit" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AminDashboardConfig;
