import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.init';


const auth = getAuth(app)

const Login = () => {
    const [sucess , setSucess] = useState(false)
    const [userEmail, setUserEmail] = useState('')

    const handleSubmit = event =>{
        event.preventDefault()
        setSucess(false)
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password)
        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const user = result.user
            console.log(user)
            setSucess(true)
            form.reset()
        })
        .catch(error =>{
            console.error(error)
        })
    }
    const handleEmailBlur = event =>{
        const email = event.target.value
        setUserEmail(email)
        console.log(email)
    }
    const handleForgetPass =() =>{
        if(!userEmail){
            alert('enter your email please')
            return
        }
        sendPasswordResetEmail(auth, userEmail)
        .then(() =>{
            alert('Password Send to your email')
        })
        .catch(error =>{
            console.error(error)
        })
    }
    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-primary'>Please Log in !!!</h3>
           <form onSubmit={ handleSubmit }>
           <div className="mb-3">
  <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
  <input onBlur={handleEmailBlur} type="email" name='email' className="form-control" id="formGroupExampleInput" placeholder="Your Email" required/>
</div>
<div className="mb-3">
  <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
  <input type="password" name='password' className="form-control" id="formGroupExampleInput2" placeholder="Your Password" required/>
</div>
  <button className='btn btn-primary' type="submit">Log In</button>
           </form>
           {sucess && <p className='text-success'>sucessfully login</p> }
           <p><small>New to this Website ? please <Link to='/register'>Register</Link></small></p>
           <p>Forget Password? <button type='button' onClick={handleForgetPass} className='btn btn-link'>Please Reset</button></p>
        </div>
    );
};

export default Login;