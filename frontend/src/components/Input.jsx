import React, { useState } from 'react'
import { getAdminId } from '../utils/utils';
import { useDispatch } from 'react-redux';
import { setAdminId } from '../slices/userSlice';

const Input = (props) => {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const id = props.state;
    console.log(id);

    const handleClick = async () => {
        try {

              const msg = {
                  id : id+user?.id,
                  messages : [
                      {
                          content : input,
                          postedBy : user?.name
                      }
                  ],
          
                  user : {
                      image : img,
                      name : user?.name,
                      id : user?.id
                  }
              }
    
              //// send Message
              const result = await sendMessage(msg);
            //   setClick(!click);
              setInput("");
    
        } catch (error) {
            console.log(error);
        }
      };
  return (
    <div>
    <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleClick}>send Message</button>
    </div>
  )
}

export default Input