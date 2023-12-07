import React, { useContext, useState } from "react";
import { userContext } from "../../../../App";
import "./Withdraw.css";
import { getCooki } from "../../../../shared/cooki";

const Withdraw = () => {
  const [requestInfo, setRequestInfo] = useState({
    charge: 0,
    totalPendingBalance: 0,
  });
  const [message, setMessage] = useState({});
  const [user, setUser] = useContext(userContext);

  useState(() => {
    let totalPendingBalance = 0;
    const currentInput = { ...requestInfo };

    user.withdrawInfo.length &&
      user.withdrawInfo.map((items) => {
        if (!items.apporoval) {
          totalPendingBalance = totalPendingBalance + Math.floor(items.amount);
          currentInput["totalPendingBalance"] = totalPendingBalance;
          setRequestInfo(currentInput);
        }
      });
  }, [user]);

  const cooki = getCooki()

  const inputHandler = (e) => {
    const currentInput = { ...requestInfo };
    const inputFildName = e.target.name;
    const inputFildValue = e.target.value;
    if (inputFildName === "amount") {
      const floorValue = Math.floor(inputFildValue);
      const chargeValue = floorValue * (5 / 100);
      const floorBalance = Math.floor(user.balance);
      const total = chargeValue + floorValue;
      if (total <= floorBalance) {
        setMessage({});
        currentInput["charge"] = chargeValue;
        currentInput[inputFildName] = floorValue;
        setRequestInfo(currentInput);
      } else {
        setMessage({
          failed: `Sorry, you can't withdraw more then ${
            user.balance ? user.balance : 0
          }tk`,
        });
      }
    } else if (inputFildName === "number") {
      setMessage({});
      currentInput[inputFildName] = inputFildValue;
      setRequestInfo(currentInput);
    } else {
      currentInput[inputFildName] = inputFildValue;
      setRequestInfo(currentInput);
    }
    setRequestInfo(currentInput);
  };

  const withdrawFormHandler = (e) => {
    e.preventDefault();
    const providerValue = document.getElementById("porvider").value;
    const amountValue = document.getElementById("amount").value;

    const floorValue = Math.floor(amountValue);
    const chargeValue = floorValue * (5 / 100);
    const floorBalance = Math.floor(user.balance);
    const totalPendinFloorBalance = Math.floor(requestInfo.totalPendingBalance);
    const total = chargeValue + floorValue + totalPendinFloorBalance;

    if (total <= floorBalance) {
      if (!requestInfo.porvider) {
        requestInfo["porvider"] = providerValue;
      }
      if (!requestInfo.amount) {
        requestInfo["charge"] = chargeValue;
        const floorValue = Math.floor(amountValue);
        requestInfo["amount"] = floorValue;
      }

      if (Math.floor(requestInfo.amount) && Math.floor(requestInfo.number)) {
        if (requestInfo.porvider && requestInfo.amount && requestInfo.number) {
          setMessage({});
          const floorValue = Math.floor(requestInfo.amount);
          const floorBalance = Math.floor(user.balance);

          if (floorValue <= floorBalance) {
            const currentInput = { ...requestInfo };

            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/withdraw`, {
              method: "POST",
              body: JSON.stringify(requestInfo),
              headers: {
                "content-type": "application/json; charset=UTF-8",
                authorization: `Bearer ${cooki}`,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.data) {
                  const updatedUser = { ...data.data };
                  setUser(updatedUser);
                }
                if (data.sucess) {
                  setRequestInfo({});
                  setMessage({ sucess: data.sucess });
                  setTimeout(() => {
                    setMessage({});
                  }, 7000);
                }
                if (data.failed) {
                  setRequestInfo(currentInput);
                  setMessage({ failed: data.failed });
                  setTimeout(() => {
                    setMessage({});
                  }, 7000);
                }
              });
            setRequestInfo({});
          } else {
            setMessage({
              failed: `Sorry, you can't withdraw more then ${user.balance}tk`,
            });
          }
        } else {
          setMessage({ failed: "Please fill the form and try angain" });
          setTimeout(() => {
            setMessage({});
          }, 7000);
        }
      } else {
        setMessage({ failed: `Phone Number and Amount must be number` });
      }
    } else {
      setMessage({
        failed: `Sorry, you can't withdraw more then ${user.balance}tk`,
      });
    }
  };

  return (
    <div className="text-white">
      <div className="balance-transfer-section m-auto withdraw">
        <h4>WITHDRAW BALANCE</h4>
        <div className="account-balance">
          <p>Your Income Balance {user?.balance ? user.balance : 0} TK</p>
        </div>
        <div className="text-white withdraw-notice">
          <p>
            Withdraw between 100TK to 500TK and 5% charge applicable for per
            waithdraw.
          </p>
        </div>
        <div>
          <form onSubmit={withdrawFormHandler}>
            <div>
              <label>Withdraw Number</label>
              <input
                type="text"
                name="number"
                value={requestInfo.number ? requestInfo.number : ""}
                placeholder="Number"
                onChange={inputHandler}
              />
            </div>
            <div>
              <label>Select Payment Method</label>
              <select name="porvider" onChange={inputHandler} id="porvider">
                <option value="Bkash">bKash</option>
                <option value="Rocket">Rocket</option>
                <option value="Nagad">Nagad</option>
              </select>
            </div>
            <div>
              <label>Select Amount of TK</label>
              <select name="amount" onChange={inputHandler} id="amount">
                <option value="100">100TK</option>
                <option value="200">200TK</option>
                <option value="300">300TK</option>
                <option value="400">400TK</option>
                <option value="500">500TK</option>
                {/* <option value="1000">1000TK</option> */}
              </select>
            </div>
            <div>
              <input type="submit" value="Submit" />
            </div>
            <div className="resposeContainer">
              {!message.failed && message.sucess && (
                <p className="sucess">{message.sucess}</p>
              )}
              {!message.sucess && message.failed && (
                <p className="warning">{message.failed}</p>
              )}
            </div>
          </form>
        </div>
        <div className="balance-transfer-history-section m-0 p-0 mt-4 m-auto withdraw-history">
          <h4>WITHDRAW REQUEST HISTORY</h4>
          <div className="withdraw-table">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Withdraw Method</th>
                  <th>Withdraw Number</th>
                  <th>Withdraw Amount</th>
                  <th>Withdraw Date</th>
                  <th>Withdraw Status</th>
                </tr>
              </thead>
              <tbody>
                {user &&
                  user.withdrawInfo &&
                  user.withdrawInfo.map((reqInfo, index) => {
                    return (
                      <tr key={reqInfo.requestID}>
                        <td>{index + 1}</td>
                        <td>{reqInfo.porvider}</td>
                        <td>{reqInfo.number}</td>
                        <td>{reqInfo.amount}</td>
                        <td>{reqInfo.date}</td>
                        {reqInfo.apporoval ? (
                          <td className="approved">
                            <button>Approved</button>
                          </td>
                        ) : (
                          <td className="pending">
                            <button>Pending</button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
