import React, { useContext, useEffect, useState } from 'react';
import './style.scss'
import { userHeader } from '../../../shared/cooki';
import { useNavigate } from 'react-router-dom';
import { configContext } from '../../../App';


const AdminAddDailyTask = () => {
  const [input, setInput] = useState({
    paymentMethods: {
      bikash: false,
      nagad: false,
      rocket: false,
      upay: false
    },
    balances: {
      mainBalance: false,
      salesBalance: false,
      taskBalance: false,
    },
    withdrawAmounts: []

  })
  const [config, setConfig] = useContext(configContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (config.withdraw) {
      setInput((state) => {
        return {
          ...state,
          ...config.withdraw
        }
      })
    }
  }, [config])


  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    const balanceArray = ["mainBalance", "salesBalance", "taskBalance"]
    const paymentsArray = ["bikash", "nagad", "rocket", "upay"]
    if (paymentsArray.includes(name)) {
      return setInput((state) => {
        state.paymentMethods[name] = e.target.checked
        return {
          ...state,
        }
      }
      )
    }
    if (balanceArray.includes(name)) {
      return setInput((state) => {
        state.balances[name] = e.target.checked
        return {
          ...state,
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
    if (name === "withdrawCost") {
      if ((value && !Number(value)) || (value && Number(value) > 100)) {
        return
      }
      setInput((state) => {
        return {
          ...state,
          [name]: value
        }
      })
      return
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

    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin-withdraw/set-config`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        ...userHeader()
      },
      body: JSON.stringify(input)
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.data) {
          setConfig(data.data)
          navigate('/admin/withdraw')
        }
      })
  }
  const addWithdrawAmount = () => {
    if (input?.withdrawAmount?.length < 0 || !Number(input?.withdrawAmount) || Number(input?.withdrawAmount) < 1) {
      return
    }
    setInput((state) => {
      const withdrawAmounts = [...state.withdrawAmounts, { balance: Number(state.withdrawAmount) }]
      return {
        ...state,
        withdrawAmount: "",
        withdrawAmounts: withdrawAmounts
      }
    })


  }
  const removeWithdrawAmount = (inputIndex) => {

    setInput((state) => {
      const withdrawAmounts = state.withdrawAmounts.filter((item, index) => index !== inputIndex)
      return {
        ...state,
        withdrawAmount: "",
        withdrawAmounts: withdrawAmounts
      }
    })


  }

  return (
    <div className='admin-add-daily-task'>
      <div className='wrap-contact2'>
        <form className="contact2-form validate-form">
          <span className="contact2-form-title">
            Set Withdraw Config
          </span>

          <div className="validate-input">
            <input className={`input2 ${input.withdrawCost ? "fill" : ""}`} type="text" value={input.withdrawCost || ""} name="withdrawCost" onChange={handleChange} />
            <span className="focus-input2">Set Withdraw Cost</span>
          </div>
          <div className="validate-input">
            <input className={`input2 ${input.withdrawAmount ? "fill" : ""}`} type="text" value={input.withdrawAmount || ""} name="withdrawAmount" onChange={handleChange} />
            <span className="focus-input2">Set Withdraw Amount</span>
            <button className={`enter-btn ${input.withdrawAmount ? "fill" : ""}`} type='button' onClick={addWithdrawAmount}>Enter</button>
          </div>
          {input?.withdrawAmounts?.length > 0 && <div className="selected-withdraw-amounts ">
            <ul>
              {
                input.withdrawAmounts.map((item, index) => {
                  return <li key={index}>{item.balance}TK <button onClick={() => removeWithdrawAmount(index)} type='button'>x</button></li>
                })
            }
            </ul>
          </div>}
          <div className="validate-input">
            <input className={`input2 ${input.maximumWithdrawAmount ? "fill" : ""}`} type="text" value={input.maximumWithdrawAmount || ""} name="maximumWithdrawAmount" onChange={handleChange} />
            <span className="focus-input2">Set Maximum Withdraw Amount </span>
          </div>
          <div className="validate-input auto-approve" >
            <span className="focus-input2">Bikash Payment</span>
            <input className="input2" checked={input?.paymentMethods?.bikash || false} name="bikash" onChange={handleChange} type="checkbox" />
          </div>
          <div className="validate-input auto-approve" >
            <span className="focus-input2">Nagad Payment</span>
            <input className="input2" checked={input?.paymentMethods?.nagad || false} name="nagad" onChange={handleChange} type="checkbox" />
          </div>
          <div className="validate-input auto-approve" >
            <span className="focus-input2">Rocket Payment</span>
            <input className="input2" checked={input?.paymentMethods?.rocket || false} name="rocket" onChange={handleChange} type="checkbox" />
          </div>
          <div className="validate-input auto-approve" >
            <span className="focus-input2">Upay Payment</span>
            <input className="input2" checked={input?.paymentMethods?.upay || false} name="upay" onChange={handleChange} type="checkbox" />
          </div>
          <div className="validate-input auto-approve" >
            <span className="focus-input2">Main Balance</span>
            <input className="input2" checked={input?.balances?.mainBalance || false} name="mainBalance" onChange={handleChange} type="checkbox" />
          </div>
          <div className="validate-input auto-approve" >
            <span className="focus-input2">Sales Balance</span>
            <input className="input2" checked={input?.balances?.salesBalance || false} name="salesBalance" onChange={handleChange} type="checkbox" />
          </div>
          <div className="validate-input auto-approve" >
            <span className="focus-input2">Task Balance</span>
            <input className="input2" checked={input?.balances?.taskBalance || false} name="taskBalance" onChange={handleChange} type="checkbox" />
          </div>
          <div className="container-contact2-form-btn">
            <button type='submit' onClick={onSubmit}>Submit</button>
          </div>
        </form>
      </div >


    </div >
  );
};

export default AdminAddDailyTask;