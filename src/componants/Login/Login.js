import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userContext } from '../../App';
import cookieExpires from '../../Functions/cookieExpires';
import inputHandler from '../../Functions/inputHandler';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import { getCooki } from '../../shared/cooki';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { GoMail } from 'react-icons/go';
import { FiLock } from 'react-icons/fi';
import TopHeader from '../TopHeader/TopHeader';

const Login = () => {
    const [inputUser, setInputUser] = useState({});
    const [message, setMessage] = useState({});
    const [showEye, setShowEye] = useState({ password: false });
    const [isLoagin, setIsLoading] = useState(true)
    const [user, setUser] = useContext(userContext);
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state ? location.state.from.pathname : "/"

    useEffect(() => {
        user._id && navigate(from, { replace: true })
        const cooki = getCooki()
        if (!user?._id && cooki) {
            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    authorization: `Bearer ${cooki}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setIsLoading(false);
                    if (data._id) {
                        data.password = null;
                        setUser(data)
                        data._id && navigate(from, { replace: true });
                    }
                });
        } else {
            setIsLoading(false);
        }
    }, []);



    const fromInputHandler = (e) => {
        // if (e.target.name === "singInPhoenNumber") {
        // const curentUser = {...inputUser}
        // curentUser[e.target.name] = e.target.value.replaceAll(" ","")
        // setInputUser(curentUser)

        // } else {
        inputHandler(e, inputUser, setInputUser)
        // }
    }

    const handleLogin = (e) => {
        e.preventDefault()

        if (inputUser.singInPhoenNumber && inputUser.signInPassword) {
            setIsLoading(true)
            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/logIn`, {
                method: "post",
                body: JSON.stringify(inputUser),
                headers: {
                    'content-type': 'application/json; charset=UTF-8'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log("data.token =====>>>", data.token)
                    setIsLoading(false)
                    document.cookie = `token=${data.token}; ${cookieExpires(3)}; path=/`;
                    //   document.cookie = `token === ${data.token}; ${cookieExpires(3)}; path=/`;
                    if (data.data) {
                        data.data.password = null;
                        setUser(data.data)
                        navigate(from, { replace: true })
                    }
                    if (data.sucess) {
                        setMessage({ sucess: data.sucess })
                    }
                    if (data.failed) {
                        setMessage({ failed: data.failed })
                    }
                    setTimeout(() => {
                        setMessage({})
                    }, 7000);
                })
        }
    }

    return (
        <div>
            <div>
                <Header />
                <TopHeader/>
            </div>
            <div className='container my-5'>


                <section className='authentication m-auto'>
                    <form onSubmit={handleLogin}>
                        <h6>Login</h6>
                        <label>Phone Number</label>
                        <div className='icon-container'>
                            <GoMail />
                            <input type="text" name="singInPhoenNumber" placeholder="Phone Number" value={inputUser.singInPhoenNumber ? inputUser.singInPhoenNumber : ""} required autoComplete="off" onChange={fromInputHandler} />
                        </div>

                        <label>Password</label>
                        <div className='eye-container icon-container'>
                            <FiLock />
                            <input type={showEye.password ? "text" : "password"} name="signInPassword" placeholder="Password" value={inputUser.signInPassword ? inputUser.signInPassword : ""} required autoComplete="off" onChange={fromInputHandler} />
                            {
                                showEye.password ? <HiEye className='eye' onClick={() => {
                                    setShowEye((state) => {
                                        return {
                                            ...state,
                                            password: false
                                        }
                                    })
                                }} /> : <HiEyeOff className='eye' onClick={() => {
                                    setShowEye((state) => {
                                        return {
                                            ...state,
                                            password: true
                                        }
                                    })
                                }} />
                            }
                        </div>
                        <div className='remember-section'>
                            <div> <input type='checkbox' /> <p>Remember me</p></div>
                            <p className='forgot-password'>Forgotten Password?</p>
                        </div>

                        <input type="submit" value="Login" required autoComplete="off" />
                        <div className='resposeContainer'>
                            {
                                !message.failed && message.sucess && <p className='sucess'>{message.sucess}</p>
                            }
                            {
                                !message.sucess && message.failed && <p className='text-primary'>{message.failed}</p>
                            }
                        </div>
                        <div className='form-navigation d-flex'><p>Don't have an account? <Link to="/registration"><span style={{  cursor: "pointer" }}>Register an account</span></Link></p></div>

                    </form>
                </section>
                {
                    isLoagin && <Loading />
                }
            </div>
        </div>
    );
};

export default Login;