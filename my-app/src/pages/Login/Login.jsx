import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import './Login.scss'

const Login = () => {
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
          localStorage.setItem('user', JSON.stringify(user))
          setSuccess(true)
          setTimeout(()=>navigate('/login'),2000)
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
            <p className="head_Title">Sign in</p>
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
    
            <button className="Btn" onClick={handleSingUp}>Submit </button>
          </form>
          : <h1>Success</h1>}
        </div>
    
      )
    }
    

export default Login