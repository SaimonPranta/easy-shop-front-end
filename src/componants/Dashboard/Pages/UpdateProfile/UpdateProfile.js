import React, { useContext, useState } from 'react';
import { userContext } from '../../../../App';
import inputHandler from '../../../../Functions/inputHandler';
import { getCooki } from '../../../../shared/cooki';

const UpdateProfile = () => {
    const [condition, setConditon] = useState({});
    const [user, setUser] = useContext(userContext);

    const cooki = getCooki()

    const handleUpdateInput = (e) => {
        inputHandler(e, user, setUser)
    };
    const phoenInputHandle = () => {
        setTimeout(() => {
            setConditon({})
        }, 5000);
        setConditon({ failed: "Phone number are not changeable." })
    };

    const userUpdateHandle = (e) => {
        e.preventDefault()
        if (user.firstName && user.lastName) {
            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user`, {
                method: "PATCH",
                body: JSON.stringify(user),
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
                    if (data.message) {
                        setConditon(data.message);
                        setTimeout(() => {
                            setConditon({})
                        }, 7000);
                    }
                })
        }
    }

    return (
        <div className='text-white'>
            <div className='balance-transfer-section m-auto'>
                <h4>UPDATE PROFILE</h4>
                <div>
                    <form onSubmit={userUpdateHandle}>
                        <div>
                            <label>First Name</label>
                            <input type="text" name='firstName' value={user.firstName ? user.firstName : " "} onChange={handleUpdateInput} />
                        </div>
                        <div>
                            <label>Last Name</label>
                            <input value={user.lastName ? user.lastName : " "} type='text' name='lastName' onChange={handleUpdateInput} />
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <input value={user.phoneNumber ? user.phoneNumber : " "} type='text' name='phoneNumber' onChange={phoenInputHandle} />
                        </div>

                        <div>
                            <input type="submit" value="Update" />
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

export default UpdateProfile;