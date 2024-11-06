import React, { useEffect, useState } from "react";
import "./style.scss";
import { userHeader } from "../../../../../../shared/cooki";
import SuccessTost from "../../../../../../shared/components/SuccessTost/SuccessTost";
import FailedTost from "../../../../../../shared/components/FailedTost/FailedTost";
import { ToastContainer } from "react-toastify";
const Index = ({ close, setCategories, select, setSelect }) => {
  const [input, setInput] = useState({});

  useEffect(() => {
    setInput({});
  }, [select]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const handleImgChange = (e) => {
    const [file] = e.target.files;
    setInput((state) => {
      return {
        ...state,
        img: file,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.label || !input.value) {
      if (select.categoriesID) {
        return;
      } else {
        if (!input.img) {
          return;
        }
      }
    }
    const formData = new FormData();
    const tempInput = { ...input };
    delete tempInput["img"];
    formData.append("data", JSON.stringify({ ...tempInput, ...select }));
    formData.append("img", input.img);

    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin-categories`, {
      method: "POST",
      body: formData,
      headers: {
        ...userHeader(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          SuccessTost("Category item has been added successfully");

          setCategories((state) => {
            return [...state, data.data];
          });
          close();
        }
        if (data.failed) {
          FailedTost(data.failed);
        }
      });
  };

  return (
    <div className="add-categories-modal" id="add-categories-modal">
      <form className="form" onSubmit={handleSubmit}>
        <button
          className="clone-btn"
          type="button"
          onClick={() => {
            close();
            setSelect({
              categoriesID: "",
            });
          }}
        >
          x
        </button>
        <div className="item">
          <div>
            <label> Categories Label</label>
            <input
              type="text"
              name="label"
              value={input.label ? input.label : ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Categories Value</label>
            <input
              type="text"
              name="value"
              value={input.value ? input.value : ""}
              onChange={handleInputChange}
            />
          </div>
          {!select.categoriesID && (
            <div>
              <label>Category Logo</label>
              <div>
                <input type="file" onChange={handleImgChange} />
                {input?.img && <img src={URL.createObjectURL(input.img)} />}
              </div>
            </div>
          )}
          <div className="button-container">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Index;
