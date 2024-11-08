import React, { useContext, useEffect, useRef, useState } from "react";
import "./styles.scss";
import { FaRegUserCircle, FaSearch } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { userHeader } from "../../../shared/cooki";
import getImageUrl from "../../../shared/functions/getImageUrl";
import { imageContext } from "../../../App";
import { dateToDateString } from "../../../shared/functions/dateConverter";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({
    page: 1,
    currentPage: 0,
  });
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const { setViewImage } = useContext(imageContext);
  const [showLastElemt, setShowLastElemt] = useState(false);

  const lastElementRef = useRef(null);
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
        `${process.env.REACT_APP_SERVER_HOST_URL}/public-prove?page=${
          page.page
        }&search=${search ? search : ""}`,
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
            if (page.page === 1) {
              setPosts((state) => {
                return [...data.data];
              });
            } else {
              setPosts((state) => {
                return [...state, ...data.data];
              });
            }
          } else {
            setPosts([]);
          }
          if (data.page) {
            setPage((state) => {
              return {
                ...state,
                currentPage: Number(data.page - 1),
              };
            });
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
  }, [page.page, search]);
  const updatePageState = () => {
    if (loading) {
      return;
    }
    if (total && total <= posts.length) {
      return;
    }

    setPage((state) => {
      if (state.currentPage === state.page - 1) {
        setLoading(true);
        const updateState = state.page + 1;
        return {
          ...state,
          page: updateState,
        };
      }
      return {
        ...state,
      };
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          updatePageState();
        } else {
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
      console.log("Observer attached to the last element"); // Debugging
    }

    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current);
        console.log("Observer detached from the last element"); // Debugging
      }
    };
  }, [showLastElemt]);

  return (
    <div className="prove-post">
      <header className="post-header">
        <div className="title-section">
          <p>Members Payments Review</p>
        </div>
        <div className="search-section">
          <input type="text" placeholder="Search Member" id="prove-search" />
          <button
            onClick={() => {
              const ele = document.getElementById("prove-search");
              console.log("prove-search", ele.value);
              setSearch(ele.value);
              setPage((state) => {
                return {
                  ...state,
                  page: 1,
                  currentPage: 0,
                };
              });
            }}
          >
            <FaSearch />
          </button>
        </div>
      </header>

      <section className="post-list">
        {posts.map((post, index) => {
          const extraImg = post.images?.slice(3, post.images?.length);
          const imgClass =
            post.images?.length <= 4
              ? `img-${post?.images?.length}`
              : "more-img";
          return (
            <div className="card" key={index}>
              <div className="head">
                {post?.userID?.profilePicture && (
                  <img
                    src={getImageUrl(post?.userID?.profilePicture)}
                    alt=""
                    onDoubleClick={() =>
                      setViewImage(getImageUrl(post?.userID?.profilePicture))
                    }
                  />
                )}
                {!post?.userID?.profilePicture && <FaRegUserCircle />}
                <div className="name-section">
                  <h6>{post?.userID?.fullName}</h6>
                  <p>{dateToDateString(post.createdAt)}</p>
                </div>
              </div>
              <div className="body">
                <div className="des">
                  <p>{post.description}</p>
                </div>
                <div className={`img-grid ${imgClass}`}>
                  {[...post.images].slice(0, 4).map((img, imgIndex) => {
                    return (
                      <div className="img-card" key={imgIndex}>
                        <img
                          src={getImageUrl(img)}
                          onClick={() => setViewImage(post.images)}
                          alt=""
                        />
                        <span
                          className="extra-img-length"
                          onClick={() => setViewImage(post.images)}
                        >{`+${extraImg.length}`}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="footer">
                <button className="like">
                  <BiLike />
                  <p>Like</p>
                </button>
              </div>
            </div>
          );
        })}
        <div ref={lastElementRef} className="scroll-selector" />

        {  loading &&
          new Array(15).fill("").map((item, index) => {
            return (
              <div className="skelton-cart">
                <div className="head">
                  <span className="img" />
                  <div>
                    <span className="title" />
                    <span className="date" />
                  </div>
                </div>
                <div className="des-section">
                  <div className="dis">
                    <span />
                    <span />
                  </div>
                  <span className="thubnail" />
                  <span className="like" />
                </div>

              </div>
            );
          })}
      </section>
    </div>
  );
};

export default Index;
