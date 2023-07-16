import React from 'react'
import logo from "../assets/logo.svg"
import "../Styles/Navbar.scss"
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {Link} from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navContainer">
      <div className='nav'>
        <img src={logo} alt="" onClick={()=>navigate("/homepage")}/>
        <div className="icons">
        <PersonIcon className='icon' onClick={()=>navigate("/profile")}/>
        <LocalShippingIcon className='icon' onClick={()=>navigate("/orders")}/>
        <LocalMallIcon className='icon' onClick={()=>navigate("/cart")}/>
        
        </div>
    </div>
    <div className="categories">
      <div>
      <Link to="/watches">WATCHES</Link>
      <Link to="/fashion">FASHION</Link>
      <Link to="/jewelry">JEWELRY</Link>
      <Link to="/skincare">SKINCARE</Link>
      <Link to="/makeup">MAKEUP</Link>
      </div>
    </div>
    </div>
  )
}

export default Navbar