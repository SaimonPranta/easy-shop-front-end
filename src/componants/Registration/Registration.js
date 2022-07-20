import React from 'react';
import './Registration.css';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

const Registation = () => {
    return (
        <div className='container'>
            <div>
                <Header />
            </div>
            <section className='authentication m-auto'>
                <form >
                    <h6>Register an account</h6>
                    <input type="text" placeholder="First Name" name="firstName" required autoComplete="off" />
                    <input type="text" placeholder="Last Name" name="lastName" required autoComplete="off" />
                    <input type="text" placeholder="Phone Number" name="phoineNumber" required autoComplete="off" />
                    <input type="password" placeholder="Password" name="password" required autoComplete="off" />
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" required autoComplete="off" />
                    <input type="text" placeholder="Referrence Number" name="referrenceNumber" required autoComplete="off" />
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