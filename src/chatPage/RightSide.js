import React, { useState, useEffect } from "react";
import './RightSide.css';
import Message from "./Message";
import {Button} from 'react-bootstrap'
import { Modal } from "react-bootstrap";


function RightSide({ current,user, setUser, list, setList, connection}){
    const[msg,setMsg] = React.useState("")
     
    /** insert to chat array of contact chat according to type */
    async function submit(event, mydata, type){
        var status;
       if (msg.length != 0 && msg != " "){
        await fetch('http://'+user.server+'/api/transfer',
        {method:'POST',
        headers:{ 'Content-Type': 'application/json',
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true },
        body:JSON.stringify({
            from: current.UserName,
            to: user.id,
            content: msg
        })}
        ).then(async res=>{res.json(); 
        status = res.status;})
        // transfer success
       if(status == 201){
        await fetch('http://localhost:7242/api/contacts/'+current.UserName+'/contacts/'+user.id+'/messages',
        {method:'POST',
        headers:{ 'Content-Type': 'application/json',
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true },
        body:JSON.stringify({
            content: msg
        })}
        ).then(async res=>{res.json(); 
        status = res.status;})
        if (status == 201){
         await fetch('http://localhost:7242/api/contacts/'+current.UserName+'/contacts/'+user.id+'/messages'
         ).then(async res=>res.json())
         .then(data=>{
                setUser({id: user.id, name: user.name, server:user.server, messages:data})
            }
        ) } 
        connection.invoke("SendMessage", user.id, current.UserName)  
 
        setMsg("");
        document.getElementById("msg").value = ("");
       }
    }
        // update left side    
        setList(list);
        for (var i=0; i<list.length; i++){
            if(list[i].id == user.id){
                list[i].last=msg;
                const now = new Date();
                const mins = now.getMinutes() < 10 ? "0"+now.getMinutes() : now.getMinutes();
                const hrs = now.getHours() < 10 ? now.getHours()+"0" : now.getHours();
                const time = hrs + ':' + mins; 
                list[i].lastdate = time;
                setList(list);
            }
        }   
      setList(list);
    }

    function ifChange(e) {
        setMsg(e.target.value)
    }

    return(
        <>
        <div className="boxo w3-container first-row">
          {/* current user */}
            <img className='userImg' src='https://bootdey.com/img/Content/avatar/avatar6.png' alt="avatar"/> {user.name}
        </div>
        <div className="second-row chat-messeges">
            <ul className="friends-list">
                {/* show messages in current chat */}
                {user.messages.map((message)=>
                <li className="clearfix " key={message.id}>
                    <Message data = {message.content} time={message.created} flag={message.sent} type='text'/>
                </li>)}  
            </ul>
        </div>
        <div className="third-row">               
            <div className="input-text send-text ">
            {/* text box */}
                <input type="text" className="text-line form-control" name="msg" id="msg" 
                    placeholder="Enter your message here" onChange={ifChange} value={msg.msg}></input>
            </div>
            {/* text button */}
            <button onClick={(event, data, type) =>submit(event, msg, "text")}
                type="button" className="send-button butn btn btn-light"> send </button>
        </div>
        </>
    );
}
export default RightSide