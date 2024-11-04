import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { userHeader } from "../../../shared/cooki";
import { useNavigate } from "react-router-dom";
import { configContext } from "../../../App";

const AdminAddDailyTask = () => {
  const [input, setInput] = useState({
    postAutoApprove: true,
  });
  const [config, setConfig] = useContext(configContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (config.provePost) {
      setInput((state) => {
        return {
          ...state,
          ...config.provePost,
        };
      });
    }
  }, [config]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "postAutoApprove") {
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

    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin-prove/set-config`, {
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
          <span className="contact2-form-title">Set Prove Post Config</span>

          <div className="validate-input auto-approve">
            <span className="focus-input2">Post Auto Approve</span>
            <input
              className="input2"
              checked={input?.postAutoApprove || false}
              name="postAutoApprove"
              onChange={handleChange}
              type="checkbox"
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

export default AdminAddDailyTask;
