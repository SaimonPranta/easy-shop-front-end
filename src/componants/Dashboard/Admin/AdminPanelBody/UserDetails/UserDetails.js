import React from 'react';
import './UserDetails.css';
import dateFormater from '../../../../../Functions/dateFormater';


const UserDetails = ({ currentUsr }) => {
    const { _id, firstName, lastName, phoneNumber, balance, shoppingBalance, rank, joinDate } = currentUsr;
    const { generation_1, generation_2, generation_3, generation_4, generation_5, generation_6, generation_7, generation_8, generation_9, generation_10 } = currentUsr;

    return (
        <div className='m-auto  user-details p-3'>
            <div className="m-auto text-white">
                    <ul>
                        <li>Name:</li>
                        <li>{firstName} {lastName}</li>
                        <li>Number:</li>
                        <li>{phoneNumber}</li>
                        <li>ID:</li>
                        <li>{_id}</li>
                        <li>Rank:</li>
                        <li>{rank}</li>
                        <li>Balance:</li>
                        <li>{balance}</li>
                        <li>Shopping Balance:</li>
                        <li>{shoppingBalance}</li>
                        <li>Joining Date:</li>
                        <li>{dateFormater(joinDate)}</li>
                        <li>1st Generation:</li>
                        <li>{generation_1.length}</li>
                        <li>1st Generation:</li>
                        <li>{generation_2.length}</li>
                        <li>1st Generation:</li>
                        <li>{generation_3.length}</li>
                        <li>1st Generation:</li>
                        <li>{generation_4.length}</li>
                        <li>1st Generation:</li>
                        <li>{generation_5.length}</li>
                        <li>1st Generation:</li>
                        <li>{generation_6.length}</li>
                        <li>1st Generation:</li>
                        <li>{generation_7.length}</li>
                        <li>1st Generation:</li>
                        <li>{generation_8.length}</li>
                        <li>1st Generation:</li>
                        <li>{generation_9.length}</li>
                        <li>1st Generation:</li>
                        <li>{generation_10.length}</li>
                    </ul>
                </div>
        </div>
    );
};

export default UserDetails;