import './ChatPage.css';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Chats from '../chats/Chats';
import MyChat from '../MyChat';
import React from 'react';


function ChatPage({db, current}) {
// find user that login
const findMe = db.find((value)=> {
  return(value.UserName == current.nowOnline)
});

const chatFriendsList = findMe.Chats.map((frd, key)=>{
  return <Chats name= {frd.contact} img = {frd.imgContact} messages = {frd.message} setRender={setRender} key={key}/>
});

return (
    <>
     <nav id="mainImage" className="w3-sidebar w3-hide-small">
      <div className="bgimg" ></div>
    </nav>
    
     <div  className="semiTrans w3-hide-medium w3-hide-small" ></div>
   
     <div className="poweredBy">{" "}
        <pre>Powered by Or Nasri &amp; Noa Benita </pre>
  </div>
      
    <div id="button">
      <p>
        <button className="w3-button w3-light-grey w3-padding-small" type="submit">
          <Link to="/">Logout</Link>
        </button>
      </p>
    </div> 
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>

  <div className="row clearfix">
    <div className="col-lg-12">
      <div className="column card chat-app  ">
        <div id="plist" className="people-list ">
          <div container className='box w3-border w3-padding-32'>
            <div className="col-lg-5 chat-list">
              {/* details of the owner chat */}
                <MyChat image = {findMe.Img} name={findMe.Nickname}></MyChat>
            </div>
          </div>
          <div className="input-group1">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <button className="addCon fa fa-user-circle" />
              </span>
            </div>
          </div> 
          <ul className="list-unstyled chat-list mt-2 mb-0 w3-border">
          {chatFriendsList} 
          </ul>
        </div>
        <div className="chat">
          <div className="chat-header clearfix">
            {/* right side - chat */}
            <div className="row">
              <div className="col-lg-6">
                <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                  <img src="https://bootdey.com/img/Content/avatar/avatar2.png"  // img of current chat
                    alt="avatar"/>
                </a>
                <div className="chat-about">
                  <h6 className="m-b-0">{findMe.Nickname}</h6>
                  <small>Last seen: 2 hours ago</small>
                </div>
              </div>
              
            </div>
          </div>
          {/* maessages */}
          <div className="chat-history">
          </div>
          <div className="chat-message clearfix">
              <div border className='borderOfSendLine'>
                <form action="/action_page.php" target="_blank">
                  <p>
                      <input className="form-control w3-input" type="text"
                      placeholder="Enter text here..." />
                  </p>
                </form>
                <div className="input-group-prepend">
                  <button className="fa fa-send" id='sendButton' type='submit' />        
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div classN="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body"> 
                            <p>
                              <button id="btnStart">START RECORDING</button>     
                              <button id="btnStop">STOP RECORDING</button>
                            </p>

                            <audio id="audioPlay1"controls></audio>        
                            <audio id="audioPlay" controls></audio>

                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                          </div>
                        </div>
                      </div>
                </div>
</>

);
}

export default ChatPage