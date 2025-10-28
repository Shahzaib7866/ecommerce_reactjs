import React from 'react'

const Register = () => {
  return (
     <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Log in</h1>

        <div className="loginsignup-fields">
         
          <input type="email" placeholder='email address' />
          <input type="password" placeholder='password' />
        </div>

        <button>Continue</button>
        
        <p className='loginsignup-login'>Not a member yet? <span>Register here</span> </p>
      
      <div className="loginsignup-agree">
        <input type="checkbox" name='' id='' />
        <p>By continuing, i agree to the terms of use & privacy policy.</p>
      </div>
      </div>
      
    </div>
  )
}

export default Register





