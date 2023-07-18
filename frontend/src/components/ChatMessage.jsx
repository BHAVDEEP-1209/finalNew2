import React from 'react'

const ChatMessage = (props) => {
  return (
    <div>
        <h1>{props.state.content}</h1>
    </div>
  )
}

export default ChatMessage