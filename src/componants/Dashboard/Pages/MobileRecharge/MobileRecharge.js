import React, { useContext, useState } from 'react';
import './MobileRecharge.css';
import robi from '../../../../assets/images/sim_porvider_logo/robi.jpg';
import gp from '../../../../assets/images/sim_porvider_logo//grameenphone.jpg';
import banglalink from '../../../../assets/images/sim_porvider_logo/banglalink.jpg';
import airtel from '../../../../assets/images/sim_porvider_logo/airtel.jpg';
import teletalk from '../../../../assets/images/sim_porvider_logo/teletalk.jpg';
import { userContext } from '../../../../App';
import { getCooki } from '../../../../shared/cooki';



const MobileRecharge = () => {
    const [input, setInput] = useState({});
    const [message, setMessage] = useState({});
    const [user, setUser] = useContext(userContext);
    const cooki = getCooki()
    let count = 0


    const handleUpdateInput = (e) => {
        const currentInput = { ...input }
        const inputFildName = e.target.name;
        const inputFildValue = e.target.value;
        if (inputFildName === "amount") {
            if (Math.floor(inputFildValue) <= user.balance) {
                setMessage({})
                const floorValue = Math.floor(inputFildValue)
                currentInput[inputFildName] = floorValue
                setInput(currentInput)
            } else {
                setMessage({ failed: "Sorry, you can't request for more than your balance." })
            }

        } else {
            currentInput[inputFildName] = inputFildValue
            setInput(currentInput)
        }
        setInput(currentInput)
    };

    const mobileRechargeHandler = (e) => {
        e.preventDefault();
        const currnetInputStore = { ...input }
        const amountValue = document.getElementById("amount").value;
        if (!input.amount) {
            input["amount"] = Math.floor(amountValue)
        }
        if (input.simProvider && input.amount && input.number && input.simStatus) {
            if (Math.floor(input.number)) {
                if (Math.floor(input.amount) <= Math.floor(user.balance)) {
                    setMessage({})
                    if (input.amount >= 10) {
                        setMessage({})
                        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/mobile_rechare`, {
                            method: "POST",
                            body: JSON.stringify(input),
                            headers: {
                                'content-type': 'application/json; charset=UTF-8',
                                authorization: `Bearer ${cooki}`
                            }
                        })
                            .then(res => res.json())
                            .then(data => {
                                setInput({})
                                if (data.data) {
                                    const updatedUser = { ...data.data }
                                    setUser(updatedUser);
                                }
                                if (data.sucess) {
                                    setInput({})
                                    setMessage({ sucess: data.sucess });
                                    setTimeout(() => {
                                        setMessage({})
                                    }, 7000);
                                }
                                if (data.failed) {
                                    setInput(currnetInputStore)
                                    setMessage({ failed: data.failed });
                                    setTimeout(() => {
                                        setMessage({})
                                    }, 7000);
                                }
                            })
                        setInput({})
                    } else {
                        setMessage({ failed: "Sorry, you can't send money less then 10tk." })
                        setTimeout(() => {
                            setMessage({})
                        }, 7000);
                    }
                } else {
                    setMessage({ failed: "Sorry, you can't request for more than your balance." })
                }
            } else {
                setMessage({ failed: "Phone Number must be Number." })
            }


        } else {
            setMessage({ failed: "Please fill the form and try angain" })
            setTimeout(() => {
                setMessage({})
            }, 7000);
        }

    };


    return (
        <div className='text-white'>
            <div className='balance-transfer-section m-auto'>
                <h4>MOBILE RECHARGE</h4>
                <div>
                    <form onSubmit={mobileRechargeHandler}>
                        <div>
                            <label>Phone Number</label>
                            <input type="text" name="number" value={input.number ? input.number : ""} placeholder='Your Phone Number' onChange={handleUpdateInput} />
                        </div>
                        <div className='sim-contianer'>
                            <label>Select SIM Provider</label>
                            <div className='sim-provider-section'>
                                <div>
                                    <input type='radio' name="simProvider" value="robi" onChange={handleUpdateInput} />
                                    <img src={robi} alt="logo"></img>
                                </div>
                                <div>
                                    <input type='radio' name="simProvider" value="grameenphone" onChange={handleUpdateInput} />
                                    <img src={gp} alt="logo"></img>
                                </div>
                                <div>
                                    <input type='radio' name="simProvider" value="banglalink" onChange={handleUpdateInput} />
                                    <img src={banglalink} alt="logo"></img>
                                </div>
                                <div>
                                    <input type='radio' name="simProvider" value="airtel" onChange={handleUpdateInput} />
                                    <img src={airtel} alt="logo"></img>
                                </div>
                                <div>
                                    <input type='radio' name="simProvider" value="teletalk" onChange={handleUpdateInput} />
                                    <img src={teletalk} alt="logo"></img>
                                </div>
                            </div>
                        </div>
                        <div className='sim-status'>
                            <label className=''>Select SIM Status</label>
                            <div className='sim-conditon'>
                                <div>
                                    <input type="radio" value='Prepaid' name="simStatus" onChange={handleUpdateInput} />
                                    <label>Prepaid SIM</label>
                                </div>
                                <div>
                                    <input type="radio" value="Postpaid" name="simStatus" onChange={handleUpdateInput} />
                                    <label>Postpaid SIM</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label>Select Amount of TK</label>
                            <select name='amount' onChange={handleUpdateInput} id="amount">
                                <option value="20">20tk</option>
                                <option value="50">50tk</option>
                                <option value="100">100tk</option>
                            </select>
                        </div>
                        <div>
                            <input type="submit" value="Submit" />
                        </div>
                        <div className='resposeContainer' >
                            {
                                !message.failed && message.sucess && <p className='sucess'>{message.sucess}</p>
                            }
                            {
                                !message.sucess && message.failed && <p className='warning'>{message.failed}</p>
                            }
                        </div>
                    </form>
                </div>
            </div>

            <div className='balance-transfer-history-section mt-4 m-auto'>
                <h4>MOBILE RECHARGE HISTORY</h4>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Phone Number</th>
                                <th>SIM Provider</th>
                                <th>Amount of Tk</th>
                                <th>Date of Recharge</th>
                                <th>Recharge Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user && user.mobileRechareInfo && user.mobileRechareInfo.map((info) => {
                                    count++
                                    return <tr key={info.requestID}>
                                        <td>{count}</td>
                                        <td>{info.number}</td>
                                        <td>{info.simProvider}</td>
                                        <td>{info.amount}</td>
                                        <td>{info.date}</td>
                                        {
                                            info.apporoval ? <td className='approved'><button>Approved</button></td> : <td className='pending'><button>Pending</button></td>
                                        }
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default MobileRecharge;