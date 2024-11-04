import React, { useContext, useEffect, useRef, useState } from "react";
import "./styles.scss";
import { userHeader } from "../../../../shared/cooki";
import { dateToString } from "../../../../shared/functions/dateConverter";
import { useNavigate } from "react-router-dom";
import getImageUrl from "../../../../shared/functions/getImageUrl";
import { imageContext } from "../../../../App";

const Withdraw = () => {
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [tableItems, setTableItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [seeMoreID, setSeeMoreID] = useState("");
  const navigate = useNavigate();
  const {  setViewImage } = useContext(imageContext);

  const debounceState = useRef();

  const resetTimeout = () => {
    if (debounceState.current) {
      clearTimeout(debounceState.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    debounceState.current = setTimeout(() => {
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/prove/get-list?page=${page}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json; charset=UTF-8",
            ...userHeader(),
          },
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
        })
        .finally(() => {
          setLoading(false);
        });
    }, 3000);

    return () => {
      resetTimeout();
    };
  }, [page]);

  const handleScroll = () => { 
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

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/prove/delete?postID=${id}`, {
      method: "DELETE", 
      headers: {
        ...userHeader(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          const updateTable = tableItems.filter((item) => item._id !== id);
          setTableItems(updateTable);
        }
      });
  };
  const handleNavigation = () => {
    navigate("/add-prove");
  };
  const handleEdit = (id) => {
    navigate(`/add-prove?postID=${id}`);
  };

  return (
    <div className="prove-page">
      <div className="inner-section">
        <div className="add-btn">
          <button onClick={handleNavigation}>Add Prove</button>
        </div>
        <div className="common-table-section">
          <div
            className="table-section"
            id="table-list"
            onScroll={handleScroll}
          >
            <h4 className="table-title">PROVE POST HISTORY</h4>
            <table>
              <thead>
                <tr>
                  <th className="small">#</th>
                  <th> Image</th>
                  <th className="big"> Description </th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableItems?.length > 0 &&
                  tableItems.map((reqInfo, index) => {
                    return (
                      <tr key={reqInfo._id}>
                        <td className="small">{index + 1}</td>
                        <td className="img">
                          <img src={getImageUrl(reqInfo.images)} onClick={() => setViewImage(reqInfo.images)} alt="" />
                        </td>
                        <td className={`big description`}>
                          <div
                            className={`${
                              reqInfo._id === seeMoreID ? "" : "ellipsis"
                            }`}
                            onClick={() => setSeeMoreID(reqInfo._id)}
                          >
                            <p>{reqInfo?.description}</p>
                          </div>
                        </td>
                        <td className="date">
                          {dateToString(reqInfo.createdAt)}
                        </td>
                        <td className="date">
                         {reqInfo.disable ? "Disable" : "Active"}
                        </td>
                        <td className={`btn-container`}>
                          <div>
                            <button 
                              onClick={() => {
                                handleEdit(reqInfo._id);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              // disabled={reqInfo.status !== "Pending"}
                              onClick={() => {
                                handleDelete(reqInfo._id);
                              }}
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
      </div>
    </div>
  );
};

export default Withdraw;
