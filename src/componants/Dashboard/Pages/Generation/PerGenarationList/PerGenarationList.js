import React, { useEffect, useState } from "react";
import "./PerGenarationList.css";
import { useParams } from "react-router-dom";
import { userHeader } from "../../../../../shared/cooki";

const Index = () => {
  const { generation } = useParams();
  const [userList, setUserList] = useState([]);
  let count = 0;

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/generation?generation=${generation}`,
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
        if (data.length > 0) {
          setUserList(data);
        }
      });
  }, []);

  return (
    <div className="text-white per-genaration">
      <div className="balance-transfer-history-section mt-4 m-auto">
        <h4>List of GENERATION {generation}</h4>
        {userList.length > 0 ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User Name</th>
                  <th>Phone Number</th>
                  <th>Referred By</th>
                  <th>Rank</th>
                  <th>Joining Date</th>
                </tr>
              </thead>
              <tbody>
                {userList.length &&
                  userList.map((user) => {
                    count++;
                    return (
                      <tr key={count}>
                        <td>{count}</td>
                        <td>
                          {user.firstName} {user.lastName}
                        </td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.referNumber}</td>
                        <td>{user.rank}</td>
                        <td>{user.joinDate}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <p>Sorry, in this generation you have no user.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
