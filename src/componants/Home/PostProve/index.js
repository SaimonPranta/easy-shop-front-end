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
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { setViewImage } = useContext(imageContext);

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
        `${process.env.REACT_APP_SERVER_HOST_URL}/admin-prove?page=${page}`,
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
            setCurrentPage(Number(data.page - 1));
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
    console.log("Call scroll", {
      currentPage,
      page,
      currentLength: posts.length,
      total,
    });
    if (loading) {
      return;
    }
    if (total && total <= posts.length) {
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
    <div className="prove-post">
      <header className="post-header">
        <div className="title-section">
          <p>Members Payments Review</p>
        </div>
        <div className="search-section">
          <input type="text" placeholder="Search Member" />
          <button>
            <FaSearch />
          </button>
        </div>
      </header>
      <section className="post-list">
        {posts.map((post, index) => {
          console.log("post ====>>", post);
          const extraImg = post.images?.slice(3, post.images?.length)
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
                        <span className="extra-img-length" onClick={() => setViewImage(post.images)}>{`+${extraImg.length}`}</span>
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
      </section>
    </div>
  );
};

export default Index;
