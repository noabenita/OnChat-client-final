import React, { useEffect, useState, useRef } from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import {HttpTransportType, HubConnectionBuilder} from '@microsoft/signalr'



function Chat({current}){
    const[state,setState]=React.useState(0);
    const[user,setUser]=React.useState({id: "", name:"", image:"", server:"", messages:[]})
    const [list, setList] = useState([]);

    const mess = React.useRef([])
    const [ chat, setChat ] = useState([]);
    const id = useRef("");
    const name = useRef("");
    const server = useRef("");
    const [connection, setConnection ] = useState(null);

    // open connect 
    async function AddMessage(from){
        fetch('http://localhost:7242/api/contacts/'+ current.UserName)
                    .then( res=>res.json())
                    .then(data=>{
                    setList(data);
                    fetch('http://localhost:7242/api/contacts/'+current.UserName+'/contacts/'+ id.current +'/messages')
                        .then( res=>res.json())
                        .then(data=>{
                            mess.current = data;
                        setUser({id: id.current, name: name.current, server:server.current, messages:mess.current});
                    }) 
        })
    }
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:7242/Hubs/MyHub',{
                skipNegotiation:true,
                transport:HttpTransportType.WebSockets
            })
            .withAutomaticReconnect()
            .build();
            setConnection(newConnection);
    },[]);

       useEffect(() => {
        if(connection){
            connection.start()
            .then(result => {
                connection.on('ReceiveMessage', (to,from) => {
                    if(current.UserName == to){
                        if(id.current==""){
                            id.current=from;
                        }
                         AddMessage(from);
                    }
                })
                connection.on('ReceiveContact', to => {
                if(current.UserName == to){
                    fetch('http://localhost:7242/api/contacts/' + current.UserName)
                    .then( res=>res.json())
                    .then(data=>{
                        setList(data);
                        }
                    )
                }
                })
            })
            .catch(e => console.log('Connection failed: ', e));
        }
    },[connection]);


   /* for the open page when we sign in - no chat open */
    if(state == 0){
        return(
            <>
            <LeftSide current={current} setState = {setState} setUser={setUser} 
           list={list} setList={setList} connection={connection} name={name} id={id} server={server} mess={mess}/>
            </>
        );
    }
    else{
        return(
            <>
             <LeftSide current={current} setState = {setState} setUser={setUser} 
           list={list} setList={setList} connection={connection}  name={name} id={id} server={server} mess={mess}/>    
            <RightSide current={current} user={user} setUser={setUser} list={list} setList={setList} connection={connection}/>
            </>
        );
    }



}
export default Chat