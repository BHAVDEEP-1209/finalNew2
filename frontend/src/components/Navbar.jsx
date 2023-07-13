import React from 'react'
import logo from "../assets/logo.svg"
import "../Styles/Navbar.scss"
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import {Link} from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navContainer">
      <div className='nav'>
        <img src={logo} alt="" onClick={()=>navigate("/homepage")}/>
        <div className="icons">
        <PersonIcon className='icon' onClick={()=>navigate("/profile")}/>
        <LocalMallIcon className='icon' onClick={()=>navigate("/cart")}/>
        </div>
    </div>
    <div className="categories">
      <div>
      <Link>WATCHES</Link>
      <Link>FASHION</Link>
      <Link>JEWELRY</Link>
      <Link>SKINCARE</Link>
      <Link>MAKEUP</Link>
      </div>
    </div>
    </div>
  )
}

export default Navbar