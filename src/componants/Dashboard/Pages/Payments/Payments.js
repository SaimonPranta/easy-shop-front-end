import React, { useContext, useEffect, useRef, useState } from "react";
import { configContext, userContext } from "../../../../App";
import "./styles.scss";
import { userHeader } from "../../../../shared/cooki";
import bkash from "../../../../assets/images/bank_icon/bkash.png";
import roket from "../../../../assets/images/bank_icon/roket.png";
import upai from "../../../../assets/images/bank_icon/upai.png";
import nogod from "../../../../assets/images/bank_icon/nogod.png";
import { useNavigate } from "react-router-dom";
import SuccessTost from "../../../../shared/components/SuccessTost/SuccessTost";
import FailedTost from "../../../../shared/components/FailedTost/FailedTost";
import { ToastContainer } from "react-toastify";
import { IoMdCopy } from "react-icons/io";

const paymentNumberArray = [
  {
    title: "বিকাশ",
    property: "bkashNumber",
    label: "Bkash",
    bg: "#D02253",
    img: bkash,
  },
  {
    title: "নগদ",
    property: "nagadNumber",
    label: "Nagad",
    bg: "#F6941C",
    img: nogod,
  },
  {
    title: "রকেট",
    property: "rocketNumber",
    label: "Rocket",
    bg: "#8F3893",
    img: roket,
  },
  // {
  //   title: "উপায়",
  //   property: "upay",
  //   label: "Upay",
  //   bg: "#FED602",
  //   img: upai,
  // },
];
const paymentArray = [
  {
    title: "বিকাশ",
    property: "bikash",
    label: "Bkash",
    bg: "#D02253",
    img: bkash,
  },
  {
    title: "নগদ",
    property: "nagad",
    label: "Nagad",
    bg: "#F6941C",
    img: nogod,
  },
  {
    title: "রকেট",
    property: "rocket",
    label: "Rocket",
    bg: "#8F3893",
    img: roket,
  },
  // {
  //   title: "উপায়",
  //   property: "upay",
  //   label: "Upay",
  //   bg: "#FED602",
  //   img: upai,
  // },
];

