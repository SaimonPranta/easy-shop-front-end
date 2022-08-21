import React from 'react';
import './UserDetails.css';


const UserDetails = ({ currentUsr }) => {
    const { firstName, lastName, phoneNumber, referNumber, shoppingBalance, rank, joinDate } = currentUsr;
    const { generation_1, generation_2, generation_3, generation_4, generation_5, generation_6, generation_7, generation_8, generation_9, generation_10 } = currentUsr;

    return (
        <div className='m-auto  user-details p-3'>
            <div className="m-auto text-white">
                    <ul>
                        <li>Name:<span> {firstName} {lastName}</span></li>
                        <li>Number:<span> {phoneNumber}</span></li>
                        <li>Upline Refer Number:<span> {referNumber}</span></li>
                        <li>Rank:<span>{rank}</span></li>
                        <li>Shopping Balance:<span> {shoppingBalance}</span></li>
                        <li>Joining Date:<span> {joinDate}</span></li>
                        <li>Total Generation Member:<span> { generation_1.length + generation_2.length + generation_3.length + generation_4.length + generation_5.length + generation_6.length + generation_7.length + generation_8.length + generation_9.length + generation_10.length}</span></li>
                        <li>1st Generation:<span> {generation_1.length}</span></li>
                        <li>2st Generation:<span> {generation_2.length}</span></li>
                        <li>3rd Generation:<span> {generation_3.length}</span></li>
                        <li>4th Generation:<span> {generation_4.length}</span></li>
                        <li>5th Generation:<span> {generation_5.length}</span></li>
                        <li>6th Generation:<span> {generation_6.length}</span></li>
                        <li>7th Generation:<span> {generation_7.length}</span></li>
                        <li>8th Generation:<span> {generation_8.length}</span></li>
                        <li>9th Generation:<span> {generation_9.length}</span></li>
                        <li>10th Generation:<span> {generation_10.length}</span></li>
                    </ul>
                </div>
        </div>
    );
};

export default UserDetails;