import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { allUserContext } from '../AdminPanelBody';

const AllUser = () => {
    const [allUser, setAllUser] = useContext(allUserContext)
    const [allUserContaienr, setAllUserContainer] = useState([]);
    let count = 0;

    useEffect(() => {
        if (allUser.length > 0) {
            setAllUserContainer(allUser)
        }
    }, [allUser]);

    const seach_handler = (event) => {
        let inputValue = event.target.value.toString().length > 0 ? event.target.value.toString() : "0";
        if (inputValue == 0) {
            setAllUserContainer(allUser)
        } else {
            let currentUser = allUserContaienr.filter((valuee) => {
                let stringValue = valuee.phoneNumber.toString()
                let phoneNumValue = stringValue.length > 0 ? stringValue.toString() : "0"
                let varifiying = phoneNumValue.includes(inputValue)
                return varifiying
            })
            setAllUserContainer(currentUser)
        }
    }



    return (
        <>
            <div class="input-group">
                <input type="text" class="form-control" aria-label="Text input with radio button" onChange={seach_handler} placeholder='Search by Phone Number' />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>User ID</th>
                        <th>PhoneNumber</th>
                        <th>Status</th>
                        <th colspan="2">Option</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUserContaienr && allUserContaienr.length > 0 && allUserContaienr.map((user) => {
                            count++
                            return <tr>
                                <td>{count}</td>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user._id}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.isActive ? "Active" : "Unactive"}</td>
                                <td><Link to={`/user/${user._id}`}>View Details</Link></td>
                                <td className='bg-primary'> <Link to={`/edit_user/${user._id}`}>Edit Details</Link></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

        </>
    );
};

export default AllUser;