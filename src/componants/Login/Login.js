import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cookieExpires from '../../Functions/cookieExpires';
import inputHandler from '../../Functions/inputHandler';
import Header from '../Header/Header';

const Login = () => {
    const [inputUser, setInputUser] = useState({});

    const fromInputHandler = (e) => {
        inputHandler(e, inputUser, setInputUser)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        if (inputUser.singInPhoenNumber && inputUser.signInPassword) {
            fetch('http://localhost:8000/logIn', {
                method: "post",
                body: JSON.stringify(inputUser),
                headers: {
                    'content-type': 'application/json; charset=UTF-8'
                }
            })
                .then(res => res.json())
                .then(data => {
                    data.data.password = null
                    document.cookie = `token = ${data.token}; ${cookieExpires(3)}; path=/`;

                })
        }
    }

    console.log(inputUser)

    return (
        <div className='container'>
            <div>
                <Header />
            </div>
            <section className='authentication m-auto'>
                <form onSubmit={handleLogin}>
                    <h6>Login</h6>
                    <input type="text" name="singInPhoenNumber" placeholder="Phone Number" value={inputUser.singInPhoenNumber ? inputUser.singInPhoenNumber : ""} required autoComplete="off" onChange={fromInputHandler} />
                    <input type="password" name="signInPassword" placeholder="Password" value={inputUser.signInPassword ? inputUser.signInPassword : ""} required autoComplete="off" onChange={fromInputHandler} />
                    <div>
                        <input type="checkbox" />
                        <label className='remember-me'>Remember Me</label>
                    </div>
                    <input type="submit" value="Login" required autoComplete="off" />
                    <div className='form-navigation d-flex'><p>Don't have an account? <Link to="/registration"><span style={{ color: "blue", cursor: "pointer" }}>Register an account</span></Link></p></div>
                </form>
            </section>
        </div>
    );
};

export default Login;