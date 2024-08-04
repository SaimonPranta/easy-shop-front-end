import React, { useEffect, useState } from 'react';
import './style.scss' 


const AdminAddDailyTask = () => {
  const [input, setInput] = useState({ autoApprove: true })
  const [activeTab, setActiveTab] = useState("daily-task")
  const [currentStyle, setCurrentStyle] = useState("")
  const [coinArray, setCoinArray] = useState([{
    coin: "",
    percentage: ""
  }])
  const colorArray = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#5F4B8BFF", "#F95700FF", "#D6ED17FF", "#2C5F2D", "#0063B2FF", "#2BAE66FF"]


  useEffect(() => {
    const handleStyle = async () => {
      let nowCount = 0
      // background: `conic-gradient( #e74c3c 0% 45%, #3498db 45% 55%,  #2ecc71 55% 80%,  #f39c12 80% 100% )`,
      let styleString = ""
      await coinArray.forEach(({ percentage, coin }, index) => {
        if (!percentage || !coin) {
          return
        }
        styleString = styleString + `${colorArray[index]} ${nowCount}% ${nowCount + percentage}% ${coinArray.length !== index + 1 ? " ," : ""}`
        nowCount = nowCount + percentage

      })
      // await arrayOfCount.forEach((count, index) => {
      //   styleString = styleString + `${colorArray[index]} ${nowCount}% ${nowCount + count}% ${arrayOfCount.length !== index + 1 ? " ," : ""}`
      //   nowCount = nowCount + count

      // })
      console.log('styleString =>', styleString)
      setCurrentStyle(styleString)
    }
    handleStyle()
  }, [coinArray])

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

  const handleSetCoin = (e, inputIndex) => {
    const name = e.target.name
    const value = e.target.value

    console.log("name", name)
    console.log("value", value)
    if (!Number(value)) {
      return
    }
    const updateArray = coinArray.map((obj, index) => {
      if (index === inputIndex) {
        return {
          ...obj,
          [name]: Number(value)
        }
      }
      return obj
    })
    setCoinArray(updateArray)
  }


  return (
    <div className='admin-add-daily-task'>
      <div className='header-section'>
        <button className={activeTab === "daily-task" ? "active" : ""} onClick={() => setActiveTab("daily-task")} >Add Daily Task</button>
        <button className={activeTab === "task-reward" ? "active" : ""} onClick={() => setActiveTab("task-reward")} >Add Task Reward</button>
      </div>

      {
        activeTab === "daily-task" ? <div className='wrap-contact2'>
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
        </div > : activeTab === "task-reward" && <div className='wrap-contact2'>
          <form className="contact2-form validate-form" onSubmit={onSubmit}>
            <span className="contact2-form-title">
              Add Task Rewards
            </span>
            <div className='reward-circle'>
              <div class={`circle ${!currentStyle.length ? "empty" : "fill"}`} style={{
                background: `conic-gradient(${currentStyle})`,
              }}>

              </div>
              <div className='discretion'>
                <h6>Reward Percentage </h6>
                <div className='list'>
                  {
                    coinArray.map(({ coin, percentage }, index) => {
                      if (!coin || !percentage) {
                        return <></>
                      }
                      return <div key={index}>  <span style={{ "--itemCol": colorArray[index] }}>{coin}</span> <strong>{percentage}%</strong> </div>
                    })
                  }
                </div>
              </div>
            </div>
            <>
              {
                coinArray.map(({ coin, percentage }, index) => {
                  return <div className="validate-input duel-input">
                    <div>
                      <input className={`input2 ${coin ? "fill" : ""}`} type="text" value={coin || ""} name="coin" onChange={(e) => handleSetCoin(e, index)} />
                      <span className="focus-input2">COIN</span>
                    </div>
                    <div>
                      <input className={`input2 ${percentage ? "fill" : ""}`} type="text" value={percentage || ""} name="percentage" onChange={(e) => handleSetCoin(e, index)} />
                      <span className="focus-input2">PERCENTAGE %</span>
                    </div>
                  </div>
                })
              }
            </>



            <div className="validate-input add-more-section" >
              <button onClick={() => {
                setCoinArray((state) => {
                  return [...state, { coin: "", percentage: "" }]
                })
              }}><strong>+</strong> Add More</button>
            </div>


            <div className="container-contact2-form-btn">
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      }


    </div >
  );
};

export default AdminAddDailyTask;