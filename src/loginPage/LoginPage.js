import './LoginPage.css';
import React from 'react';

function LoginPage({setMode,current, setCurrent, newUser}) {
    const [usersArray,setUserArray] = React.useState({username:'', password:''});    

    async function ifSubmited(e) {  
        e.preventDefault();
        const res = await fetch('http://localhost:7242/api/contacts/'+usersArray.username,
        {method:'POST', 
        headers:{ 'Content-Type': 'application/json'},
        body:JSON.stringify({
            id: usersArray.username,
            password: usersArray.password
        })
        })
        .then( async res=>res.json())
        .then(data=>{
            if (data.status != 404){
                 setCurrent({
                UserName: data.id,
                NickName: data.nickname,
                Img: data.image,
                Password: data.password,
                Chats: data.chats,
                Contacts: data.contacts
            });
            setMode(2);
            return
            } else {
                alert("username or password are incorrect")
                setUserArray({username:'', password:''});
                document.getElementById("username").value = ("");
                document.getElementById("password").value = ("");
                return;
          }
        })
    }
        
    function ifChange(event) {
        const {name, value} = event.target;
        setUserArray({
            ...usersArray,
            [name]:value
        })
    }
    function changeMode(){
        // go to signup page 
        setMode(1)
        return
    }
    return ( 
        <>   
        <div className="w3-sidebar ">
            <div className="bgimg" ></div>               
        </div>
        <header className="w3-container w3-center" id="home">
            <h1 className="onChat w3-jumbo">
                <b>O-N Chat</b>
            </h1>
            <p className="secHeadLine"> Fast, Simple and Secure Messaging.</p>
        </header>
        <p className='rate'>  
            Rate Us 
                {/* signUp button */}
                    <a href = "https://localhost:7161/"  target="_blank" style={{color:'blue'}}> Here</a>
        </p>
        <div className ="loginPageHeadline w3-light-grey w3-container w3-center w3-large w3-opacity" > 
                        Login
        </div>       
        {/* text box  */}
        <div id="loginInfo1">
            <form >
                <label>               
                    <input type="text" name="username" className='w3-container w3-xlarge' id='username'
                        onChange={ifChange} placeholder='Username'  />
                </label>
            </form>
        </div>
        <div id="loginInfo2">
            <form>
                <label>      
                    <input type="password" name="password" className='w3-container w3-xlarge'  id='password'
                        onChange={ifChange} placeholder='Password'  />
                </label>
            </form>
        </div>
        <div>
            <form > 
                {/* signIn button */}
                <button id='button1Log' className='w3-button w3-center w3-light-grey w3-padding-large' 
                    onClick={ifSubmited}  >
                    Sign In
                </button>
                <p>  
                {/* signUp button */}
                    <button id='button2Log' className='w3-button w3-center w3-light-grey w3-padding-large' 
                    onClick={changeMode}> Sign Up</button>
               </p>
           </form>
        </div>
        {/* End footer */}           
        <footer
              className="poweredBy w3-container w3-padding-64 w3-light-grey w3-center w3-opacity w3-xlarge ">
            <p className="w3-medium">
              Powered by <a>Or Nasri &amp; Noa Benita</a>
            </p>
        </footer>
        
         </>
    );
}
export default LoginPage;