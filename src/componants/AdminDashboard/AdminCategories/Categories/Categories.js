import React, { useEffect, useState } from "react";
import "./style.scss";
import { IoDuplicate } from "react-icons/io5";
import AddCategories from "./Modal/AddCategories";
import { RiDeleteBin5Line } from "react-icons/ri";
import { userHeader } from "../../../../shared/cooki";
import SuccessTost from "../../../../shared/components/SuccessTost/SuccessTost";
import FailedTost from "../../../../shared/components/FailedTost/FailedTost";
import { ToastContainer } from "react-toastify";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [select, setSelect] = useState({
    categoriesID: "",
    activeCategories: "",
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setCategories(data.data);
        }
      });
  }, []);

  const handleAddCategoriesToggle = () => {
    const element = document.getElementById("add-categories-modal");

    if (element) {
      element.classList.toggle("active-modal");
    }
  };
  const handleDeleteSubCategories = (mainID, subID) => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/admin-categories/subcategories`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          ...userHeader(),
        },
        body: JSON.stringify({ mainID, subID }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          SuccessTost("Category deleted successfully")
          setCategories(data.data);
        }
        if (data.failed) {
          FailedTost(data.failed)
        }
      });
  };
  const handleDeleteCategories = (mainID) => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin-categories`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...userHeader(),
      },
      body: JSON.stringify({ mainID }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          SuccessTost("Category deleted successfully")
          setCategories(data.data);
        }
        if (data.failed) {
          FailedTost(data.failed)
        }
      });
  };

  return (
    <div className="categories-container">
      <div className="categories-warper">
        <ul>
          {categories.length > 0 &&
            categories.map((item, index) => {
              return (
                <li key={item._id}>
                  <button>
                    <div
                      className="element-container"
                      onClick={() => {
                        setSelect({ activeCategories: item._id });
                      }}
                    >
                      <img
                        src={`${process.env.REACT_APP_SERVER_HOST_URL}/${item.img}`}
                        alt=""
                      />
                      {item.label}
                    </div>
                    <div className="action-container">
                      <span
                        className="add"
                        onClick={() => {
                          setSelect((state) => {
                            return { ...state, categoriesID: item._id };
                          });
                          handleAddCategoriesToggle();
                        }}
                      >
                        <IoDuplicate />
                      </span>
                      <span
                        className="delete"
                        onClick={() => handleDeleteCategories(item._id)}
                      >
                        <RiDeleteBin5Line />
                      </span>
                    </div>
                  </button>
                  {select.activeCategories === item._id &&
                    item.subCategories.length > 0 && (
                      <ul>
                        {item.subCategories.map((subCate, subIndex) => {
                          return (
                            <li key={subCate._id}>
                              {subCate.label}

                              <span
                                onClick={() =>
                                  handleDeleteSubCategories(
                                    item._id,
                                    subCate._id
                                  )
                                }
                              >
                                <RiDeleteBin5Line />
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                </li>
              );
            })}
          <li>
            <button className="add-btn" onClick={handleAddCategoriesToggle}>
              <IoDuplicate /> Categories
            </button>
          </li>
        </ul>
      </div>
      <div>
        <AddCategories
          setSelect={setSelect}
          select={select}
          setCategories={setCategories}
          close={handleAddCategoriesToggle}
        />
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Categories;
