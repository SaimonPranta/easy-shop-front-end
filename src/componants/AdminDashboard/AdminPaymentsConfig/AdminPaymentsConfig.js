import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { userHeader } from "../../../shared/cooki";
import { useNavigate } from "react-router-dom";
import { configContext } from "../../../App";

const AdminPaymentsConfig = () => {
  const [input, setInput] = useState({
    paymentsNumbers: {},
  });
  const [config, setConfig] = useContext(configContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (config.payment) {
      setInput((state) => {
        return {
          ...state,
          ...config.payment,
        };
      });
    }
  }, [config]);

  const handleChange = (e) => {
    let name = e.target.name;
    const value = e.target.value;
    if (name.includes("paymentsNumbers")) {
      name = name.replace("paymentsNumbers.", "")
      setInput((state) => {
        return {
          ...state,
          paymentsNumbers: {
            ...state.paymentsNumbers,
            [name]: value,
          },
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
console.log("input", input)
  const onSubmit = (e) => {
    e.preventDefault();

    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/admin-payments/set-config`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          ...userHeader(),
        },
        body: JSON.stringify(input),
      }
    )
      .then((data) => data.json())
      .then((data) => {
        if (data.data) {
          setConfig(data.data);
          navigate("/admin/payments");
        }
      });
  };

  return (
    <div className="admin-add-daily-task">
      <div className="wrap-contact2">
        <form className="contact2-form validate-form">
          <span className="contact2-form-title">Set Payments Config</span>

          <div className="validate-input">
            <input
              className={`input2 ${input.paymentNotice ? "fill" : ""}`}
              type="text"
              value={input.paymentNotice || ""}
              name="paymentNotice"
              onChange={handleChange}
            />
            <span className="focus-input2">Payment Notice</span>
          </div>
          <div className="validate-input">
            <input
              className={`input2 ${input.paymentFormNotice ? "fill" : ""}`}
              type="text"
              value={input.paymentFormNotice || ""}
              name="paymentFormNotice"
              onChange={handleChange}
            />
            <span className="focus-input2">Payment Form Notice</span>
          </div>
          <div className="validate-input">
            <input
              className={`input2 ${
                input.paymentsNumbers?.bkashNumber ? "fill" : ""
              }`}
              type="text"
              value={input?.paymentsNumbers?.bkashNumber || ""}
              name="paymentsNumbers.bkashNumber"
              onChange={handleChange}
            />
            <span className="focus-input2">Bikash Payment Number</span>
          </div>
          <div className="validate-input">
            <input
              className={`input2 ${
                input?.paymentsNumbers?.nagadNumber ? "fill" : ""
              }`}
              type="text"
              value={input?.paymentsNumbers?.nagadNumber || ""}
              name="paymentsNumbers.nagadNumber"
              onChange={handleChange}
            />
            <span className="focus-input2">Nagad Payment Number</span>
          </div>
          <div className="validate-input">
            <input
              className={`input2 ${
                input?.paymentsNumbers?.rocketNumber ? "fill" : ""
              }`}
              type="text"
              value={input?.paymentsNumbers?.rocketNumber || ""}
              name="paymentsNumbers.rocketNumber"
              onChange={handleChange}
            />
            <span className="focus-input2">Rocket Payment Number</span>
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

export default AdminPaymentsConfig;
