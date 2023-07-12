import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser : {
    name : "",
    role : "",
    email : "",
    password : ""
  },
  isLoggedIn : false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setValue : (state,action)=>{
      console.log(action.payload.displayName);
        state.currentUser.name = action.payload.name;
        state.currentUser.role = action.payload.role;
        state.isLoggedIn = true;
        state.currentUser.email = action.payload.email; 
    },
    handleLogOut : (state)=>{
        state.currentUser = {};
        state.isLoggedIn = false;
    }
  },
})

export const { setValue , handleLogOut} = userSlice.actions

export default userSlice.reducer