import React, { useContext, useEffect, useState } from 'react'
import { Form,ListGroup,Button, Container, Alert, } from 'react-bootstrap'
import { Link,useLocation,useNavigate,  } from 'react-router-dom'
import axios from "axios"
import {Store}from "../Store"
import { toast } from 'react-toastify'
import Topbar from './Topbar'
import Menubar from './Menubar'




const SignUpPage = () => {
  const navigate = useNavigate()
  let {search} = useLocation()
  let redirectUrl = new URLSearchParams(search).get('redirect')
  let redirect = redirectUrl ? redirectUrl : "/"

  let [name,setName]=useState("")
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let [confirmpassword,setConfirmpassword]=useState("")

  const {state3,dispatch3} = useContext(Store)
  const {userInfo} = state3
  let handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const {data} = await axios.post("http://localhost:8000/api/users/signup",{
        name,
        email,
        password
      })
      navigate('/signin',{state:"Please Log In To Continue"})
    }catch(err){
      toast.error("Invalid E-mail or Password")
    }
  }

  useEffect(()=>{
    if(userInfo){
      navigate (redirect)
    }
  },[])
  return (
    <>
    <Topbar/>
      <Menubar/>
    <div className='signupfrm'>
        <Form onSubmit={handleSubmit}>
            <Alert variant='primary' className='text-center alertsignup'style={{borderRadius:"10px",width:"450px"}}><h1><Alert variant='primary'><h4>Welcome! Please Sign Up to continue.</h4></Alert></h1></Alert>
  <Form.Group className="mb-3">
    <Form.Label  >Name</Form.Label>
    <Form.Control onChange={(e)=>setName(e.target.value)} style={{borderRadius:"10px"}} type="text" placeholder="write your name" />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label  >Email address</Form.Label>
    <Form.Control onChange={(e)=>setEmail(e.target.value)} style={{borderRadius:"10px"}} type="email" placeholder="Enter email" />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Password</Form.Label>
    <Form.Control onChange={(e)=>setPassword(e.target.value)} style={{borderRadius:"10px"}} type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control onChange={(e)=>setConfirmpassword(e.target.value)} style={{borderRadius:"10px"}} type="password" placeholder="Confirm Password" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Remember me" />
  </Form.Group>
  <Button style={{marginLeft:"160px",width:"100px"}} className="mt-3 mb-3" variant="primary" type="submit">
    Sign Up
  </Button>
  <br/>
  <Form.Text style={{marginLeft:"100px"}}>
      Already Have An Account? <Link style={{color:"#333",marginLeft:"5px"}} to={`/signin?redirect=${redirect}`}>Log In</Link>
  </Form.Text>
</Form>
    </div>
    </>
  )
}

export default SignUpPage