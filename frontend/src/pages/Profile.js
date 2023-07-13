import React from 'react'
import "../Styles/Profile.scss"
import Navbar from "../components/Navbar"
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { handleLogOut } from '../slices/userSlice'

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut=()=>{
    dispatch(handleLogOut());
    navigate("/login")
  }
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
                <br />
                <span onClick={handleSignOut}>Sign Out</span>
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