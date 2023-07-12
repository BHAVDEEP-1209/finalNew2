import React from 'react'
import "../Styles/Profile.scss"
import Navbar from "../components/Navbar"
import { Link, Outlet } from 'react-router-dom'

const Profile = () => {
  return (
    <>
    <Navbar />
    <div className='profile'>
        <div className="leftDiv">
            <div className="header"></div>
            <div className="footer">
                <Link to="/profile/store">Store</Link>
                <br />
                <Link to="/profile/drafts">Drafts</Link>
                <br />
                <Link to="/profile/account">Account</Link>
                <br />
                <Link to="/profile/orders">Orders</Link>
            </div>
        </div>
        <div className="rightDiv">
            <Outlet />
        </div>
    </div>
    </>
  )
}

export default Profile