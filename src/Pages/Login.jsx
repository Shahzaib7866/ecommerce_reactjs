import React from 'react'
import './CSS/loginsignup.css'
import { Link } from 'react-router-dom'


const Login = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Log in</h1>

        <div className="loginsignup-fields">
         
          <input type="email" placeholder='email address' />
          <input type="password" placeholder='password' />
        </div>

        <button>Continue</button>
        
        <p className='loginsignup-login'>Not a member yet? 
         <Link to='/register'><span>Register here</span></Link>
 
          </p>
      
      <div className="loginsignup-agree">
        <input type="checkbox" name='' id='' />
        <p>By continuing, i agree to the terms of use & privacy policy.</p>
      </div>
      </div>
      
    </div>
  )
}

export default Login






