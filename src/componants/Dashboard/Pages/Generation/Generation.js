import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../../../App";
import "./Generation.css";
import SearchGenaration from "./SearchGenaraionMember/SearchGenaration";
import { userHeader } from "../../../../shared/cooki";

const Generation = () => {
  const [user, setUser] = useContext(userContext);
  const [userCount, setUserCount] = useState(0);
  const [condition, setCondition] = useState({});
  const [allUserContaienr, setAllUserContainer] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [generationList, setGenerationList] = useState({});
  const [totalRefer, setTotalRefer] = useState(0);

  useEffect(() => {
    // fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/generation_user`, {
    //   method: "GET",
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //     ...userHeader(),
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.failed) {
    //     } else {
    //       setAllUser(data);
    //       setAllUserContainer(data);
    //     }
    //   });
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/profile/generation`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setGenerationList(data.data.generationList);
          setTotalRefer(data.data.totalReferMember);
        }
      });
  }, []);

  //   if (user._id) {
  //     setTimeout(() => {
  //       const totalUser =
  //         Math.floor(user.generation_1.length) +
  //         Math.floor(user.generation_2.length) +
  //         Math.floor(user.generation_3.length) +
  //         Math.floor(user.generation_4.length) +
  //         Math.floor(user.generation_5.length) +
  //         Math.floor(user.generation_6.length) +
  //         Math.floor(user.generation_7.length) +
  //         Math.floor(user.generation_8.length) +
  //         Math.floor(user.generation_9.length) +
  //         Math.floor(user.generation_10.length);
  //       setUserCount(totalUser);
  //     }, 2000);
  //   }
  const ElementControl = () => {
    const curCondition = { ...condition };
    curCondition["search"] = curCondition.search ? false : true;
    setCondition(curCondition);
  };

  const seach_handler = async (event) => {
    let inputValue = event.target.value;

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/profile/search-user?search=${inputValue}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          ...userHeader(),
        },
      }
    );
    const data = await res.json();
    if (data.data) {
      setAllUserContainer([...data.data]);
    } else {
      setAllUserContainer([]);
    }

    // .then((res) => )
    // .then((data) => {
    //   if (data.data) {
    //     setGenerationList(data.data.generationList);
    //     setTotalRefer(data.data.totalReferMember);
    //   }
    // });
  };

  return (
    <div className="generation-section text-white">
      <div className="inner-container">
        <div>
          <h4 className="dashboard-title">My Generation List </h4>
        </div>

        <div className="generation-top-section">
          <div>
            <div>
              <h5>Your Name</h5>{" "}
              <span>{`${user.firstName} ${user.lastName}`}</span>
            </div>
            <div>
              <h5>Your Reference Number</h5> <span>{user.phoneNumber}</span>
            </div>
          </div>
          <div>
            <div>
              <h5>Upline Number</h5>{" "}
              <span>
                {user?.referUser
                  ? `${user?.referUser?.firstName} ${user?.referUser?.lastName}`
                  : "null"}
              </span>
            </div>
            <div>
              <h5>Upline Account Number</h5>{" "}
              <span>{user?.referUser?.phoneNumber || "null"}</span>
            </div>
          </div>
          <div>
            <div className="gen-member">
              <h5>Total Generation Members</h5> <span>{totalRefer}</span>
            </div>
          </div>
        </div>
        {!condition.search ? (
          <div className="d-flex">
            <button
              type="button"
              onClick={ElementControl}
              className="btn btn-primary btn m-auto"
            >
              Generation Search Member
            </button>
          </div>
        ) : (
          <>
            <div className="input-group admin-search">
              <div className="d-flex">
                <button
                  type="button"
                  onClick={ElementControl}
                  className="btn btn-primary btn m-auto"
                >
                  Back to Generation
                </button>
              </div>
              <input
                type="text"
                className="form-control m-auto"
                aria-label="Text input with radio button"
                onChange={seach_handler}
                placeholder="Search by Phone Number"
              />
            </div>
          </>
        )}

        {!condition.search && (
          <div className="generation-list-container">
            <div className="generation-title ">
              <h4>My Generation Members</h4>
            </div>
            <div className="generation-items">
              <div>
                <h5>1st Generation</h5>{" "}
                <span>{generationList.generation_1 || 0}</span>{" "}
                <button>
                  <Link to="/generation/1"> View List</Link>
                </button>
              </div>
              <div>
                <h5>2nd Generation</h5>{" "}
                <span>{generationList.generation_2 || 0}</span>{" "}
                <button>
                  <Link to="/generation/2"> View List</Link>
                </button>
              </div>
              <div>
                <h5>3rd Generation</h5>{" "}
                <span>{generationList.generation_3 || 0}</span>{" "}
                <button>
                  <Link to="/generation/3"> View List</Link>
                </button>
              </div>
              <div>
                <h5>4th Generation</h5>{" "}
                <span>{generationList.generation_4 || 0}</span>{" "}
                <button>
                  <Link to="/generation/4"> View List</Link>
                </button>
              </div>
              <div>
                <h5>5th Generation</h5>{" "}
                <span>{generationList.generation_6 || 0}</span>{" "}
                <button>
                  <Link to="/generation/5"> View List</Link>
                </button>
              </div>
              <div>
                <h5>6th Generation</h5>{" "}
                <span>{generationList.generation_6 || 0}</span>{" "}
                <button>
                  <Link to="/generation/6"> View List</Link>
                </button>
              </div>
              <div>
                <h5>7th Generation</h5>{" "}
                <span>{generationList.generation_7 || 0}</span>{" "}
                <button>
                  <Link to="/generation/7"> View List</Link>
                </button>
              </div>
              <div>
                <h5>8th Generation</h5>{" "}
                <span>{generationList.generation_8 || 0}</span>{" "}
                <button>
                  <Link to="/generation/8"> View List</Link>
                </button>
              </div>
              <div>
                <h5>9th Generation</h5>{" "}
                <span>{generationList.generation_9 || 0}</span>{" "}
                <button>
                  <Link to="/generation/9"> View List</Link>
                </button>
              </div>
              <div>
                <h5>10th Generation</h5>{" "}
                <span>{generationList.generation_10 || 0}</span>{" "}
                <button>
                  <Link to="/generation/10"> View List</Link>
                </button>
              </div>
            </div>
          </div>
        )}
        {allUserContaienr.length && (
          <SearchGenaration userr={allUserContaienr} />
        )}
      </div>
    </div>
  );
};

export default Generation;
