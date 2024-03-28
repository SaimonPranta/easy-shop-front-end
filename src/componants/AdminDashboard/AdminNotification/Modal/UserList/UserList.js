import React from 'react';
import "./style.scss"
import { MdClose } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';

const UserList = ({title, listItems, setUserList}) => {
    return (
        <div className='user-list'>
            <div className='inner-container'>
                <div className='title-container'>
                    <h6>User list of {title} </h6> 
                    <span className='close' onClick={() => setUserList([])}><MdClose /></span> 
                </div>
                <div className='user-list-container'>
                {
                    listItems.map((user, index)=> {
                        return <div>
                            <FaUserCircle />
                            <h6>{`${user?.userID?.firstName} ${user?.userID?.firstName} (${user?.userID?.phoneNumber})`}</h6>
                        </div>
                    } )
                }
                </div>
            </div>

        </div>
    );
};

export default UserList;