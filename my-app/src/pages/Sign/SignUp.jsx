import "../Sign/SignUp.scss"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SendIcon from '@mui/icons-material/Send'
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";

import CachedIcon from '@mui/icons-material/Cached';


const SignUp = (props) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSingUp = async (e) => {
    e.preventDefault()
    try {
      const user = await createUserWithEmailAndPassword(auth, formValue.email, formValue.password)
      setSuccess((prev) => !prev)
      setTimeout(() => {
        setSuccess((prev) => !prev)
        setFormValue({
          email: '',
          password: '',
        })
        navigate('/login')
      }, 4000)
    }
    catch (e) {
      setError(e?.message)
      console.log(e?.message);
    }
    finally {

    }
  }
  const handleSingIn = async (e) => {
    e.preventDefault()
    try {
      const user = await signInWithEmailAndPassword(auth, formValue.email, formValue.password)
      if(user.user.uid === 't6UusgV8kWhDMN9CDzLLqCF3kiJ2'){
      setSuccess(true)
      navigate('/admin')
      }
      else{
        setError('You aren`t admin. Please enter correct value in order to edit CV.')
      }
       
    }
    catch (e) {
      setError(e?.message)
      console.log(e);
    }
    finally {
    }
  }
   const handleRefresh =()=>{
    console.log('login');
    window.location.reload(false);
   }
  return (
    <div className="login_page">
      {!success
        ?
        <form className="form_log" action="">
      {!error ?
      <>
        <p className="head_Title">{props.page}</p>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="input_block">
            <TextField
              required
              id="outlined-required"
              label="Required"
              placeholder="  Email.."
                  value={formValue.email}
                  onChange={(event) => {
                    setFormValue({
                      ...formValue,
                      email: event.target.value,
                    }
                    )
                  }}
            />
            <TextField
          id="outlined-password-input"
          label="Required"
          type="password"
          autoComplete="current-password"
          value={formValue.password}
              placeholder="  Password.."
              onChange={(event) => {
                setFormValue({
                  ...formValue,
                  password: event.target.value,
                }
                )
        }}
        />
          </div>
        </Box>
        <Button variant="contained" onClick={props.page === 'Sign up' ? handleSingUp: handleSingIn } endIcon={<SendIcon />}> Submit </Button>
        </> : <div className="error_block">
          <div className="error_text">{error}</div>
          <Button variant="contained" className="refresh_btn" onClick={handleRefresh} endIcon={<CachedIcon />}>Update</Button>
        </div>   }
        </form>
        : <>
        <h1>Success Registration</h1>
         <HowToRegIcon/>
         </>}
    </div>

  )
}

export default SignUp;