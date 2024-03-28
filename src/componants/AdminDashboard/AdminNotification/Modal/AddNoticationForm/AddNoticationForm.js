import React, { useState } from 'react';
import "./style.scss"
import { getCooki } from '../../../../../shared/cooki';
import { IoClose } from 'react-icons/io5';

const AddSocialForm = ({ showModal, setShowModal, onSubmit }) => {
    const [input, setInput] = useState({ selectedUser: [] })
    const [userList, setUserList] = useState([])
    const [showList, setShowList] = useState(false)

    const handleChange = (e) => {
        const name = e.target.name;

        if (name === "img") {
            setInput((state) => {
                return {
                    ...state,
                    [name]: e.target.files[0]
                }
            })
        } else {
            const value = e.target.value

            setInput((state) => {
                if (name === "allowNotice") {
                     state["selectedUser"] = []
                }
                return {
                    ...state,
                    [name]: value
                }
            })
        }

    }

    const handleSearchUser = (e) => {
        const value = e.target.value;
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/users?page=${1}&search=${value}`, {
            method: "GET",
            headers: {
                // 'Content-type': 'application/json; charset=UTF-8',
                authorization: `Bearer ${getCooki()}`
            },
        }).then(res => res.json())
            .then(data => {
                console.log("data --->>", data)
                if (data.data) {
                    setShowList(true)

                    setUserList(data.data)
                }
                // if (data.massage) {
                //     FailedTost(data.massage)
                // }

            })
    }

    console.log("input", input)

    if (!showModal) {
        return <></>
    }
    return (
        <div className='add-social-form' >
            <form autoComplete='off'>
                <div>
                    <label> Image </label>
                    <input type='file' name='img' onChange={handleChange} />
                </div>
                <div>
                    <label>title</label>
                    <input type='text' name='title' value={input.title} onChange={handleChange} />
                </div>
                <div>
                    <label>Description</label>
                    <input type='text' name='description' value={input.description} onChange={handleChange} />
                </div>
                <div>
                    <label>Expired Date</label>
                    <input type='date' name='expireTime' value={input.expireTime} onChange={handleChange} />
                </div>
                {
                    input?.selectedUser?.length === 0 && <div>
                        <label>Notice Allow For</label>
                        <select name='allowNotice' value={input.allowNotice} onChange={handleChange} >
                            <option hidden>---select---</option>
                            <option value="">None</option>
                            <option value="activeUser">Active user</option>
                            <option value="nonActiveUser">Non Active user</option>
                            <option value="allUser">All user</option>
                        </select>
                    </div>
                }
                {
                    !input?.allowNotice && <div className='user-list-container'>
                        <label>Add User</label>
                        <input type='text' name='addUser' value={input.addUser} onChange={handleSearchUser} />
                        {showList && <div className='user-list'>
                            <ul>
                                {userList?.map((user, index) => {
                                    if (input?.selectedUser?.find((info) => info.phoneNumber === user.phoneNumber)) {
                                        return <></>
                                    }
                                    return <li key={index} onClick={() => {
                                        setShowList(false)
                                        setInput((state) => {
                                            return {
                                                ...state,
                                                selectedUser: [...state.selectedUser, { phoneNumber: user.phoneNumber, userID: user._id }]
                                            }
                                        })
                                    }}>
                                        <h6>{`${user.firstName} ${user.lastName}`} ({user.phoneNumber})</h6>
                                    </li>
                                })}
                            </ul>
                        </div>}
                    </div>
                }

                <div className='tag-list'>
                    {
                        input?.selectedUser?.map((info, index) => {
                            return <p key={index}>{info.phoneNumber} <span onClick={() => {
                                setInput((state) => {
                                    delete state["allowNotice"]
                                    return {
                                        ...state,
                                        selectedUser: state?.selectedUser?.filter((item) => item.phoneNumber !== info.phoneNumber)
                                    }
                                })
                            }}> <IoClose /></span></p>
                        })
                    }
                </div>

                <div className='action-btn-container'>
                    <button onClick={() => setShowModal(false)} >Cancel</button>
                    <button type='button' onClick={(e) => onSubmit(e, input)}>Submit</button>
                </div>
            </form >
        </div >
    );
};

export default AddSocialForm;