const Withdraw = () => {
  const [input, setInput] = useState({});
  const [page, setPage] = useState(1);
  const [filterInput, setFilterInput] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [tableItems, setTableItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastBalance, setLastBalance] = useState({
    mainBalance: 0,
    salesBalance: 0,
    taskBalance: 0,
  });
  const [searchBalance, setSearchBalance] = useState({
    pendingBalance: 0,
    approveBalance: 0,
    totalBalance: 0,
  });
  const [config] = useContext(configContext);
  const [user] = useContext(userContext);

  const debounceState = useRef();
  const navigate = useNavigate();
  // const [user, setUser] = useContext(userContext);

  const resetTimeout = () => {
    if (debounceState.current) {
      clearTimeout(debounceState.current);
    }
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/withdraw/last-balance`, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setLastBalance(data.data);
        }
      });
  }, []);

  useEffect(() => {
    resetTimeout();
    debounceState.current = setTimeout(() => {
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/payments/get-list?page=${page}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json; charset=UTF-8",
            ...userHeader(),
          },
          body: JSON.stringify(filterInput),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            if (page === 1) {
              setTableItems((state) => {
                return [...data.data];
              });
            } else {
              setTableItems((state) => {
                return [...state, ...data.data];
              });
            }
          } else {
            setTableItems([]);
          }
          if (data.page) {
            setCurrentPage(Number(data.page) - 1);
          }
          if (data.total) {
            setTotal(data.total);
          }
          setSearchBalance({
            pendingBalance: data.pendingBalance || 0,
            approveBalance: data.approveBalance || 0,
            totalBalance: data.totalBalance || 0,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }, 3000);

    return () => {
      resetTimeout();
    };
  }, [page, filterInput.searchSubmit]);

  const handleScroll = () => {
    console.log("Call scroll", {
      currentPage,
      page,
      currentLength: tableItems.length,
      total,
    });
    if (loading) {
      return;
    }
    if (total && total <= tableItems.length) {
      return;
    }
    const container = document.getElementById("table-list");
    const scrollTop = container?.scrollTop || 0;
    const offsetHeight = container?.offsetHeight || 0;
    const scrollHeight = container?.scrollHeight || 0;

    if (scrollHeight <= Number(scrollTop + offsetHeight) + 1) {
      if (currentPage === page - 1) {
        setPage((state) => state + 1);
        setLoading(true);
      }
    }
  };
 
  const paymentsFormHandler = async (e) => {
    e.preventDefault(); 

    if (
      user.isActive ||
      !input.paymentMethod ||
      !input.paymentNumber ||
      !input.transitionNumber ||
      !input.amount ||
      !input.img
    ) {
      return;
    }
    const formData = new FormData();
    formData.append("img", input.img);
    formData.append("data", JSON.stringify(input));

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/payments`,
        {
          method: "POST",
          body: formData,
          headers: {
            ...userHeader(),
          },
        }
      );
      const data = await res.json();
      if (data.data) {
        SuccessTost("Payment request has been submitted successfully");
        setTableItems((state) => {
          return [data.data, ...state];
        });
        setInput({});
      } else {
        FailedTost(data.message || "Withdraw request failed");
      }

      setLoading(false);
    } catch (error) {
      FailedTost(error.message || "Withdraw request failed");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (user.isActive) {
      return;
    }
    if (name === "amount") {
      if (value && isNaN(value)) {
        return;
      }
    }
    if (name === "img") {
      const file = e.target.files[0];
      setInput((state) => {
        return {
          ...state,
          [name]: file,
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

  const handleNumberCopy = (number) => {
    navigator.clipboard.writeText(number);
    SuccessTost("Copied");
  };
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="payments-page">
      <div className="inner-section">
        <h4 className="dashboard-title">Payments</h4>
        <div className="back-btn-section">
          <button onClick={goBack}>Back</button>
        </div>
        {config?.payment?.paymentNotice && (
          <div className="payments-notice">
            <p>{config?.payment?.paymentNotice}</p>
          </div>
        )}
        <div className="form-container">
          <div className="select-section">
            <div className="grid-section">
              {paymentNumberArray.map((item, index) => {
                let number = config?.payment?.paymentsNumbers[item.property];
                if (!number) {
                  return <></>;
                }
                return (
                  <div className="item payment" key={index}>
                    <div
                      className={`top ${
                        item.label === input.provider ? "active" : ""
                      }`}
                    >
                      <img src={item.img} alt="" />
                      <strong style={{ background: item.bg }}>
                        {item.title}
                      </strong>
                      <div className="number-section">
                        <p>{number}</p>
                        <button onClick={() => handleNumberCopy(number)}>
                          <IoMdCopy />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {config?.payment?.paymentFormNotice && (
            <div className="payments-notice form-head">
              <p>{config?.payment?.paymentFormNotice}</p>
            </div>
          )}
          <div className="input-section-container">
            <div className="input-section">
              <label>আপনি কোন মাধ্যমে টাকা পাঠিয়েছেন সেটি সিলেক্ট করুন</label>
              <select name="paymentMethod" onChange={handleInputChange}>
                <option hidden>-- Select Payment Method --</option>
                {paymentArray.map((item, index) => {
                  return <option>{item.label}</option>;
                })}
              </select>
            </div>
            <div className="input-section">
              <label>বিকাশ এর কোন নম্বর থেকে টাকা পাঠিয়েছেন?</label>
              <input
                type="text"
                name="paymentNumber"
                value={input.paymentNumber || ""}
                placeholder="বিকাশ এর যে নম্বর থেকে টাকা পাঠিয়েছেন সেই নম্বরটি লিখুন..."
                onChange={handleInputChange}
              />
            </div>

            <div className="input-section">
              <label>বিকাশ সেন্ডমানি এর ট্রানজেকশন নম্বরটি কত?</label>
              <input
                type="text"
                name="transitionNumber"
                value={input.transitionNumber || ""}
                placeholder="বিকাশ-সেন্ডমানি এর ট্রানজেকশন নম্বরটি লিখুন..."
                onChange={handleInputChange}
              />
            </div>
            <div className="input-section">
              <label>কত টাকা সেন্ডমানি করেছেন?</label>
              <input
                type="text"
                name="amount"
                value={input.amount || ""}
                placeholder="এমাউন্ট লিখুন..."
                onChange={handleInputChange}
              />
            </div>
            <div className="input-section">
              <label>বিকাশ- সেন্ডমানি সাকসেসফুল এর স্ক্রীনশট আপলোড দেন</label>
              <input
                type="file"
                name="img"
                placeholder="এমাউন্ট লিখুন..."
                onChange={handleInputChange}
              />
            </div>
            <div className="submit-section">
              <button onClick={paymentsFormHandler} disabled={loading}>
                Submit 
              </button>
            </div>
          </div>
        </div>
        <div className="common-table-section">
          <h4 className="table-title">Payments History</h4>

          <div
            className="table-section"
            id="table-list"
            onScroll={handleScroll}
          >
            <table>
              <thead>
                <tr>
                  <th className="small">#</th>
                  <th> Method</th>
                  <th> Number</th>
                  <th>Amount</th>
                  <th>Transaction Number</th>
                  {/* <th>Date</th> */}
                  <th>Status</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {tableItems?.length > 0 &&
                  tableItems.map((reqInfo, index) => {
                    return (
                      <tr key={reqInfo._id}>
                        <td className="small">{index + 1}</td>
                        <td>{reqInfo?.payments?.paymentMethod}</td>
                        <td>{reqInfo?.payments?.paymentNumber}</td>
                        <td>৳{reqInfo?.amount}</td>
                        <td>{reqInfo?.payments?.transitionNumber}</td>
                        {/* <td className="date">
                          {dateToString(reqInfo.createdAt)}
                        </td> */}
                        <td>{reqInfo?.status}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Withdraw;
