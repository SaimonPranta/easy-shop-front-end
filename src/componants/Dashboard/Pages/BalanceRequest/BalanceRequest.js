import React, { useContext, useState } from 'react';
import './BalanceRequest.css';
import bkashLogo from '../../../../assets/images/payment_porvider_logo/bkash.jpg';
import nagadLogo from '../../../../assets/images/payment_porvider_logo/nogod.jpg';
import rocketLogo from '../../../../assets/images/payment_porvider_logo/dutch-bangla-rocket-logo.png';
import { FiCopy } from "react-icons/fi";
import { userContext } from '../../../../App';
import { getCooki } from '../../../../shared/cooki';
import SuccessTost from "../../../../shared/components/SuccessTost/SuccessTost"
import FailedTost from "../../../../shared/components/FailedTost/FailedTost"
import { ToastContainer } from 'react-toastify';


const BalanceRequest = () => {
    const [requestInfo, setRequestInfo] = useState({}); 
    const [user, setUser] = useContext(userContext);


    const cooki = getCooki()
    let count = 0



    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        SuccessTost("Copied")
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
                                SuccessTost(data.sucess) 
                            }
                            if (data.failed) {
                                setRequestInfo(currentInputContainer)
                                FailedTost(data.failed) 
                            }
                        })
                    setRequestInfo({})

                } else {
                    FailedTost("Sorry, you can't send money less then 10tk.") 
                }
            } else {
                FailedTost("Sorry, Amount and Phone Number must be Number") 
            }
        } else {
            FailedTost("Please fill the form and try again") 
        }
    };




    return (
        <div className='text-white'>
            <div className='balance-transfer-section m-auto'>
                <h4>Add Money</h4>
                <div>
                    <form onSubmit={balanceTransferHandle}>
                        <div className='notice'>
                            অ্যাকাউন্ট একটিভ করার জন্য আপনার বিকাশ অথবা নগদ অথবা রকেট অ্যাকাউন্ট  থেকে নিচের যেকোনো একটা নম্বরে ১৫০ টাকা সেন্ড মানি করুন। এই ১৫০ টাকা কোনো এড ফি বা ইনভেস্ট নয় এই ১৫০ টাকা আপনার একাউন্টে ডিপোজিট হবে।
                        </div>
                        <div className='payment-provider-section '>
                            <div>
                                <img src={bkashLogo} alt="logo"></img>
                                <input type='text' value='01906705620' />
                                <label >Personal</label>
                                <span className='copy-btn'><FiCopy onClick={() => copyText("01906705620")} /></span>
                            </div>
                            <div>
                                <img src={nagadLogo} alt="logo"></img>
                                <input type='text' value='01906705620' />
                                <label >Personal</label>

                                <span className='copy-btn'><FiCopy onClick={() => copyText("01906705620")} /></span>
                            </div>
                            <div>
                                <img src={rocketLogo} alt="logo"></img>
                                <input type='text' value='019341438756' />
                                <label >Personal</label>

                                <span className='copy-btn'><FiCopy onClick={() => copyText("019341438756")} /></span>
                            </div>
                        </div>
                        <div className='notice'>
                            সেন্ড মানি সাকসেসফুল হলে নিচের ফর্মটি সঠিকভাবে পূরণ করে সাবমিট করুন।
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
                                <th>Payment Method</th>
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
            <ToastContainer />
        </div>
    );
};

export default BalanceRequest;