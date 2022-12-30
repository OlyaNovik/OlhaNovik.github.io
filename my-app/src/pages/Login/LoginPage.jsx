import { useState } from "react";
import "../Login/LoginPage.scss"





const Login = () => {
  const [NameValue,setName] = useState('');
  const [PassValue,setPass] = useState('');
  const admin = [];


    return(
      <div className="login_page">
        <form className="form_log" action="">
          <p className="head_Title">Sign in</p>
          <input type="text"
          placeholder="  Name.." 
          value={NameValue}
          onChange={(event)=>{
            setName(event.target.value)
            console.log(NameValue);
          }}  />
          <input type="password" 
          value={PassValue}
          placeholder="  Password.." 
          onChange={(event)=>{
          setPass(event.target.value)
          console.log(PassValue);
          }} />
          {/* <input type="button" className="Btn" onClick={()=>{
            admin.push(NameValue);
            admin.push(PassValue)
            console.log(admin);

          }} value="Submit" /> */}
          <button className="Btn" onClick={()=>{
            admin.push(NameValue);
            admin.push(PassValue)
            console.log(admin);

          }}>Submit </button>
        </form>

      </div>


    );
  };
  
  export default Login;