import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../../App";
import "./styles.scss";
import { ToastContainer } from "react-toastify";
import SuccessTost from "../../../../shared/components/SuccessTost/SuccessTost";
import FailedTost from "../../../../shared/components/FailedTost/FailedTost";

import { userHeader } from "../../../../shared/cooki";

const Withdraw = () => {
  const [input, setInput] = useState({});
  const [tutorial, setTutorial] = useState([]);
  const [condition, setCondition] = useState({
    btnLoading: false,
  });
  const [user, setUser] = useContext(userContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/tutorial`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data ===>>", data);
        if (data.data) {
          console.log("Hello form if =========");
          setTutorial(data.data);
        }
      });
  }, []);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setCondition((state) => {
      return {
        ...state,
        btnLoading: true,
      };
    });
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/admin-tutorial/set-config`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          ...userHeader(),
        },
        body: JSON.stringify(input),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        if (data.data) {
          console.log("Hello form if =========");
          setTutorial((state) => {
            return [data.data, ...state];
          });
          setInput({})
          SuccessTost(data.message || "Video Tutorial add successfully");
        } else {
          FailedTost(data.message || "Failed to add tutorial");
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
  const deleteItem = (id) => {
    setCondition((state) => {
      return {
        ...state,
        btnLoading: true,
      };
    });
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/admin-tutorial/delete?id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          ...userHeader(),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        if (data.data) {
          console.log("Hello form if =========");
          setTutorial((state) => {
            const updateState = state.filter((item) => item._id !== id);
            return [...updateState];
          });
          SuccessTost(data.message || "Video Tutorial deleted successfully");
        } else {
          FailedTost(data.message || "Failed to delete tutorial");
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
  console.log(" ============>>", tutorial);
  return (
    <div className="tutorial-page">
      <div className="inner-section">
        <h4 className="dashboard-title">Work Tutorial</h4>
        {user.role === "admin" && (
          <div className="admin-section">
            <div className="wrap-contact2">
              <form className="contact2-form validate-form">
                <span className="contact2-form-title">Add Tutorial</span>
                <div className="validate-input">
                  <input
                    className={`input2 ${input.title ? "fill" : ""}`}
                    type="text"
                    value={input.title || ""}
                    name="title"
                    onChange={handleChange}
                  />
                  <span className="focus-input2">Video Title</span>
                </div>
                <div className="validate-input">
                  <input
                    className={`input2 ${input.videoID ? "fill" : ""}`}
                    type="text"
                    value={input.videoID || ""}
                    name="videoID"
                    onChange={handleChange}
                  />
                  <span className="focus-input2">Video ID</span>
                </div>

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
        )}
        <div className="form-container">
          <div className="notice-notice">
            <p>কাজ সম্পর্কে বিস্তারিত জানার জন্য নিচের পিকচার গুলো দেখুন।</p>
          </div>
          <div className="tutorial-list">
            {tutorial.map((videoInfo, index) => {
              return (
                <div className="cart">
                  {
                    videoInfo?.title && <div className="title">
                    <p>{videoInfo?.title}</p>
                  </div>
                  }
                  
                  <div className="video-container">
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${videoInfo.videoID}?si=REJHJJTzV3PECHCS`}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                    ></iframe>
                  </div>
                  {user?.role === "admin" && (
                    <div className="button-section">
                      <button onClick={() => deleteItem(videoInfo._id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Withdraw;
