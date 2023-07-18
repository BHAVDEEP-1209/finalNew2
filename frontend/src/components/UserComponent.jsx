import React from 'react'

const UserComponent = (props) => {
    const handleClick=()=>{    
        props.st.setCurrentId(props.state.user.id)
    }
  return (
    <div onClick={handleClick}>
        <h1>{props.state.user.name}</h1>
    </div>
  )
}

export default UserComponent