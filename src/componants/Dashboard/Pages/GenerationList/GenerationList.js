import React, { useContext, useEffect, useRef, useState } from "react";
import { configContext, imageContext, userContext } from "../../../../App";
import "./styles.scss";
import { userHeader } from "../../../../shared/cooki";
import wallet from "../../../../assets/images/dashboard/wallet.png";
import { dateToString } from "../../../../shared/functions/dateConverter";
import { useNavigate } from "react-router-dom";
import SuccessTost from "../../../../shared/components/SuccessTost/SuccessTost";
import FailedTost from "../../../../shared/components/FailedTost/FailedTost";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import getImageUrl from "../../../../shared/functions/getImageUrl";
import { FaRegUserCircle } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { ImUsers } from "react-icons/im";
const tableBalanceArray = [
  {
    title: "Total User",
    property: "totalReferMember",
  },
  {
    title: "Total Commission",
    property: "totalIncome",
    tk: true,
  },
];
const genMap = {
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
  8: "Eight",
  9: "Nine",
  10: "Ten",
};

const Index = () => {
  const [page, setPage] = useState(1);
  const [filterInput, setFilterInput] = useState({
    fromDate: "2024-12-14",
    toDate: "2024-12-14",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [tableItems, setTableItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchBalance, setSearchBalance] = useState({
    totalIncome: 0,
    totalReferMember: 0,
  });
  const { generation } = useParams();
  const { setViewImage } = useContext(imageContext);
  const [searchParams] = useSearchParams();

  const fromDate = searchParams.get("from"); // Get the 'from' query parameter
  const toDate = searchParams.get("to");
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
        `${process.env.REACT_APP_SERVER_HOST_URL}/profile/generation-list?generation=${generation}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json; charset=UTF-8",
            ...userHeader(),
          },
          body: JSON.stringify({ fromDate, toDate }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setTableItems(data?.data?.generationList);
            setSearchBalance({
              totalIncome: data.data.totalIncome,
              totalReferMember: data.data.totalReferMember,
            });
          }
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

  return (
    <div className="generation-history">
      <div className="inner-section">
        <div className="common-table-section">
          <h4 className="table-title">
            {genMap[generation] || ""} Generation History
          </h4>
          <div className="balance-section">
            <div className="grid-section">
              {tableBalanceArray.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    <div className="top">
                      {item.tk && <img src={wallet} alt="" />}
                      {!item.tk && <ImUsers />}

                      <strong>{item.title}</strong>
                      <p>
                        {item.tk && <strong>৳</strong>}

                        {searchBalance[item.property]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="table-section"
            id="table-list"
            onScroll={handleScroll}
          >
            <table>
              <thead>
                <tr>
                  <th className="small">#</th>
                  <th className="big"> Name</th>
                  <th>Phone Number</th>
                  <th className="big">Referred By</th>
                  <th>Rank</th>
                  <th>Joining Date</th>
                </tr>
              </thead>
              <tbody>
                {tableItems?.length > 0 &&
                  tableItems.map((reqInfo, index) => {
                    return (
                      <tr key={reqInfo._id}>
                        <td className="small">{index + 1}</td>
                        <td className="img-name">
                          <div>
                            {reqInfo?.referredUser?.profilePicture && (
                              <img
                                src={getImageUrl(
                                  reqInfo?.referredUser?.profilePicture
                                )}
                                alt=""
                                onDoubleClick={() =>
                                  setViewImage(
                                    getImageUrl(
                                      reqInfo?.referredUser?.profilePicture
                                    )
                                  )
                                }
                              />
                            )}
                            {!reqInfo?.referredUser?.profilePicture && (
                              <FaRegUserCircle />
                            )}
                            <p>{`${reqInfo?.referredUser?.firstName} ${reqInfo?.referredUser?.lastName}`}</p>
                          </div>
                        </td>
                        <td>{reqInfo?.referredUser?.phoneNumber}</td>

                        <td className="img-name">
                          {reqInfo?.referredUser?.referUser && (
                            <div>
                              {reqInfo?.referredUser?.referUser
                                ?.profilePicture && (
                                <img
                                  src={getImageUrl(
                                    reqInfo?.referredUser?.referUser
                                      ?.profilePicture
                                  )}
                                  alt=""
                                  onDoubleClick={() =>
                                    setViewImage(
                                      getImageUrl(
                                        reqInfo?.referredUser?.referUser
                                          ?.profilePicture
                                      )
                                    )
                                  }
                                />
                              )}
                              {!reqInfo?.referredUser?.referUser
                                ?.profilePicture && <FaRegUserCircle />}
                              <p>{`${reqInfo?.referredUser?.referUser?.firstName} ${reqInfo?.referredUser?.referUser?.lastName}`}</p>
                            </div>
                          )}
                        </td>
                        <td>
                          {reqInfo?.referredUser?.rankID?.rank || "No Rank"}
                        </td>
                        <td className="date">
                          {reqInfo?.referredUser?.joinDate
                            ? dateToString(reqInfo?.referredUser?.joinDate)
                            : "NAN"}
                        </td>
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

export default Index;
