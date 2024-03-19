import React, { useContext, useEffect, useState } from 'react';
import './Registration.css';
import Header from '../Header/Header';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import inputHandler from '../../Functions/inputHandler';
import cookieExpires from '../../Functions/cookieExpires';
import { userContext } from '../../App';
import Loading from '../Loading/Loading';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import SuccessTost from "../../shared/components/SuccessTost/SuccessTost"
import FailedTost from "../../shared/components/FailedTost/FailedTost"
import { ToastContainer } from 'react-toastify';


const Registation = () => {
    const [inputUser, setInputUser] = useState({});
    const [user, setUser] = useContext(userContext);
    const [message, setMessage] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [showEye, setShowEye] = useState({
        password: false,
        confirmPassword: false,
    })
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state ? location.state.from.pathname : "/"

    useEffect(() => {
        user._id && navigate(from, { replace: true })
    }, [user])



    const fromInputHandler = (e) => {
        // if (e.target.name === "phoneNumber") {
        // const currentInput = { ...inputUser }

        // currentInput[e.target.name] = e.target.value.replaceAll(" ", "")
        // setInputUser(currentInput)
        // } else if (e.target.name === "referNumber") {
        // const currentInput = { ...inputUser }

        // currentInput[e.target.name] = e.target.value.replaceAll(" ", "")
        // setInputUser(currentInput)

        // } else {
        inputHandler(e, inputUser, setInputUser)
        // }
    }
    const handleFromSubmit = (e) => {
        e.preventDefault()

        if (inputUser.firstName && inputUser.lastName && inputUser.phoneNumber && inputUser.phoneNumber && inputUser.referNumber) {
            // if (inputUser.phoneNumber.match(/0+/gi) && inputUser.phoneNumber.match(/1+/gi)) {
            // if (!inputUser.phoneNumber.match(/[a-z]/gi)) {
            if (Math.floor(inputUser.phoneNumber)) {

                if (inputUser.password === inputUser.confirmPassword) {
                    setIsLoading(true)
                    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user`, {
                        method: "POST",
                        body: JSON.stringify(inputUser),
                        headers: {
                            'content-type': 'application/json; charset=UTF-8'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            setIsLoading(false)
                            document.cookie = `token === ${data.token}; ${cookieExpires(3)}; path=/`;
                            if (data.sucess) {
                                SuccessTost(data.sucess)

                            }
                            if (data.failed) {
                                FailedTost(data.failed)
                            }
                            if (data.data) {
                                SuccessTost("Successfully created your account")
                                data.data.password = null;
                                setUser(data.data)
                                navigate(from, { replace: true })
                            }
                            setTimeout(() => {
                                setMessage({})
                            }, 7000);
                        })
                } else {
                    FailedTost('Confirm Password does not match with Password.')
                }
            } else {
                FailedTost('Phone must be a Number, please try again.')
            }
            // } else {
            //     setMessage({ failed: 'Phone must be a Number, please try again.' })
            // }

            // } else {
            //     setMessage({ failed: 'Your Phone Number Not like a number, please try again.' })
            // }

        } else {
            FailedTost("You can't submit without filling full form.") 
        }
    }





    return (
        <div className='container'>
            <div>
                <Header />
            </div>
            <section className='authentication m-auto'>
                <form onSubmit={handleFromSubmit}>
                    <h6>Register an account</h6>
                    <label>First Name</label>
                    <input type="text" placeholder="First Name" name="firstName" value={inputUser.firstName ? inputUser.firstName : ""} required autoComplete="off" onChange={fromInputHandler} />
                    <label>last Name</label>
                    <input type="text" placeholder="Last Name" name="lastName" value={inputUser.lastName ? inputUser.lastName : ""} required autoComplete="off" onChange={fromInputHandler} />
                    <label>Phone Number</label>
                    <input type="text" placeholder="Phone Number" name="phoneNumber" value={inputUser.phoneNumber ? inputUser.phoneNumber : ""} required autoComplete="off" onChange={fromInputHandler} />
                    <label>Password</label>
                    <div className='eye-container'>
                        <input type={showEye.password ? "text" : "password"} placeholder="Password" name="password" value={inputUser.password ? inputUser.password : ""} required autoComplete="off" onChange={fromInputHandler} />
                        {
                            showEye.password ? <HiEye onClick={() => {
                                setShowEye((state) => {
                                    return {
                                        ...state,
                                        password: false
                                    }
                                })
                            }} /> : <HiEyeOff onClick={() => {
                                setShowEye((state) => {
                                    return {
                                        ...state,
                                        password: true
                                    }
                                })
                            }} />
                        }
                    </div>
                    <label>Confirm Password</label>
                    <div className='eye-container'>
                        <input type={showEye.confirmPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmPassword" value={inputUser.confirmPassword ? inputUser.confirmPassword : ""} required autoComplete="off" onChange={fromInputHandler} />
                        {
                            showEye.confirmPassword ? <HiEye onClick={() => {
                                setShowEye((state) => {
                                    return {
                                        ...state,
                                        confirmPassword: false
                                    }
                                })
                            }} /> : <HiEyeOff onClick={() => {
                                setShowEye((state) => {
                                    return {
                                        ...state,
                                        confirmPassword: true
                                    }
                                })
                            }} />
                        }

                    </div>
                    <label>Your Upline Referrence Number</label>
                    <input type="text" placeholder="Referrence Number" name="referNumber" value={inputUser.referNumber ? inputUser.referNumber : ""} required autoComplete="off" onChange={fromInputHandler} />

                    <div className='notice-container'>
                        <p>আপনি যার মাধ্যমে রেজিষ্ট্রেশন করবেন তার থেকে রেফারেন্স নাম্বার নিবেন</p>
                    </div>

                    <input type="submit" value="Register account" />
                    <div className='resposeContainer'>
                        {
                            !message.failed && message.sucess && <p className='sucess ' style={{ color: "blue" }} >{message.sucess}</p>
                        }
                        {
                            !message.sucess && message.failed && <p className='warning ' style={{ color: "blue" }}  >{message.failed}</p>
                        }

                    </div>
                    <div className='form-navigation d-flex'><p>Already have an account? <Link to="/login"><span style={{ color: "blue", cursor: "pointer" }}>Login</span></Link></p></div>
                </form>
            </section>
            {
                isLoading && <Loading />
            }

            <ToastContainer />
        </div>
    );
};

export default Registation;