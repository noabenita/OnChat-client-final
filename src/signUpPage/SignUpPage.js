import './SignUpPage.css';
import React from 'react';

function SignUpPage({ setMode, setNewUser, setImg, img}) {
  const [createUser, setCreateUser]= React.useState({username:'', nickname:'', img:{}, password:'', confirmpassword:''});

  // check if valid 
  function checkIfValid(x) {
    if ((((createUser.username.length != 0) && (createUser.nickname.length != 0) && 
        (createUser.password.length != 0) && (createUser.confirmpassword.length != 0)))) {
            
                if ((/[a-z]/.test(createUser.password)) && (/[A-Z]/.test(createUser.password))
                && (/[0-9]/.test(createUser.password)) && (createUser.password.length >= 8)){
                    if ((createUser.confirmpassword == createUser.password)){
                          ifSubmit(x);
                    } else {
                        alert ("Passwords do not match.");
                        x.preventDefault();
                    }
                } else {
                    alert("Password must conatain : lowercase letter, uppercase letter, number and minimum 8 charcters.");
                    x.preventDefault();
                }
          
            x.preventDefault();  
                
        } else {
          alert("Please fill all fields.");
          x.preventDefault();
        }
  }
  
  
    // checks in signup form
    async function ifSubmit(x){
      x.preventDefault();
      const res = await fetch('http://localhost:7242/api/contacts',
      {method:'POST', 
      headers:{ 'Content-Type': 'application/json'},
      
      body:JSON.stringify({
          id: createUser.username,
          nickname: createUser.nickname,
          password:createUser.password,
      })
      })
      .then( async res=>res.json())
      .then(data=>{
        if(data.status == 400){
          alert("Username is already exist.");
        }
        else{
          setMode(0);
          return
        }
      })
    }
        
    
    function ifChange(event){
      const {name, value} = event.target;
      setCreateUser({
        ...createUser,
        [name]:value
      })
    }

    return(
      <div className='container'>
        <div className='row'>
          <div className='col'>
            {/* Sidebar with image */}
            <nav id="mainImage" className="w3-sidebar w3-hide-medium w3-hide-small">
              <div className="bgimg" />
            </nav>
          </div> 
          <header className="w3-container w3-center" id="home">
            <h1 className="onChatS w3-jumbo">
              <b>O-N Chat</b>
            </h1>
            <p className="secHeadLineS"> Fast, Simple and Secure Messaging.</p>
          </header>
          <div className ="signupPageHeadline w3-light-grey w3-container w3-center w3-large w3-opacity" > 
                Sign Up </div> 
            {/* signup form */}
            <div id ='put'>
              <form action="/action_page.php" target="_blank">
                <p>
                    <input className="w3-input w3-padding-16 w3-border" type="text" name="username" 
                    placeholder="Username" onChange={ifChange} />
                </p>
                <p>
                  <input
                    className="w3-input w3-padding-16 w3-border" type="text" name ="nickname"
                    placeholder="NickName"  onChange={ifChange} />
                </p>
                 </form>
              <p>
                <input className="w3-input w3-padding-16 w3-border" name="password" type="password"
                  placeholder="Password"  onChange={ifChange} />
              </p>
              <p>
                <input className="w3-input w3-padding-16 w3-border" name="confirmpassword" type="password"                
                  placeholder="Confirm Password" onChange={ifChange}/>
              </p>
              <form > 
                <button id='button3' className='w3-button w3-center w3-light-grey w3-padding-large' 
                    onClick={checkIfValid}  >
                    Sign Up
                </button>
              </form>
              {/* End Contact Section*/}
            </div>
            {/* Footer */}
            <footer
              className="poweredByS w3-container w3-padding-64 w3-light-grey w3-opacity w3-xlarge ">
              <p className="powerdByText w3-medium">
                Powered by <a>Or Nasri &amp; Noa Benita</a>
              </p>
              {/* End footer */}
            </footer>
          </div>  
          {/* END PAGE CONTENT */}
        </div>
  );
}

export default SignUpPage