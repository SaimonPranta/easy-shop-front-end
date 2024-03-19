import React, { useEffect, useState } from 'react';
import "./style.scss"
import AddSocialForm from './Modal/AddSocialForm/AddSocialForm';
import { getCooki } from '../../../shared/cooki';
import FailedTost from "../../../shared/components/FailedTost/FailedTost"
import SuccessTost from "../../../shared/components/SuccessTost/SuccessTost"
import { RiDeleteBinFill } from "react-icons/ri"
import { ToastContainer } from 'react-toastify';
const AdminHelpLine = () => {
    const [showModal, setShowModal] = useState(false)
    const [socialList, setSocialList] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/helpline-social`, {
            method: "GET",
            headers: {
                // 'Content-type': 'application/json; charset=UTF-8',
                authorization: `Bearer ${getCooki()}`
            },
        }).then(res => res.json())
            .then(data => {
                if (data.data) {
                    setSocialList(data.data)
                }
                if (data.massage) {
                    FailedTost(data.massage)
                }

            })
    }, [])
    const handleDeleteSocial = (id) => {
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/helpline-social?id=${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                authorization: `Bearer ${getCooki()}`
            },
        }).then(res => res.json())
            .then(data => {
                if (data.data) {
                    setSocialList((state) => {
                        const currentState = state.filter((info) => {
                            if (info._id === id) {
                                return false
                            } else {
                                return true
                            }
                        })
                        return [...currentState]
                    })
                }
                console.log("data ==>>", data)
                if (data.message) {
                    if (data.success) {
                        SuccessTost(data.message)
                    } else {
                        FailedTost(data.message)
                    }
                }

            })
    }

    const handleAddSocial = (e, input) => {
        e.preventDefault()
        if (!input.img ||
            !input.label ||
            !input.buttonName ||
            !input.link) {

            return
        }
        const fromData = new FormData()
        fromData.append("img", input.img)
        fromData.append("data", JSON.stringify(input))


        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/helpline-social`, {
            method: "POST",
            headers: {
                // 'Content-type': 'application/json; charset=UTF-8',
                authorization: `Bearer ${getCooki()}`
            }, body: fromData
        }).then(res => res.json())
            .then(data => {

                if (data.data) {
                    setSocialList((state) => {
                        return [...state, data.data]
                    })
                    setShowModal(false)
                }
                if (data.message) {
                    FailedTost(data.massage)
                }
            })
    }

    return (
        <div className='admin-help-line'>
            <div className='add-btn-container'>
                <button onClick={() => setShowModal(true)}>Add Communication Media</button>
            </div>
            <div className='social-media-list'>
                {
                    socialList.length > 0 && <div className='social-container'>
                        <div className='inner-container'>
                            {
                                socialList.map((info) => {
                                    return <div className='cart-container'>
                                        <button className='delete-btn' onClick={() => handleDeleteSocial(info._id)}><RiDeleteBinFill /></button>
                                        <img src={`${process.env.REACT_APP_SERVER_HOST_URL}/${info.img}`} alt='' />
                                        <div className='title-container'>
                                            <p>
                                                {info.label}
                                            </p>
                                            {info.phoneNumber && <p>
                                                {info.phoneNumber}
                                                {/* <button onClick={() => handleCopyBtn(info.phoneNumber)} ><MdFileCopy /></button> */}
                                            </p>}
                                        </div>
                                        <button>
                                            {
                                                info.buttonName
                                            }
                                        </button>
                                    </div>
                                })
                            }
                        </div>

                    </div>
                }
            </div>
            <AddSocialForm showModal={showModal} setShowModal={setShowModal} onSubmit={handleAddSocial} />

            <ToastContainer />

        </div>
    );
};

export default AdminHelpLine;