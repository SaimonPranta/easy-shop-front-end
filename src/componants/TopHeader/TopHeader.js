import React, { useContext } from 'react';
import './TopHeader.css';
import { NavLink } from 'react-router-dom';
import { userContext } from '../../App';
import { FaUserCircle } from "react-icons/fa";


const userIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
</svg>
const downArro = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
</svg>
const loginIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
    <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
</svg>


const TopHeader = () => {
    const [user, setUser] = useContext(userContext);
    

    const handleHelpSection = () => {
        const helpSectiondiv = document.querySelector(".help-sub-section");
        helpSectiondiv.classList.toggle("help-control");
    }
    return (
        <section className='container top-header'>
            <div className='row'>
                <div className='col-6 d-flex'>
                    <div className='help-section'>
                        <span>Quick Guide</span>
                        <span onClick={handleHelpSection} className='help-menu'>  Help {downArro}</span>
                        <div className='help-sub-section'>
                            <a href="">Returns</a>
                            <a href="">Privacy</a>
                            <a href="">Terms</a>
                        </div>
                    </div>
                    <div>
                        <a href=''>Contact us on Facebook</a>
                    </div>
                    <div>
                        <a href=''>Visit our channel on Youtube</a>
                    </div>                </div>
                <div className='col-6 top-header-user'>
                    <div>
                        {
                            user._id ? <NavLink to="/dashboard"><FaUserCircle/> {user.firstName} {user.lastName}</NavLink> : <>
                                <NavLink to="/registration">{userIcon} Register</NavLink>
                                <span>or</span>
                                <NavLink to="/login">{loginIcon}  Member Login</NavLink>
                            </>
                        }
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TopHeader;