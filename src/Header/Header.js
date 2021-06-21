import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Header.css'
import { UserContext } from '../App';
import { DropdownButton, Navbar } from 'react-bootstrap';
import { Dropdown } from 'bootstrap';

const Header = () => {
    const [loggedInUser, setLoggedUser] = useContext(UserContext);

    const logoutHistory = useHistory();
    const SignOut = () => {
        setLoggedUser({});
        logoutHistory.push("/home");

    }

    return (
        <div className="Header">
            <div className="logo">
                Kamen Riders
            </div>
            <navbar className="navbar">
                <Link to="/home">Home</Link>
                <Link to="/destination">Destination</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/contact">Contact</Link>
                {
                    loggedInUser.email ? <Link className="LogOutButton" onClick={SignOut}>{loggedInUser.email}</Link> : <button className="LogInButton"><Link to="/login">Log in</Link></button>
                }
               
            </navbar>
        </div>
    );
};


export default Header;