import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

const Login = () => {
    return (
        <div className='container'>
            <div>
                <Header />
            </div>
            <section className='authentication m-auto'>
                <form>
                    <h6>Login</h6>
                    <input type="text" name="signInEmail" placeholder="Phone Number" required autoComplete="off" />
                    <input type="password" name="signInPassword" placeholder="Password" required autoComplete="off" />
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