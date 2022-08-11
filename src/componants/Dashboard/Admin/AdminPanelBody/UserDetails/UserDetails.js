import React from 'react';
import './UserDetails.css';
import dateFormater from '../../../../../Functions/dateFormater';


const UserDetails = ({ currentUsr }) => {
    const { totalIncome, firstName, lastName, phoneNumber, balance, shoppingBalance, rank, joinDate } = currentUsr;
    const { generation_1, generation_2, generation_3, generation_4, generation_5, generation_6, generation_7, generation_8, generation_9, generation_10 } = currentUsr;

    return (
        <div className='m-auto  user-details p-3'>
            <div className="m-auto text-white">
                    <ul>
                        <li>Name:<span> {firstName} {lastName}</span></li>
                        <li>Number:<span> {phoneNumber}</span></li>
                        <li>Rank:<span>{rank}</span></li>
                        <li>Balance:<span> {balance}</span></li>
                        <li>Total Income:<span> {totalIncome}</span></li>
                        <li>Shopping Balance:<span> {shoppingBalance}</span></li>
                        <li>Joining Date:<span> {dateFormater(joinDate)}</span></li>
                        <li>1st Generation:<span> {generation_1.length}</span></li>
                        <li>2st Generation:<span> {generation_2.length}</span></li>
                        <li>3st Generation:<span> {generation_3.length}</span></li>
                        <li>4st Generation:<span> {generation_4.length}</span></li>
                        <li>5st Generation:<span> {generation_5.length}</span></li>
                        <li>6st Generation:<span> {generation_6.length}</span></li>
                        <li>7st Generation:<span> {generation_7.length}</span></li>
                        <li>8st Generation:<span> {generation_8.length}</span></li>
                        <li>9st Generation:<span> {generation_9.length}</span></li>
                        <li>10st Generation:<span> {generation_10.length}</span></li>
                    </ul>
                </div>
        </div>
    );
};

export default UserDetails;