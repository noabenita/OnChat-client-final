import './Message.css';

function Message({data, time, flag, type}){
    if(type == 'text') {  
        if (flag){
            return(
            <div className="mine messages round left-in leftSide ">
                <div className="talktext message-data-left">
                    <p className='message-data-left '>           
                        <ul className='clearfix message last '>
                            <div className='message-data width=200 '>
                                <span className="message-data-time "> 
                                    <div>{time}</div>  
                                    <div>{" "} {data} {" "}</div>
                                </span>
                                
                            </div>
                        </ul>
                    </p>
                </div>
            </div>  
            );
        } else {
            return(
                <div className='mine messages round right-in ' >
                    <ul className='message-data-righ'>
                        <ul className='clearfix message last'>
                            <div className='text-right'>
                                <span className="message-data-time-right  other-message float-right"> 
                                    <div>{time}</div>
                                    <div> {" "} {data} {" "} </div>                                    
                                </span>
                            </div>
                        </ul>
                    </ul>
                </div>
            );    
        }
    }
    else if(type == "img"){
        if (flag){
            return(
                <div className="mine messages round left-in leftSide ">
                    <div className="talktext">
                        <p className='message-data-left '>           
                            <ul className='clearfix message last '>
                                <div className='message-data width=200" '>
                                    <span className="message-data-time "> 
                                        <div>{time}</div>  
                                        <img src={data}  width="350"  /> 
                                    </span>
                                </div>
                            </ul>
                        </p>
                    </div>
                </div>  
            );
        } else {
            return(
                <div  className='mine messages round right-in ' >
                    <ul className='message-data-righ '>
                        <ul className='clearfix message last'>
                            <div className='text-right'>
                                <span className="message-data-time-right  other-message float-right"> 
                                    <div>{time}</div> 
                                    <img src={data} width="350" /> 
                                </span>
                            </div>
                        </ul>
                    </ul>
                </div>
            );    
        }
    }
    else if(type == "audio"){
            if (flag){
                return(
                    <div className="mine messages round left-in leftSide ">
                        <div className="talktext">
                            <p className='message-data-left '>           
                                <ul className='clearfix message last '>
                                    <div className='message-data width=200" '>
                                        <span className="message-data-time ">
                                            <div>{time}</div>
                                            <audio src={data} controls  > </audio>
                                        </span>
                                    </div>
                                </ul>
                            </p>
                        </div>
                    </div>  
                );
            } else {
                return(
                    <div  className='mine messages round right-in ' >
                        <ul className='message-data-righ '>
                            <ul className='clearfix message last'>
                                <div className='text-right'>
                                    <span className="message-data-time-right  other-message float-right">
                                        <div>{time}</div>
                                        <audio src={data} hidden controls  ></audio> 
                                        <audio src={data} controls  ></audio> 
                                    </span>
                                </div>
                            </ul>
                        </ul>
                    </div>
                );    
            }
        }
        else if(type== "video"){
            if (flag){
                return(
                    <div className="mine messages round left-in leftSide ">
                        <div className="talktext">
                            <p className='message-data-left '>           
                                <ul className='clearfix message last '>
                                    <div className='message-data width=200" '>
                                        <span className="message-data-time ">  
                                            <div>{time}</div> 
                                            <video controls src={data} width="350" /> 
                                        </span>
                                    </div>
                                </ul>
                            </p>
                        </div>
                    </div>  
                );
        } else {
                return(
                    <div  className='mine messages round right-in ' >
                        <ul className='message-data-righ '>
                            <ul className='clearfix message last'>
                                <div className='text-right'>
                                    <span className="message-data-time-right  other-message float-right">  
                                        <div>{time}</div> 
                                        <video controls src={data} width="350" /> 
                                    </span>
                                </div>
                            </ul>
                        </ul>
                    </div>
                );    
            }
        }
    }
export default Message