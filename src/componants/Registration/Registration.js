import React, { useState } from 'react';
import './Registration.css';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import inputHandler from '../../Functions/inputHandler';
import cookieExpires from '../../Functions/cookieExpires';

const Registation = () => {
    const [inputUser, setInputUser] = useState({});

    const fromInputHandler = (e) => {
        inputHandler(e, inputUser, setInputUser)
    }
    const handleFromSubmit = (e) => {
        e.preventDefault()
        
        if (inputUser.firstName && inputUser.lastName && inputUser.phoneNumber && inputUser.phoneNumber && inputUser.referNumber) {
            if (inputUser.password === inputUser.confirmPassword) {
                fetch('http://localhost:8000/user', {
                    method : "POST",
                    body: JSON.stringify(inputUser),
                    headers: {
                        'content-type': 'application/json; charset=UTF-8'
                    }
                })
                .then( res => res.json() )
                .then( data => {
                    document.cookie = `token = ${data.token}; ${cookieExpires(3)}; path=/`;
                    console.log(data) 
                })
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
                    <input type="text" placeholder="First Name" name="firstName" value={inputUser.firstName ? inputUser.firstName : ""} required autoComplete="off" onChange={fromInputHandler} />
                    <input type="text" placeholder="Last Name" name="lastName" value={inputUser.lastName ? inputUser.lastName : ""} required autoComplete="off" onChange={fromInputHandler} />
                    <input type="text" placeholder="Phone Number" name="phoneNumber" value={inputUser.phoneNumber ? inputUser.phoneNumber : ""} required autoComplete="off" onChange={fromInputHandler} />
                    <input type="password" placeholder="Password" name="password" value={inputUser.password ? inputUser.password: ""} required autoComplete="off" onChange={fromInputHandler} />
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" value={inputUser.confirmPassword ? inputUser.confirmPassword : ""} required autoComplete="off" onChange={fromInputHandler} />
                    <input type="text" placeholder="Referrence Number" name="referNumber" value={inputUser.referNumber ? inputUser.referNumber : ""} required autoComplete="off" onChange={fromInputHandler} />
                    <p className='warning'>Note: Does not match confirmpassword</p>
                    <p className='warning'>Note: User/Email already exist.</p>
                    <input type="submit" value="Register account" />
                    <div className='form-navigation d-flex'><p>Already have an account? <Link to="/login"><span style={{ color: "blue", cursor: "pointer" }}>Login</span></Link></p></div>
                </form>
            </section>
        </div>
    );
};

export default Registation;