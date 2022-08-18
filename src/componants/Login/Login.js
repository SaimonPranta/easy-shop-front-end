import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userContext } from '../../App';
import cookieExpires from '../../Functions/cookieExpires';
import inputHandler from '../../Functions/inputHandler';
import Header from '../Header/Header';

const Login = () => {
    const [inputUser, setInputUser] = useState({});
    const [message, setMessage] = useState({});
    const [user, setUser] = useContext(userContext);
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state ? location.state.from.pathname : "/"

    useEffect(() => {
        user._id && navigate(from, { replace: true })
        const cooki = document.cookie.split("=")[1];
        if (cooki) {
            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${cooki}`
                }
            }).then(res => res.json())
                .then(data => {
                    data._id && navigate(from, { replace: true })
                    data.password = null
                })
        }
    }, []);



    const fromInputHandler = (e) => {
        inputHandler(e, inputUser, setInputUser)
    }

    const handleLogin = (e) => {
        e.preventDefault()


        if (inputUser.singInPhoenNumber && inputUser.signInPassword) {
            fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/logIn`, {
                method: "post",
                body: JSON.stringify(inputUser),
                headers: {
                    'content-type': 'application/json; charset=UTF-8'
                }
            })
                .then(res => res.json())
                .then(data => {
                    document.cookie = `token = ${data.token}; ${cookieExpires(3)}; path=/`;
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
        <div className='container'>
            <div>
                <Header />
            </div>
            <section className='authentication m-auto'>
                <form onSubmit={handleLogin}>
                    <h6>Login</h6>
                    <label>Phone Number</label>
                    <input type="text" name="singInPhoenNumber" placeholder="Phone Number" value={inputUser.singInPhoenNumber ? inputUser.singInPhoenNumber : ""} required autoComplete="off" onChange={fromInputHandler} />

                    <label>Password</label>
                    <input type="password" name="signInPassword" placeholder="Password" value={inputUser.signInPassword ? inputUser.signInPassword : ""} required autoComplete="off" onChange={fromInputHandler} />


                    <input type="submit" value="Login" required autoComplete="off" />
                    <div className='resposeContainer'>
                        {
                            !message.failed && message.sucess && <p className='sucess'>{message.sucess}</p>
                        }
                        {
                            !message.sucess && message.failed && <p className='text-primary'>{message.failed}</p>
                        }
                    </div>
                    <div className='form-navigation d-flex'><p>Don't have an account? <Link to="/registration"><span style={{ color: "blue", cursor: "pointer" }}>Register an account</span></Link></p></div>
                </form>
            </section>
        </div>
    );
};

export default Login;