import React, { useEffect, useState } from 'react'
import { getMessages } from '../utils/utils';
import { message } from 'antd';
import ChatMessage from './ChatMessage';
import Input from './Input';

const Message = (props) => {

    const [messages,setMessages] = useState([]);
    const [click,setClick] = useState(false);
    const id = props.state;
    console.log(id);
    useEffect(()=>{
        const get = async()=>{
            try {
                const res = await getMessages(props.state);
                setMessages(res.data.messages);
            } catch (error) {
                console.log(error);
            }
        }
        get();
    },[click])

  return (
    <div>
        <div className="header">
            {
                messages?.map((ele)=>{
                    return <ChatMessage state={ele} />
                })
            }
            <Input state={id} st={{setClick}}/>
        </div>
    </div>
  )
}

export default Message