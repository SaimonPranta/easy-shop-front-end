import React, { useState } from 'react';
import inputHandler from '../../../../Functions/inputHandler';
import { getCooki } from '../../../../shared/cooki';

const ChangePassword = () => {
    const [condition, setConditon] = useState({})
    const [user, setUser] = useState({});

    const cooki = getCooki()

    const handleUpdateInput = (e) => {
        inputHandler(e, user, setUser)
    };

    const userPasswordChangeHandle = (e) => {
        e.preventDefault()
        if (user.oldPassword && user.newPassword && user.confirmPassword) {
            if (user.newPassword == user.confirmPassword) {
                fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/passwordReset`, {
                    method: "PATCH",
                    body: JSON.stringify(user),
                    headers: {
                        'content-type': 'application/json; charset=UTF-8',
                        authorization: `Bearer ${cooki}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        setConditon(data);
                        setTimeout(() => {
                            setConditon({})
                        }, 7000);
                    })
            } else {
                setConditon({ failed: "Confirm password doesn't match, please try again." });
                setTimeout(() => {
                    setConditon({})
                }, 7000);
            }
        }
    }

    return (
        <div className='text-white'>
            <div className='balance-transfer-section m-auto'>
                <h4>CHANGE PASSWORD</h4>
                <div>
                    <form onSubmit={userPasswordChangeHandle}>
                        <div>
                            <label>Old Password</label>
                            <input type="password" value={user.oldPassword ? user.oldPassword : ""} name="oldPassword" placeholder='Old Password' onChange={handleUpdateInput} />
                        </div>
                        <div>
                            <label>New Password</label>
                            <input type="password" value={user.newPassword ? user.newPassword : ""} name="newPassword" placeholder='New Password' onChange={handleUpdateInput} />
                        </div>
                        <div>
                            <label>Confirm Password</label>
                            <input type="password" value={user.confirmPassword ? user.confirmPassword : ""} name="confirmPassword" placeholder='Confirm Password' onChange={handleUpdateInput} />
                        </div>

                        <div>
                            <input type="submit" value="Submit" />
                        </div>
                        <div className='resposeContainer'>
                            {
                                !condition.failed && condition.sucess && <p className='sucess'>{condition.sucess}</p>
                            }
                            {
                                !condition.sucess && condition.failed && <p className='warning'>{condition.failed}</p>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;

