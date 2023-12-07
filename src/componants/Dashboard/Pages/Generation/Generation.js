import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../../../App';
import './Generation.css';
import SearchGenaration from "./SearchGenaraionMember/SearchGenaration";
import { getCooki } from '../../../../shared/cooki';

const Generation = () => {
    const [user, setUser] = useContext(userContext);
    const [userCount, setUserCount] = useState(0)
    const [condition, setCondition] = useState({})
    const [allUserContaienr, setAllUserContainer] = useState([])
    const [allUser, setAllUser] = useState([])

    useEffect(() => {
        const cooki = getCooki()
        if (cooki) {
            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/generation_user`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${cooki}`
                }
            }).then(res => res.json())
                .then(data => {
                    if (data.failed) {
                    } else {
                        setAllUser(data);
                        setAllUserContainer(data)
                    }
                })
        }
    }, []);

    if (user._id) {
        setTimeout(() => {
            const totalUser = Math.floor(user.generation_1.length) + Math.floor(user.generation_2.length) + Math.floor(user.generation_3.length) + Math.floor(user.generation_4.length) + Math.floor(user.generation_5.length) + Math.floor(user.generation_6.length) + Math.floor(user.generation_7.length) + Math.floor(user.generation_8.length) + Math.floor(user.generation_9.length) + Math.floor(user.generation_10.length);
            setUserCount(totalUser)
        }, 2000);
    }
    const ElementControl = () => {
        const curCondition = { ...condition }
        curCondition["search"] = curCondition.search ? false : true
        setCondition(curCondition)
    }

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
        <div className='generation-section m-3 text-white'>
            <div className='generation-top-section'>
                <div><h5>Your Reffer Number</h5> <span>{user.phoneNumber}</span></div>
                <div><h5>Your Upline Reffer Number</h5> <span>{user.referNumber}</span></div>
                <div><h5>Total Generation Members</h5> <span>{userCount}</span></div>
            </div>
            {
                !condition.search ? <div className='d-flex'>
                    <button type="button" onClick={ElementControl} className="btn btn-primary btn m-auto">Generation Search User</button>
                </div> : <>
                    <div className="input-group admin-search">
                        <div className='d-flex'>
                            <button type="button" onClick={ElementControl} className="btn btn-primary btn m-auto">Back to Generation</button>
                        </div>
                        <input type="text" className="form-control m-auto" aria-label="Text input with radio button" onChange={seach_handler} placeholder='Search by Phone Number' />
                    </div>
                </>
            }

            {
                !condition.search && <>
                    <div className='generation-title mt-2'>
                        <h4>Generation Status</h4>
                    </div>
                    <div className='generation-items'>
                        <div><h5>1st Generation</h5> <span>{user.generation_1 ? user.generation_1.length : 0}</span> <button><Link to="/generation/1"> view list</Link></button></div>
                        <div><h5>2nd Generation</h5> <span>{user.generation_2 ? user.generation_2.length : 0}</span> <button><Link to="/generation/2"> view list</Link></button></div>
                        <div><h5>3rd Generation</h5> <span>{user.generation_3 ? user.generation_3.length : 0}</span> <button><Link to="/generation/3"> view list</Link></button></div>
                        <div><h5>4th Generation</h5> <span>{user.generation_4 ? user.generation_4.length : 0}</span> <button><Link to="/generation/4"> view list</Link></button></div>
                        <div><h5>5th Generation</h5> <span>{user.generation_5 ? user.generation_5.length : 0}</span> <button><Link to="/generation/5"> view list</Link></button></div>
                        <div><h5>6th Generation</h5> <span>{user.generation_6 ? user.generation_6.length : 0}</span> <button><Link to="/generation/6"> view list</Link></button></div>
                        <div><h5>7th Generation</h5> <span>{user.generation_7 ? user.generation_7.length : 0}</span> <button><Link to="/generation/7"> view list</Link></button></div>
                        <div><h5>8th Generation</h5> <span>{user.generation_8 ? user.generation_8.length : 0}</span> <button><Link to="/generation/8"> view list</Link></button></div>
                        <div><h5>9th Generation</h5> <span>{user.generation_9 ? user.generation_9.length : 0}</span> <button><Link to="/generation/9"> view list</Link></button></div>
                        <div><h5>10th Generation</h5> <span>{user.generation_10 ? user.generation_10.length : 0}</span> <button><Link to="/generation/10"> view list</Link></button></div>
                    </div>
                </>
            }
            {
                condition.search && <SearchGenaration userr={allUserContaienr} />
            }
        </div>
    );
};

export default Generation;