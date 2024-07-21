import React, { useState } from 'react';
import './style.scss'


const AdminAddDailyTask = () => {
  const [input, setInput] = useState({ autoApprove: true })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    if (name === "img") {
      return setInput((state) => {
        return {
          ...state,
          [name]: e.target.files[0]
        }
      }
      )
    }
    if (name === "autoApprove") {
      return setInput((state) => {
        return {
          ...state,
          [name]: e.target.checked
        }
      }
      )
    }

    setInput((state) => {
      return {
        ...state,
        [name]: value
      }
    })
  } 
  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append("img", input.img)
    formData.append("data", JSON.stringify(input))

    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/daily-task/admin-create-task`, {
      method: "POST",
      body: formData
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("data ===>>>", data)
      })
  }

  return (
    <div className='admin-add-daily-task'>
      <div className='wrap-contact2'>
        <form className="contact2-form validate-form" onSubmit={onSubmit}>
          <span className="contact2-form-title">
            Add Daily Task
          </span>
          <div className="validate-input">
            <input className={`input2 ${input.title ? "fill" : ""}`} type="text" value={input.title || ""} name="title" onChange={handleChange} />
            <span className="focus-input2">TITLE</span>
          </div>
          <div className="validate-input" >
            <input className={`input2 ${input.description ? "fill" : ""}`} type="text" value={input.description || ""} name="description" onChange={handleChange} />
            <span className="focus-input2">DESCRIPTION</span>
          </div>
          <div className="validate-input" >
            <input className={`input2 ${input.taskLink ? "fill" : ""}`} type="text" value={input.taskLink || ""} name="taskLink" onChange={handleChange} />
            <span className="focus-input2">TASK LINK</span>
          </div>
          <div className="validate-input" >
            <input className={`input2 ${input.tutorialLink ? "fill" : ""}`} type="text" value={input.tutorialLink || ""} name="tutorialLink" onChange={handleChange} />
            <span className="focus-input2">TUTORIAL LINK</span>
          </div>
          <div className="validate-input auto-approve" >
            <span className="focus-input2">AUTO APPROVE</span>
            <input className="input2" checked={input.autoApprove || ""} name="autoApprove" onChange={handleChange} type="checkbox" />
          </div>
          <div className="validate-input image-section" >
            <span className="focus-input2">UPLOAD IMAGE</span>
            <input className="input2" name="img" onChange={handleChange} type="file" />
          </div>
          <div className="validate-input calender-section" >
            <span className="focus-input2"> EXPIRE DATE</span>
            <input type='date' value={input.taskStartDate || ""} onChange={handleChange} name='taskStartDate' />
          </div>
          <div className="validate-input calender-section" >
            <span className="focus-input2"> EXPIRE DATE</span>
            <input type='date' value={input.taskExpireDate || ""} onChange={handleChange} name='taskExpireDate' />
          </div>

          <div className="container-contact2-form-btn">
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div >
  );
};

export default AdminAddDailyTask;