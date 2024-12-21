import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { userHeader } from "../../../shared/cooki";
import {  useParams } from "react-router-dom";
 
import SuccessTost from "../../../shared/components/SuccessTost/SuccessTost";
import FailedTost from "../../../shared/components/FailedTost/FailedTost";

const Index = () => {
  const [input, setInput] = useState({ 
  });
 
  const { id } = useParams()

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/user/userDetails?id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          ...userHeader(),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.failed) {
        } else {
          data.password = null;
          setInput(data);
        }
      });
  }, [id]);

  const handleChange = (e) => {
    let name = e.target.name;
    const value = e.target.value;
    if (name.includes("paymentsNumbers")) {
      name = name.replace("paymentsNumbers.", "");
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
  console.log("input", input);
  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   fetch(
  //     `${process.env.REACT_APP_SERVER_HOST_URL}/admin-payments/set-config`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //         ...userHeader(),
  //       },
  //       body: JSON.stringify(input),
  //     }
  //   )
  //     .then((data) => data.json())
  //     .then((data) => {
  //       if (data.data) {
  //         setConfig(data.data);
  //         navigate("/admin/payments");
  //       }
  //     });
  // };
  const onSubmit = (e) => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/update_user`, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        ...userHeader()
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.message.sucess) {
          SuccessTost("Successfully updated user")
        }
        if (data.message.failed) {
          FailedTost("Failed to update user")

        }
        if (data.data) {
          data.data.password = null;
          setInput(data.data)
        } 
      })

  }

  return (
    <div className="admin-add-daily-task">
      <div className="wrap-contact2">
        <form className="contact2-form validate-form">
          <span className="contact2-form-title">Update User Info</span>

          <div className="validate-input">
            <input
              className={`input2 ${input.firstName ? "fill" : ""}`}
              type="text"
              value={input.firstName || ""}
              name="firstName"
              onChange={handleChange}
            />
            <span className="focus-input2">First Name</span>
          </div>
          <div className="validate-input">
            <input
              className={`input2 ${input.lastName ? "fill" : ""}`}
              type="text"
              value={input.lastName || ""}
              name="lastName"
              onChange={handleChange}
            />
            <span className="focus-input2">Last Name</span>
          </div>
          <div className="validate-input">
            <input
              className={`input2 ${input.balance ? "fill" : ""}`}
              type="text"
              value={input.balance || ""}
              name="balance"
              onChange={handleChange}
            />
            <span className="focus-input2">Main Balance</span>
          </div>
          <div className="validate-input">
            <input
              className={`input2 ${input.taskBalance ? "fill" : ""}`}
              type="text"
              value={input.taskBalance || ""}
              name="taskBalance"
              onChange={handleChange}
            />
            <span className="focus-input2">Task Balance</span>
          </div>
          <div className="validate-input">
            <input
              className={`input2 ${input.salesBalance ? "fill" : ""}`}
              type="text"
              value={input.salesBalance || ""}
              name="salesBalance"
              onChange={handleChange}
            />
            <span className="focus-input2">Sales Balance</span>
          </div>
          <div className="validate-input">
            <input
              className={`input2 ${input.pointAmount ? "fill" : ""}`}
              type="text"
              value={input.pointAmount || ""}
              name="pointAmount"
              onChange={handleChange}
            />
            <span className="focus-input2">Point Balance</span>
          </div>
          <div className="validate-input">
            <input
              className={`input2 ${input.password ? "fill" : ""}`}
              type="text"
              value={input.password || ""}
              name="password"
              onChange={handleChange}
            />
            <span className="focus-input2">Password</span>
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

export default Index;
