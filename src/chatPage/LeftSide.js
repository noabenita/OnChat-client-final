import './LeftSide.css';
import React, { useState } from 'react';
import {Modal} from "react-bootstrap";
import {Button} from "react-bootstrap";
import { useEffect } from 'react';


function LeftSide({current, setState, user, setUser, list, setList, connection, name, id, server, mess}){
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [userAdd, setUserAdd]=React.useState({nickname:"", username:"", server:""})
    const [newContact, setNewContact] = useState([]);

useEffect( () =>{
        async function fetchData1(){
            const res =  await fetch('http://localhost:7242/api/contacts')
            const data =await res.json();
                setNewContact(data); 
            }
            fetchData1();
        }, []);

        async function AddUserChat(e){
            var statusOfPost, statusOfGET;
            if(current.UserName == userAdd.username){
                alert("you can't add yourself to chats")
                return;
            }       
            for (var j = 0; j<list.length; j++){
                if (list[j].id == userAdd.username){
                    alert("you already have this chat")
                    return;
                }
            }  

            var serverAddress = userAdd.server;
            await fetch('http://'+serverAddress+'/api/invitations',
            {method:'POST',
            headers:{ 'Content-Type': 'application/json', 
            "Access-Control-Allow-Origin" : "*", 
            "Access-Control-Allow-Credentials" : true  },
            body:JSON.stringify({
                from: current.UserName,
                to: userAdd.username,
                server: 'localhost:7242'
            })}
            ).then(res=>{
                if(res.status == 201){
                    fetch('http://localhost:7242/api/contacts/'+current.UserName+'/contacts',
                    {method:'POST',
                    headers:{ 'Content-Type': 'application/json', 
                    "Access-Control-Allow-Origin" : "*", 
                    "Access-Control-Allow-Credentials" : true  },
                    body:JSON.stringify({
                        id: userAdd.username,
                        name: userAdd.nickname,
                        server: userAdd.server,
                    })}
                ).then(res=>{
                    if (res.status == 201){;
                        fetch('http://localhost:7242/api/contacts/'+current.UserName)
                        .then(async res=>res.json())
                        .then(data=>{
                            setList(data);
                            }
                        )}
                })}});
        connection.invoke("AddContact", userAdd.username)
    }
        
    async function putMessages(name2, i){
        await fetch('http://localhost:7242/api/contacts/'+current.UserName+'/contacts/'+name2+'/messages',
        ).then(async res=>res.json())
        .then(data=>{
                if (data.status != 404){
                setUser({id: list[i].id,
                name: list[i].name,
                image: list[i].image,
                server : list[i].server,
                messages: data});
                name.current = name2;
                id.current =list[i].id;
                server.current=list[i].server;
                mess.current = data;
                } else {
                setUser({id: list[i].id,
                name: list[i].name,
                image: list[i].image,
                server : list[i].server,
                messages: []});
          }
        });
        await fetch('http://localhost:7242/api/contacts/'+current.UserName,
        ).then(async res=>res.json())
        .then(data=>{
               setList(data);
            }
        )
    }
            

    function clicked(e){
        var index=0;
        for(var i = 0; i<list.length;i++){
            id.current = e.target.id;
            if(e.target.id == list[i].id){
                /**save the user we click on his chat */
                index = i;
                putMessages(e.target.id, index);
                setState(1)
            }
        }
    }


    function ifChange(event) {
        const {name, value} = event.target;
        setUserAdd({
            ...userAdd,
            [name]:value
        })
    }

    
    useEffect( () =>{
    async function fetchData(){
        const res =  await fetch('http://localhost:7242/api/contacts/'+current.UserName+'/contacts');
        const data =await res.json();
        setList(data);
        }
        fetchData();
    }, []);


    return(
        <>
    <nav className="mainImage w3-sidebar ">
        <div className="bgimg" ></div>               
    </nav>
    <div  className="semiTrans w3-hide-medium w3-hide-small" ></div>
    <div className=" card chat-app ">
        <div id="plist" className="people-list ">  
        {/* show current user */}                 
            <div className='w3-border w3-padding-16 myname'>   
                <img className='myImg' src={current.Img} alt="img"/> {current.NickName}
            </div>
            <ul className=" chat-list">
                <li className='friends-list '>
                {/* show the list chats in left side */}
                {list.map((user, key)=>
                    <ul className="" key={user.id}>
                        <div>
                        <button className='chatListButton' onClick={clicked} id={user.id}>
                            <img onClick={clicked} id={user.id} src='https://bootdey.com/img/Content/avatar/avatar6.png' alt="avatar"/> 
                            <div onClick={clicked} id={user.id} className='contactName'>  {user.name}</div> 
                            <div onClick={clicked} id={user.id} className='lastMsg '>  {user.last} </div>   
                            <div onClick={clicked} id={user.id} className='lastMsgTime '>  {user.lastdate}</div> 
                        </button>   
                        </div>
                    </ul> 
                    )}  
                </li>
            </ul>                   
            {/* modal of add new chat to list */}
            <Button className="addCon fa fa-user-circle w3-xlarge btn-secondary" 
                variant="primary" onClick={handleShow}/>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Add new chat </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                    <input placeholder="Enter Nickname" id="nickname" name="nickname"
                            onChange={ifChange}></input>
                    </div>
                    <div>
                    <input placeholder="Enter Username" id="username" name="username"
                            onChange={ifChange}></input>
                    </div>
                    <div>
                    <input placeholder="Enter Server Address" id="server" name="server"
                            onChange={ifChange}></input>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                                Close
                    </Button>
                    <Button variant="primary" onClick={(x)=> {AddUserChat(x);
                            handleClose()}}>
                                Add User
                    </Button>
                </Modal.Footer>
            </Modal>
        </div> 
    </div>
        </>
    )
}
export default LeftSide