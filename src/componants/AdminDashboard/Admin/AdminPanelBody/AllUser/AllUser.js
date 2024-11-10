import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCooki } from "../../../../../shared/cooki";
import "./style.css";
const AllUser = () => {
  const [allUser, setAllUser] = useState([]);
  const [offset, setOffset] = useState(1); 
  const [count, setCount] = useState({
    total: 0,
    activeUser: 0,
    unactiveUser: 0,
    totalUserBalance: 0,
    totalActiveUserBalance: 0,
  });
  const cookie = getCooki();

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/admin/users?page=${offset}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${cookie}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        if (data.failed) {
        } else if (data.data) {
          setAllUser((state) => {
            return [...state, ...data.data];
          });
        }
      });
  }, [offset]);

  console.log("allUser", allUser);

  useEffect(() => {
    if (cookie) {
      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/user-count`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${cookie}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCount(data.count);
        });
    }
  }, []);

  // const handleScroll = () => {
  //     if (
  //         window.innerHeight + document.documentElement.scrollTop >=
  //         Number(document.documentElement.offsetHeight - 1)
  //     ) {
  //         setOffset((state) => state + 1);
  //     }
  // };

  // useEffect(() => {
  //     window.addEventListener("scroll", handleScroll);
  //     return () => {
  //         window.removeEventListener("scroll", handleScroll);
  //     };
  // }, []);

  const handleScroll = () => {
    const tableContainer = document.getElementById("all-user-container");
    const scrollTop = tableContainer.scrollTop || 0;
    const offsetHeight = tableContainer.offsetHeight || 0;
    const scrollHeight = tableContainer.scrollHeight || 0;
    if (scrollTop + offsetHeight > scrollHeight - 1) {
      setOffset((state) => state + 1);
    }
  };

  useEffect(() => {
    const tableContainer = document.getElementById("all-user-container");
    tableContainer.addEventListener("scroll", handleScroll);
    return () => {
      tableContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const search_handler = (event) => {
    const search = event.target.value;
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/admin/users?page=1&search=${search}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${cookie}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.failed) {
        } else if (data.data) {
          setAllUser(data.data);
        }
      });
  };

  const handleViewUser = (e) => {
    const condition = e.target.value;
    if (condition === "allUser") {
      setAllUser(allUser);
    }
    if (condition === "active") {
      const user = allUser.filter((user) => {
        return user.isActive === true;
      });
      setAllUser(user);
    }
    if (condition === "unActive") {
      const user = allUser.filter((user) => {
        return user.isActive === false;
      });
      setAllUser(user);
    }
  };

  return (
    <div>
      <div
        className="balnce-section text-center text-white dashboard-sub-section"
        style={{ height: "100%" }}
      >
        <div style={{ height: "100%" }}>
          <p>Total User {count.total}</p>
          <p>Total Active User {count.activeUser}</p>
          <p>Total Unactive User {count.unactiveUser}</p>
          <p>Total Active User Balance {count.totalUserBalance} Tk</p>
          <p>
            Total Active User Income Balance {count.totalActiveUserBalance} Tk
          </p>
        </div>
      </div>
      <div className="input-group admin-search">
        <input
          type="text"
          className="form-control"
          aria-label="Text input with radio button"
          onChange={search_handler}
          placeholder="Search by Phone Number"
        />
      </div>
      <div className="view-usere">
        <label> View User</label>
        <select name="viewUser" onChange={handleViewUser}>
          <option value="allUser">All User</option>
          <option value="active">Active User</option>
          <option value="unActive">Unactive User</option>
        </select>
      </div>
      <div className="all-user-container" id="all-user-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>User Number</th>
              <th>Balance</th>
              <th>Shoping Balance</th>
              <th>Status</th>
              <th colSpan="2">Option</th>
            </tr>
          </thead>
          <tbody>
            {allUser &&
              allUser.length > 0 &&
              allUser.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.balance}</td>
                    <td>{user.shoppingBalance}</td>
                    <td>{user.isActive ? "Active" : "Unactive"}</td>
                    <td className=" admin-approved">
                      <Link to={`/user/${user._id}`}>View Details</Link>
                    </td>
                    <td className="admin-pending">
                      {" "}
                      <Link to={`/edit_user/${user._id}`}>Edit Details</Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
