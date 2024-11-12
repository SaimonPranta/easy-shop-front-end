import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import SuccessTost from "../../../shared/components/SuccessTost/SuccessTost";
import FailedTost from "../../../shared/components/FailedTost/FailedTost";
import { ToastContainer } from "react-toastify";
import { userHeader } from "../../../shared/cooki";
import { useNavigate } from "react-router-dom";
import getImageUrl from "../../../shared/functions/getImageUrl";
import { imageContext } from "../../../App";

const AdminDailyTask = () => {
  const [tableItems, setTableItems] = useState([]);
  const { setViewImage } = useContext(imageContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/dashboard/get-list`, {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setTableItems((state) => {
            return [...data.data];
          });
        }
      });
  }, []);
 
  const handleStatus = (id) => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin-dashboard/delete?id=${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      }, 
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          let updateTable = tableItems.filter((item) => {
            if (item._id === id) {
              return false;
            }
            return true;
          });
          SuccessTost(data.message || "Successfully deleted social item")
           
          setTableItems(updateTable);
        } else {
          FailedTost(data.message || "Failed to delete social item");
        }
      });
  };

  const handleConfigNavigation = () => {
    navigate("/admin/dashboard-config");
  };

  return (
    <div className="admin-withdraw">
      <div className="btn-container">
        <button onClick={handleConfigNavigation}>Set Config</button>
      </div>
      <div className="common-table-section"> 
        <h4 className="dashboard-title">ADMIN DASHBOARD</h4>
        <div className="balance-section"></div>
       
        <div className="table-section" >
          <table>
            <thead>
              <tr>
                <th className="small">#</th>
                <th className="img">Logo</th>
                <th className="big">Title</th>
                <th>Link</th> 
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableItems?.length > 0 &&
                tableItems.map((reqInfo, index) => {
                  
                  return (
                    <tr key={index}>
                      <td className="small">{index + 1}</td>
                      <td className="img">
                        <img
                          src={getImageUrl(reqInfo?.socialMediaLogo)}
                          alt=""
                          onDoubleClick={() =>
                            setViewImage(getImageUrl(reqInfo?.socialMediaLogo))
                          }
                        />
                      </td>
                      <td>{reqInfo?.socialMediaTitle}</td>
                      <td><a href={reqInfo?.socialMediaLink} target="_blank" >{reqInfo?.socialMediaLink}</a></td>
                      
                      <td 
                      className="btn-container"
                      >
                        <div>
                        <button
                              onClick={() =>
                                handleStatus(  reqInfo._id)
                              } 
                            >
                              Delete
                            </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminDailyTask;
