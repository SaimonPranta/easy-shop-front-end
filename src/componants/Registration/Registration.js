import React, { useContext, useEffect, useState } from 'react';
import './Registration.css';
import Header from '../Header/Header';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import inputHandler from '../../Functions/inputHandler';
import cookieExpires from '../../Functions/cookieExpires';
import { userContext } from '../../App';

const Registation = () => {
    const [inputUser, setInputUser] = useState({});
    const [user, setUser] = useContext(userContext);
    const [message, setMessage] = useState({});

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state ? location.state.from.pathname : "/"

    useEffect(() => {
        user._id && navigate(from, { replace: true })
    }, [user])

    const fromInputHandler = (e) => {
        inputHandler(e, inputUser, setInputUser)
    }
    const handleFromSubmit = (e) => {
        e.preventDefault()

        if (inputUser.firstName && inputUser.lastName && inputUser.phoneNumber && inputUser.phoneNumber && inputUser.referNumber) {
            if (Math.floor(inputUser.phoneNumber)) {
                if (inputUser.password === inputUser.confirmPassword) {
                    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user`, {
                        method: "POST",
                        body: JSON.stringify(inputUser),
                        headers: {
                            'content-type': 'application/json; charset=UTF-8'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            document.cookie = `token = ${data.token}; ${cookieExpires(3)}; path=/`;
                            if (data.sucess) {
                                setMessage({ sucess: data.sucess })
                            }
                            if (data.failed) {
                                setMessage({ failed: data.failed })
                            }
                            if (data.data) {
                                data.data.password = null;
                                setUser(data.data)
                                navigate(from, { replace: true })
                            }
                            setTimeout(() => {
                                setMessage({})
                            }, 7000);
                        })
                }else {
                    setMessage({failed: 'Confirm Password does not metch with Password'})
                }
            } else {
                setMessage({failed: 'Phone Number must be number, please try again.'})
            }

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
                    <input type="password" placeholder="Password" name="password" value={inputUser.password ? inputUser.password : ""} required autoComplete="off" onChange={fromInputHandler} />
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" value={inputUser.confirmPassword ? inputUser.confirmPassword : ""} required autoComplete="off" onChange={fromInputHandler} />
                    <label>Referrence Number</label>
                    <input type="text" placeholder="Referrence Number" name="referNumber" value={inputUser.referNumber ? inputUser.referNumber : ""} required autoComplete="off" onChange={fromInputHandler} />

                    <input type="submit" value="Register account" />
                    <div className='resposeContainer'>
                        {
                            !message.failed && message.sucess && <p className='sucess ' style={{color: "blue"}} >{message.sucess}</p>
                        }
                        {
                            !message.sucess && message.failed && <p className='warning ' style={{color: "blue"}}  >{message.failed}</p>
                        }
                        
                    </div>
                    <div className='form-navigation d-flex'><p>Already have an account? <Link to="/login"><span style={{ color: "blue", cursor: "pointer" }}>Login</span></Link></p></div>
                </form>
            </section>
        </div>
    );
};

export default Registation;