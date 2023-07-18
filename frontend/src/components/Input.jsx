import React, { useState } from "react";
import { getAdminId, sendMessage } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { setAdminId } from "../slices/userSlice";

const Input = (props) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const user = useSelector((state) => state.currentUser);
  const id = props.state;
  const img = user?.image ? user?.image : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

  const handleClick = async () => {
    try {

  const msg = {
      id : id,
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

  const result = await sendMessage(msg);
  setInput("");
  props.st.setClick(prev=>{
    return !prev;
  })

} catch (error) {
console.log(error);
}
  }



  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleClick}>send Message</button>
    </div>
  );
};

export default Input;

// try {

//   const msg = {
//       id : id+user?.id,
//       messages : [
//           {
//               content : input,
//               postedBy : user?.name
//           }
//       ],

//       user : {
//           image : img,
//           name : user?.name,
//           id : user?.id
//       }
//   }

//   //// send Message
//   const result = await sendMessage(msg);
// //   setClick(!click);
//   setInput("");

// } catch (error) {
// console.log(error);
// }
