import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminId, getMessages, getUsers, sendMessage } from "../utils/utils";
import { setAdminId } from "../slices/userSlice";
import { Empty } from "antd";
import UserComponent from "../components/UserComponent";
import Message from "../components/Message";

const ChatPage = () => {
  const [input, setInput] = useState("");
  const user = useSelector((state) => state.currentUser);
  const id = useSelector((state) => state.adminId);
  const img = user?.image ? user?.image : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  const dispatch = useDispatch();
  const [click,setClick] = useState(false);
  const [messages,setMessages] = useState([]);
  const [users,setUsers] = useState([]);
  const [currentId,setCurrentId] = useState("");
//   const [onLoad,setOnLoad] = useState(false);
  




  const handleUserClick=()=>{

  }


  useEffect(()=>{
    const get = async()=>{
        try {
            const res = await getMessages(user?.id);
            setMessages(res.data.messages);
        } catch (error) {
            console.log(error);
        }
    }
    
    // for admin 
    const get2 =async()=>{
        try {
            const res = await getUsers();
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    }

  if(user?.role=="admin"){
    get2();
  }else{
    get();
  }

  },[click])

  console.log(currentId);

  return (
    <div className="chat">
        <div className="left">
        {
            users?.map((ele)=>{
                return <UserComponent state={ele} st={{setCurrentId}}/>
            })
        }
        </div>
        <div className="right">
            {
                currentId!="" && <Message state={currentId}/>
            }
        </div>
    </div>
  );
};

export default ChatPage;
















{/* <div className="messages">
            {
                !messages.length && <Empty />
            }
            {
                messages?.map((ele)=>{
                    return <h1>{ele.content}</h1>
                    
                })
            }
        </div>
        <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleClick}>send Message</button>
         */}
