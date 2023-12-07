import React, { useContext, useState } from 'react';
import './BalanceRequest.css';
import bkashLogo from '../../../../assets/images/payment_porvider_logo/bkash.jpg';
import nagadLogo from '../../../../assets/images/payment_porvider_logo/nogod.jpg';
import rocketLogo from '../../../../assets/images/payment_porvider_logo/dutch-bangla-rocket-logo.png';
import { FiCopy } from "react-icons/fi";
import { userContext } from '../../../../App';
import { getCooki } from '../../../../shared/cooki';


const BalanceRequest = () => {
    const [requestInfo, setRequestInfo] = useState({});
    const [message, setMessage] = useState({});
    const [user, setUser] = useContext(userContext);


    const cooki = getCooki()
    let count = 0



    const copyText = (e) => {
        const copyBtn = e.target.parentNode.parentNode.childNodes[1];
        const copedNotice = e.target.parentNode.parentNode.childNodes[2];
        copyBtn.select()
        document.execCommand("copy");

        copedNotice.classList.add('active-notice');
        setTimeout(() => {
            copedNotice.classList.remove('active-notice');
        }, 2000);
    };

    const inputHandler = (e) => {
        const currentInput = { ...requestInfo }
        const inputFildName = e.target.name;
        const inputFildValue = e.target.value;
        if (inputFildName === "amount") {

            const floorValue = Math.floor(inputFildValue)
            currentInput[inputFildName] = floorValue
            setRequestInfo(currentInput)


        } else if (inputFildName === "number") {
            currentInput[inputFildName] = inputFildValue
            setRequestInfo(currentInput)
        } else {
            currentInput[inputFildName] = inputFildValue
            setRequestInfo(currentInput)
        }
        setRequestInfo(currentInput)
    };

    const balanceTransferHandle = (e) => {
        e.preventDefault();
        const currentInputContainer = { ...requestInfo }
        const providerValue = document.getElementById("porvider").value;
        if (!requestInfo.provider) {
            requestInfo["provider"] = providerValue;
        }
        if (requestInfo.provider && requestInfo.amount && requestInfo.number) {
            if (Math.floor(requestInfo.amount) && Math.floor(requestInfo.number)) {
                if (requestInfo.amount >= 10) {
                    setMessage({})
                    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/balance_request`, {
                        method: "POST",
                        body: JSON.stringify(requestInfo),
                        headers: {
                            'content-type': 'application/json; charset=UTF-8',
                            authorization: `Bearer ${cooki}`
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.data) {
                                const updatedUser = { ...data.data }
                                setUser(updatedUser);
                            }
                            if (data.sucess) {
                                setRequestInfo({})
                                setMessage({ sucess: data.sucess });
                                setTimeout(() => {
                                    setMessage({})
                                }, 7000);
                            }
                            if (data.failed) {
                                setRequestInfo(currentInputContainer)
                                setMessage({ failed: data.failed });
                                setTimeout(() => {
                                    setMessage({})
                                }, 7000);
                            }
                        })
                        setRequestInfo({})

                } else {
                    setMessage({ failed: "Sorry, you can't send money less then 10tk." })
                    setTimeout(() => {
                        setMessage({})
                    }, 7000);
                }
            } else {
                setMessage({ failed: "Sorry, Amount and Phone Number must be Number" })
                setTimeout(() => {
                    setMessage({})
                }, 700);
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
                <h4>CREATE BALANCE REQUEST</h4>
                <div>
                    <form onSubmit={balanceTransferHandle}>
                        <div className='payment-provider-section '>
                            <div>
                                <img src={bkashLogo} alt="logo"></img>
                                <input type='text' value='01906705620' />
                                <label >Personal</label>
                                <span className='copy-btn'><FiCopy onClick={copyText} /></span>
                            </div>
                            <div>
                                <img src={nagadLogo} alt="logo"></img>
                                <input type='text' value='01906705620' />
                                <label >Personal</label>

                                <span className='copy-btn'><FiCopy onClick={copyText} /></span>
                            </div>
                            <div>
                                <img src={rocketLogo} alt="logo"></img>
                                <input type='text' value='019341438756' />
                                <label >Personal</label>

                                <span className='copy-btn'><FiCopy onClick={copyText} /></span>
                            </div>
                        </div>
                        <div>
                            <label>Select Payment Method</label>
                            <select name='provider' onClick={inputHandler} id="porvider">
                                <option value="Bkash">bKash</option>
                                <option value="Rocket">Rocket</option>
                                <option value="Nagad">Nagad</option>
                            </select>
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <input type="text" name="number" placeholder='Your Phone Number' value={requestInfo.number ? requestInfo.number : ""} onChange={inputHandler} />
                        </div>
                        <div>
                            <label>Amount of TK</label>
                            <input type="numbe" name="amount" placeholder='amount of TK' value={requestInfo.amount ? requestInfo.amount : ""} onChange={inputHandler} />
                        </div>
                        <div>
                            <input type="submit" value="Submit" />
                        </div>
                        <div className='resposeContainer'>
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
                <h4>BALANCE REQUEST HISTORY</h4>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Paymented Method</th>
                                <th>Requested Number</th>
                                <th>Requested Amount</th>
                                <th>Request Date</th>
                                <th>Request Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user && user.balanceRequestInfo && user.balanceRequestInfo.map((reqInfo) => {
                                    count++
                                    return <tr key={reqInfo.requestID}>
                                        <td>{count}</td>
                                        <td>{reqInfo.provider}</td>
                                        <td>{reqInfo.number}</td>
                                        <td>{reqInfo.amount}</td>
                                        <td>{reqInfo.date}</td>
                                        {
                                            reqInfo.apporoval ? <td className='approved'><button>Approved</button></td> : <td className='pending'><button>Pending</button></td>
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

export default BalanceRequest;