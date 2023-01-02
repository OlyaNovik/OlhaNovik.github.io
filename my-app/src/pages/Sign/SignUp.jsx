import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import "../Sign/SignUp.scss"

const SignUp = (props) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false)
  const handleSingUp = async (e) => {
    e.preventDefault()
    try {
      const user = await createUserWithEmailAndPassword(auth, formValue.email, formValue.password)
      setSuccess((prev)=>!prev)
      setTimeout(()=>{
        setSuccess((prev)=>!prev)
        setFormValue({
          email: '',
         password: '',
        })
        navigate('/login')
      },3000)
    }    
    catch (e) {
      console.log(e);
    }
    finally {

    }
  }
  const handleSingIn = async (e) => {
    e.preventDefault()
    try {
      const user = await signInWithEmailAndPassword(auth, formValue.email, formValue.password)
      localStorage.setItem('user', JSON.stringify(user))
      setSuccess(true)
      navigate('/admin')     
    }
    catch (e) {
      console.log(e);
    }
    finally {

    }
  }
  return (
    <div className="login_page">
      {!success
      ?
      <form className="form_log" action="">
        <p className="head_Title">{props.page}</p>
        <input type="text"
          placeholder="  Email.."
          value={formValue.email}
          onChange={(event) => {
            setFormValue({
              ...formValue,
              email: event.target.value,
            }
            )
          }} />
        <input type="password"
          value={formValue.password}
          placeholder="  Password.."
          onChange={(event) => {
            setFormValue({
              ...formValue,
              password: event.target.value,
            }
            )
          }} />

        <button className="Btn" onClick={props.page === 'Sign up' ? handleSingUp: handleSingIn }>Submit </button>
      </form>
      : <h1>Success</h1>}
    </div>

  )
}

export default SignUp;