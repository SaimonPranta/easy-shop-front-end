import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import Header from "../Header/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import inputHandler from "../../Functions/inputHandler";
import cookieExpires from "../../Functions/cookieExpires";
import { configContext, userContext } from "../../App";
import Loading from "../Loading/Loading";
import { HiEye, HiEyeOff } from "react-icons/hi";
import SuccessTost from "../../shared/components/SuccessTost/SuccessTost";
import FailedTost from "../../shared/components/FailedTost/FailedTost";
import { ToastContainer } from "react-toastify";
import TopHeader from "../TopHeader/TopHeader";
import getImageUrl from "../../shared/functions/getImageUrl";
import { MdOutlineImage } from "react-icons/md";

const Registation = () => {
  const [inputUser, setInputUser] = useState({});
  const [user, setUser] = useContext(userContext);
  const [userList, setUserList] = useState([]);
  const [message, setMessage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [showEye, setShowEye] = useState({
    password: false,
    confirmPassword: false,
  });
  const [config] = useContext(configContext);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ref = queryParams.get("ref");
  const from = location.state ? location.state.from.pathname : "/";

  useEffect(() => {
    user._id && navigate(from, { replace: true });
  }, [user]);
  useEffect(() => {
    if (!ref) {
      getUserList(searchUser, false);
    }
  }, [searchUser]);
  useEffect(() => {
    console.log("ref ===>>", ref);
    if (ref && ref.length) {
      getUserList(ref, true);
    }
  }, []);

  const fromInputHandler = (e) => {
    inputHandler(e, inputUser, setInputUser);
  };
  const handleFromSubmit = (e) => {
    e.preventDefault();

    if (
      inputUser.firstName &&
      inputUser.lastName &&
      inputUser.phoneNumber &&
      inputUser.phoneNumber &&
      inputUser.referNumber
    ) {
      // if (inputUser.phoneNumber.match(/0+/gi) && inputUser.phoneNumber.match(/1+/gi)) {
      // if (!inputUser.phoneNumber.match(/[a-z]/gi)) {
      if (Math.floor(inputUser.phoneNumber)) {
        if (inputUser.password === inputUser.confirmPassword) {
          setIsLoading(true);
          fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user`, {
            method: "POST",
            body: JSON.stringify(inputUser),
            headers: {
              "content-type": "application/json; charset=UTF-8",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setIsLoading(false);
              document.cookie = `token === ${data.token}; ${cookieExpires(
                3
              )}; path=/`;
              if (data.sucess) {
                SuccessTost(data.sucess);
              }
              if (data.failed) {
                FailedTost(data.failed);
              }
              if (data.data) {
                SuccessTost("Successfully created your account");
                data.data.password = null;
                setUser(data.data);
                navigate(from, { replace: true });
              }
              setTimeout(() => {
                setMessage({});
              }, 7000);
            });
        } else {
          FailedTost("Confirm Password does not match with Password.");
        }
      } else {
        FailedTost("Phone must be a Number, please try again.");
      }
      // } else {
      //     setMessage({ failed: 'Phone must be a Number, please try again.' })
      // }

      // } else {
      //     setMessage({ failed: 'Your Phone Number Not like a number, please try again.' })
      // }
    } else {
      FailedTost("You can't submit without filling full form.");
    }
  };
  const getUserList = (search, ref) => {
    if (!search || search?.lenght <= 2) {
      return;
    }
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/public/users?search=${search}&page={1}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Response form server ==>>", data);
        if (!ref && data.data) {
          setShowUserList(true);
          setUserList(data.data);
        }
        if (ref && data.data) {
          const user = data.data.find((item) => item.phoneNumber === search);
          if (!user) {
            return;
          }
          setInputUser((state) => {
            return {
              ...state,
              referNumber: user.phoneNumber,
              referName: `${user.firstName} ${user.lastName}`,
            };
          });
        }
      });
  };

  console.log("config ===>>", config);

  return (
    <div className="registration-page">
      <div>
        <Header />
        <TopHeader />
      </div>
      <div className="container my-5">
        <section className="authentication m-auto">
          <form onSubmit={handleFromSubmit}>
            <h6>Register an account</h6>
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={inputUser.firstName ? inputUser.firstName : ""}
              required
              autoComplete="off"
              onChange={fromInputHandler}
            />
            <label>last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={inputUser.lastName ? inputUser.lastName : ""}
              required
              autoComplete="off"
              onChange={fromInputHandler}
            />
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              value={inputUser.phoneNumber ? inputUser.phoneNumber : ""}
              required
              autoComplete="off"
              onChange={fromInputHandler}
            />
            <label>Password</label>
            <div className="eye-container">
              <input
                type={showEye.password ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={inputUser.password ? inputUser.password : ""}
                required
                autoComplete="off"
                onChange={fromInputHandler}
              />
              {showEye.password ? (
                <HiEye
                  onClick={() => {
                    setShowEye((state) => {
                      return {
                        ...state,
                        password: false,
                      };
                    });
                  }}
                />
              ) : (
                <HiEyeOff
                  onClick={() => {
                    setShowEye((state) => {
                      return {
                        ...state,
                        password: true,
                      };
                    });
                  }}
                />
              )}
            </div>
            <label>Confirm Password</label>
            <div className="eye-container">
              <input
                type={showEye.confirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={
                  inputUser.confirmPassword ? inputUser.confirmPassword : ""
                }
                required
                autoComplete="off"
                onChange={fromInputHandler}
              />
              {showEye.confirmPassword ? (
                <HiEye
                  onClick={() => {
                    setShowEye((state) => {
                      return {
                        ...state,
                        confirmPassword: false,
                      };
                    });
                  }}
                />
              ) : (
                <HiEyeOff
                  onClick={() => {
                    setShowEye((state) => {
                      return {
                        ...state,
                        confirmPassword: true,
                      };
                    });
                  }}
                />
              )}
            </div>
            <label>Your Upline Reference Number</label>
            <div className="referral-section">
              <input
                type="text"
                placeholder="Enter reference number"
                autoComplete="off"
                value={searchUser}
                onChange={(e) => {
                  setSearchUser(e.target.value);
                  // if (!ref) {
                  //     getUserList(e.target.value, false)
                  // }
                }}
              />
              {showUserList && userList.length > 0 && (
                <dvi className="user-list">
                  {userList.map((user, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setShowUserList(false);
                          setSearchUser(user.phoneNumber);
                          setInputUser((state) => {
                            return {
                              ...state,
                              referNumber: user.phoneNumber,
                              profilePicture: user.profilePicture || false,
                              referName: `${user.firstName} ${user.lastName}`,
                            };
                          });
                        }}
                      >
                        <strong>{`${user.firstName} ${user.lastName}`}</strong>{" "}
                        ({user.phoneNumber} )
                      </button>
                    );
                  })}
                </dvi>
              )}
            </div>
            {inputUser.referName && (
              <div className="upline-container">
                <div className="img">

                {
                  !inputUser.profilePicture &&  <MdOutlineImage />
                }
                {
                  inputUser.profilePicture &&  <img src={getImageUrl(inputUser?.profilePicture)}alt="" />
                }
                 
                </div>
                <div className="info">
                <p>
                  Upline Name: <span>{inputUser.referName}</span>
                </p>
                <p>
                  Upline Number: <span>{inputUser.phoneNumber}</span>
                </p>
                </div>
              </div>
            )}

            {/* <div className="notice-container">
              <p>
                আপনি যার মাধ্যমে রেজিষ্ট্রেশন করবেন তার থেকে রেফারেন্স নাম্বার
                নিবেন
              </p>
            </div> */}

            <input type="submit" value="Register account" />
            <div className="resposeContainer">
              {!message.failed && message.sucess && (
                <p className="sucess " style={{ color: "blue" }}>
                  {message.sucess}
                </p>
              )}
              {!message.sucess && message.failed && (
                <p className="warning " style={{ color: "blue" }}>
                  {message.failed}
                </p>
              )}
            </div>
            <div className="form-navigation d-flex">
              <p>
                Already have an account?{" "}
                <Link to="/login">
                  <span style={{ cursor: "pointer" }}>
                    Login
                  </span>
                </Link>
              </p>
            </div>
          </form>
          {config?.tutorial?.registration?.videoID && (
            <div className="tutorial-list">
              <div className="cart">
                {config?.tutorial?.registration?.videoTitle && (
                  <div className="title">
                    <p>{config?.tutorial?.registration?.videoTitle}</p>
                  </div>
                )}

                <div className="video-container">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${config?.tutorial?.registration?.videoID}?si=REJHJJTzV3PECHCS`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}
        </section>
        {isLoading && <Loading />}

        <ToastContainer />
      </div>
    </div>
  );
};

export default Registation;
