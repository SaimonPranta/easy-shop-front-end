import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../../App";
import "./BalanceTransfer.css";
import { getCooki } from "../../../../shared/cooki";

const BalanceTransfer = () => {
  const [condition, setConditon] = useState({
    loadUser: false,
  });
  const [user, setUser] = useContext(userContext);
  const [balanceInfo, setBalanceInfo] = useState({});
  const [message, setMessage] = useState({});
  const cooki = getCooki()
  let count = 0;

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        const currentCondition = {
          loadUser: true,
        };
        setConditon(currentCondition);
      }, 2000);
    }
  }, []);

  const handleUpdateInput = (e) => {
    const currentInput = { ...balanceInfo };
    const inputFildName = e.target.name;
    const inputFildValue = e.target.value;
    if (inputFildName === "amount") {
      const floorValue = Math.floor(inputFildValue);
      currentInput[inputFildName] = floorValue;
      setBalanceInfo(currentInput);
    } else if (inputFildName === "selectUser") {
      currentInput[inputFildName] = inputFildValue;
      setBalanceInfo(currentInput);
    }

    setBalanceInfo(currentInput);
    if (user.balance <= currentInput.amount) {
      setMessage({
        failed: "The provided ammount are higher than your balance.",
      });
    } else {
      setMessage({});
    }
  };

  const balanceTransferHandle = (e) => {
    e.preventDefault();
    const requestInput = { ...balanceInfo };
    if (balanceInfo.selectUser == user.phoneNumber) {
      return setMessage({
        failed: "Sorry, you can't tranfer balance to your won account.",
      });
    }

    if (balanceInfo.selectUser && balanceInfo.amount) {
      if (
        Math.floor(balanceInfo.selectUser) &&
        Math.floor(balanceInfo.amount)
      ) {
        if (balanceInfo.amount >= 20) {
          // if (user.balance >= balanceInfo.amount) {
          setMessage({});
          fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/balance_transfer`, {
            method: "POST",
            body: JSON.stringify(balanceInfo),
            headers: {
              "content-type": "application/json; charset=UTF-8",
              authorization: `Bearer ${cooki}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.data) {
                setBalanceInfo({});
                const updatedUser = { ...data.data };
                setUser(updatedUser);
              }
              if (data.sucess) {
                setBalanceInfo({});
                setMessage({ sucess: data.sucess });
                setTimeout(() => {
                  setMessage({});
                }, 7000);
              }
              if (data.failed) {
                setBalanceInfo(requestInput);
                setMessage({ failed: data.failed });
                setTimeout(() => {
                  setMessage({});
                }, 7000);
              }
            });
          setBalanceInfo({});
        } else {
          setMessage({ failed: "Sorry, you can to tranfer lass then 20tk." });
        }
      } else {
        setMessage({ failed: "Phone Number & Amount must be number." });
      }
    } else {
      setMessage({ failed: "Please fill the form & try again" });
    }
  };

  return (
    <div className="text-white">
      <div className="balance-transfer-section m-auto">
        <h4>BALANCE TRANSFER</h4>
        <div className="account-balance">
          <p>Your Income Balance {user?.balance ? user.balance : 0} TK</p>
        </div>
        <div>
          <form onSubmit={balanceTransferHandle}>
            <div>
              <label>User Phone Number</label>
              <input
                name="selectUser"
                value={balanceInfo.selectUser ? balanceInfo.selectUser : ""}
                onChange={handleUpdateInput}
                id="select-user"
              />
            </div>
            <div>
              <label>Amount</label>
              <input
                type="text"
                name="amount"
                value={balanceInfo.amount ? balanceInfo.amount : ""}
                placeholder="amount of TK"
                onChange={handleUpdateInput}
              />
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
      </div>

      <div className="balance-transfer-history-section mt-4 m-auto">
        <h4>BALANCE TRANSFER HISTORY</h4>
        <div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Transfer Number</th>
                <th>Transfer Ammount</th>
                <th>Transfer Date</th>
              </tr>
            </thead>
            <tbody>
              {user.balanceTransperInfo &&
                user.balanceTransperInfo.map((userId, index) => {
                  count++;
                  return (
                    <tr key={index}>
                      <td>{count}</td>
                      <td>{userId.name}</td>
                      <td>{userId.number}</td>
                      <td>{userId.amount}</td>
                      <td>{userId.date}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BalanceTransfer;
