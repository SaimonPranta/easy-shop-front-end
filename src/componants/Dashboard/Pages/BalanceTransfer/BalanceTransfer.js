import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../../../App';
import './BalanceTransfer.css';


const BalanceTransfer = () => {
    const [condition, setConditon] = useState({
        loadUser: false
    })
    const [user, setUser] = useContext(userContext);
    const [balanceInfo, setBalanceInfo] = useState({});
    const [message, setMessage] = useState({});

    const cooki = document.cookie.split("=")[1];

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                const currentCondition = {
                    loadUser: true
                }
                setConditon(currentCondition)
            }, 2000);
        }
    }, []);

    const handleUpdateInput = (e) => {
        const currentInput = { ...balanceInfo }
        const inputFildName = e.target.name;
        const inputFildValue = e.target.value;
        if (inputFildName === "amount") {
            const floorValue = Math.floor(inputFildValue)
            currentInput[inputFildName] = floorValue
        }else{
            currentInput[inputFildName] = inputFildValue
        }
        
        setBalanceInfo(currentInput);
        if (user.balance <= currentInput.amount) {
            setMessage({ failed: "The provided ammount are higher than your balance." });
        } else {
            setMessage({});
        }
    };


    const balanceTransferHandle = (e) => {
        e.preventDefault();
        const selectValue = document.getElementById("select-user").value;
        if (!balanceInfo.selectUser) {
            balanceInfo["selectUser"] = selectValue;
        }
        if (balanceInfo.selectUser && balanceInfo.amount) {
            if (balanceInfo.amount >= 10) {
                if (user.balance >= balanceInfo.amount) {
                    setMessage({})
                    fetch("http://localhost:8000/balance_transfer", {
                        method: "POST",
                        body: JSON.stringify(balanceInfo),
                        headers: {
                            'content-type': 'application/json; charset=UTF-8',
                            authorization: `Bearer ${cooki}`
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            setBalanceInfo({})
                            if (data.data) {
                                const updatedUser = { ...data.data }
                                setUser(updatedUser);
                            }
                            if (data.sucess) {
                                setMessage({sucess: data.sucess});
                                setTimeout(() => {
                                    setConditon({})
                                }, 7000);
                            }
                            if (data.failed) {
                                setMessage({failed: data.failed});
                                setTimeout(() => {
                                    setConditon({})
                                }, 7000);
                            }
                        })
                } else {
                    setMessage({ failed: "The provided ammount are higher than your balance." })
                }
            } else {
                setMessage({ failed: "sorry, you can't send money less then 10tk." })
            }
        }

    };
    console.log(message)
    

    return (
        <div className='text-white'>
            <div className='balance-transfer-section m-auto'>
                <h4>BALANCE TRANSFER</h4>
                <div>
                    <form onSubmit={balanceTransferHandle}>
                        <div>
                            <label>Select User</label>
                            <select name='selectUser' onClick={handleUpdateInput} id="select-user">
                                {
                                    condition.loadUser && user.generation_1.map((userId) => <option key={userId} value={userId} >{userId}</option>)
                                }
                            </select>
                        </div>
                        <div>
                            <label>Amount</label>
                            <input type="number" name="amount" value={balanceInfo.amount ? balanceInfo.amount : ""} placeholder='amount of TK' onChange={handleUpdateInput} />
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
                <h4>BALANCE TRANSFER HISTORY</h4>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Transfer Number</th>
                                <th>Transfer Ammount</th>
                                <th>Transfer Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.balanceTransperInfo && user.balanceTransperInfo.map((userId) => {
                                    return <tr key={userId.number}>
                                        <td>{userId.name}</td>
                                        <td>{userId.number}</td>
                                        <td>{userId.amount}</td>
                                        <td>{userId.date}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    {/* <table>
                        <tr>
                            <th>User Name</th>
                            <th>Transfer Number</th>
                            <th>Transfer Ammount</th>
                            <th>Transfer Date</th>
                        </tr>
                        <tr>
                            <td>Mehadi Hasan</td>
                            <td>02445523</td>
                            <td>50tk</td>
                            <td>12-4-20222</td>
                        </tr>
                        <tr>
                            <td>Mehadi Hasan</td>
                            <td>02445523</td>
                            <td>50tk</td>
                            <td>12-4-20222</td>
                        </tr>
                        <tr>
                            <td>Mehadi Hasan</td>
                            <td>02445523</td>
                            <td>50tk</td>
                            <td>12-4-20222</td>
                        </tr>
                        <tr>
                            <td>Mehadi Hasan</td>
                            <td>02445523</td>
                            <td>50tk</td>
                            <td>12-4-20222</td>
                        </tr>
                        <tr>
                            <td>Mehadi Hasan</td>
                            <td>02445523</td>
                            <td>50tk</td>
                            <td>12-4-20222</td>
                        </tr>

                    </table> */}
                </div>
            </div>

        </div>
    );
};

export default BalanceTransfer;