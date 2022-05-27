import React, { useState } from 'react';
import LoginPage from './loginPage/LoginPage'
import Chat from './chatPage/Chat';
import SignUpPage from './signUpPage/SignUpPage';

function App() {
  
  const[mode,setMode]=React.useState(0);
  const[newUser, setNewUser]= React.useState({UserName: "", NickName:"", Img:"", Password:"", Chats:""});
  const[current,setCurrent]=React.useState({UserName: "", NickName:"", Img:"", Password:"", Chats:"", Contacts:""});
  const[img, setImg]=React.useState("");

// navigate between pages     
if(mode == 0){
  return (
    <LoginPage setMode={setMode} current={current} setCurrent={setCurrent} newUser={newUser}/>
  );
}
if(mode == 1){
  return (
    <SignUpPage setMode={setMode} setNewUser={setNewUser} setImg={setImg} img={img}/>
  );
}
if(mode == 2){  
  return (
    <Chat current = {current} />
  );
  }
}

export default App;