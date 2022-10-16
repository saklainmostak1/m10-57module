import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.init';

const auth = getAuth(app)

const RegisterReactBoots = () => {
    const [passwordError, setPasswordError] = useState('')
    const [sucess, setSucess] = useState(false)
    const handleRegister = event =>{
        event.preventDefault()
        setSucess(false)
        const form = event.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        console.log(name, email, password)
        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setPasswordError('Please enter 2 captital letter please')
            return
        }
        if(password.length < 6){
            setPasswordError('Please enter 6 digit ')
            return
        }
        if(!/(?=.*[!@#$&*])/.test(password)){
            setPasswordError('Please enter at least 1 special character ')
            return
        }
        setPasswordError('')
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const user = result.user
            console.log(user)
            setSucess(true)
            form.reset()
            verifyEmail();
            updateUserName(name);


        })
        .catch( error =>{
            console.error(error)
            setPasswordError(error.message)
        })
    }
    const verifyEmail = () =>{
        sendEmailVerification(auth.currentUser)
        .then(() =>{
            alert('please check your email')
        })
    }
    const updateUserName = (name) =>{
        updateProfile(auth.currentUser, {
            displayName: name
        })
        .then(() =>{
            console.log('display name update')
        })
        .catch(error =>{
            console.error(error)
        })
    }
    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-success'>Please Register !!!!</h3>
            <Form onSubmit={ handleRegister}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Your Name</Form.Label>
        <Form.Control type="text" name='name' placeholder="Enter Name" required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email" required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' placeholder="Password" required />
      </Form.Group>
      <p className='text-danger' >{passwordError}</p>
      {sucess && <p className='text-success'>Register SucessFully</p>}
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
    <p><small>If You are already a user please <Link to='/login'>Login</Link></small></p>
        </div>
    );
};

export default RegisterReactBoots;