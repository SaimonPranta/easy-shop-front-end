import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { userHeader } from "../../../shared/cooki";
import { useNavigate } from "react-router-dom";
import { configContext } from "../../../App";

const AdminAddDailyTask = () => {
  const [input, setInput] = useState({
    balances: {
      salesBalance: false,
      taskBalance: false,
    },
    transferAmounts: [], 
  });
  const [config, setConfig] = useContext(configContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (config.balanceTransfer) {
      setInput((state) => {
        return {
          ...state,
          ...config.balanceTransfer,
        };
      });
    }
  }, [config]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const balanceArray = ["salesBalance", "taskBalance"];

    console.log({
      name,
      value,
    }); 
    if (balanceArray.includes(name)) {
      return setInput((state) => {
        state.balances[name] = e.target.checked;
        return {
          ...state,
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
    if (name === "transferAmount") {
      console.log("hello")
      if (value && isNaN(value)) {
        return;
      }
      setInput((state) => {
        return {
          ...state,
          [name]: value,
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

    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/admin-balance-transfer/set-config`,
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
          navigate("/admin/withdraw");
        }
      });
  };
  const addTransferAmount = () => {
    if (
      input?.transferAmounts?.length < 0 ||
      !Number(input?.transferAmount) ||
      Number(input?.transferAmount) < 1
    ) {
      return;
    }
    setInput((state) => {
      const transferAmounts = [
        ...state.transferAmounts,
        { balance: Number(state.transferAmount) },
      ];
      return {
        ...state,
        transferAmount: "",
        transferAmounts: transferAmounts,
      };
    });
  };
  const removeWithdrawAmount = (inputIndex) => {
    setInput((state) => {
      const transferAmounts = state.transferAmounts.filter(
        (item, index) => index !== inputIndex
      );
      return {
        ...state,
        transferAmount: "",
        transferAmounts: transferAmounts,
      };
    });
  };

  return (
    <div className="admin-add-daily-task">
      <div className="wrap-contact2">
        <form className="contact2-form validate-form">
          <span className="contact2-form-title">
            Set Balance Transfer Config
          </span>

          <div className="validate-input">
            <input
              className={`input2 ${input.transferAmount ? "fill" : ""}`}
              type="text"
              value={input.transferAmount || ""}
              name="transferAmount"
              onChange={handleChange}
            />
            <span className="focus-input2">Set Transfer Amount</span>
            <button
              className={`enter-btn ${input.transferAmount ? "fill" : ""}`}
              type="button"
              onClick={addTransferAmount}
            >
              Enter
            </button>
          </div>
          {input?.transferAmounts?.length > 0 && (
            <div className="selected-withdraw-amounts ">
              <ul>
                {input.transferAmounts.map((item, index) => {
                  return (
                    <li key={index}>
                      {item.balance}TK{" "}
                      <button
                        onClick={() => removeWithdrawAmount(index)}
                        type="button"
                      >
                        x
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <div className="validate-input auto-approve">
            <span className="focus-input2">Sales Balance</span>
            <input
              className="input2"
              checked={input?.balances?.salesBalance || false}
              name="salesBalance"
              onChange={handleChange}
              type="checkbox"
            />
          </div>
          <div className="validate-input auto-approve">
            <span className="focus-input2">Task Balance</span>
            <input
              className="input2"
              checked={input?.balances?.taskBalance || false}
              name="taskBalance"
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
