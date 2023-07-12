import React from 'react'
import logo from "../assets/logo.svg"
import "../Styles/Navbar.scss"
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='nav'>
        <img src={logo} alt="" onClick={()=>navigate("/homepage")}/>
        <PersonIcon />
    </div>
  )
}

export default Navbar