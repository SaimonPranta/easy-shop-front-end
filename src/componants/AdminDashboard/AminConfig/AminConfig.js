import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { userHeader } from "../../../shared/cooki";
import { useNavigate } from "react-router-dom";
import { configContext } from "../../../App";

const AdminAddDailyTask = () => {
  const [input, setInput] = useState({
    registration: {},
  });
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

    if (name.includes("registration")) {
      name = name.replace("registration.", "");
      setInput((state) => {
        return {
          ...state,
          registration: {
            ...state.registration,
            [name]: value,
          },
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

    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin-config/set-config`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      },
      body: JSON.stringify(input),
    })
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
          <span className="contact2-form-title">Admin Config</span>
          {/* videoID */}
          <div className="validate-input">
            <input
              className={`input2 ${
                input?.registration?.videoTitle ? "fill" : ""
              }`}
              type="text"
              value={input?.registration?.videoTitle || ""}
              name="registration.videoTitle"
              onChange={handleChange}
            />
            <span className="focus-input2">Registration Tutorial Title</span>
          </div>
          <div className="validate-input">
            <input
              className={`input2 ${input?.registration?.videoID ? "fill" : ""}`}
              type="text"
              value={input?.registration?.videoID || ""}
              name="registration.videoID"
              onChange={handleChange}
            />
            <span className="focus-input2">Registration Tutorial Video ID</span>
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

export default AdminAddDailyTask;
