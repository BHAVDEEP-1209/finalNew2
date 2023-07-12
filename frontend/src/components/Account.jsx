import React from 'react'
import "../Styles/Store.scss"
import { useSelector } from 'react-redux'

const Account = () => {
  const user = useSelector(state=>state.currentUser);
  const address = user?.address ? user.address : "**xyz,City,State**";
  const email = user?.email ? user.email : "**xyz@gmail.com**";
  const name = user?.name ? user.name : "**Bhavdeep kaushal**";
  const number = user?.number ? user.name : "**+91 1234567890**";
  return (
    <div className='store'>
      <div className="heading">
      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
      <h1>Account</h1>
      </div>
      <div className="personal">
          <div className="header">
            <h3>My Details</h3>
            <h3 className='edit'>Edit</h3>
          </div>
          <div className="details">
            <span>Email</span>
            <h4>{email}</h4>
            <span>Name</span>
            <h4>{name}</h4>
            <span>Address</span>
            <h4>{address }</h4>
            <span>Phone Number</span>
            <h4>{number}</h4>
          </div>
      </div>

      {/* <form action="">
        <input type="text" name="" id="" />
      </form> */}
    </div>
  )
}

export default Account