import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import Itembar from './Itembar'
import Topbar from './Topbar'
import {toast} from 'react-toastify'
import Menubar from './Menubar'


const Login = () => {

  const navigate = useNavigate()
  let {search,state} = useLocation()
  let redirectUrl = new URLSearchParams(search).get('redirect')
  let redirect = redirectUrl ? redirectUrl : "/"

  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")

  const {state3,dispatch3} = useContext(Store)
  const {userInfo} = state3
  let handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const {data} =await axios.post("http://localhost:8000/api/users/signin",{
        email,
        password
      })
      // console.log(data)
      dispatch3({type:'USER_SIGNIN',payload:data})
      localStorage.setItem('userInfo',JSON.stringify(data))
      navigate(redirect || "/")
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
        <Form className='loginform' onSubmit={handleSubmit}>
            <Alert variant='primary' className='text-center'style={{borderRadius:"10px"}}><h4>Welcome! Please Login to continue.</h4></Alert>
  <Form.Group className="mb-3 emailfrm">
    <Form.Label  >Email address</Form.Label>
    <Form.Control onChange={(e)=>setEmail(e.target.value)} style={{borderRadius:"10px"}} type="email" placeholder="Enter email" />
  </Form.Group>

  <Form.Group className="mb-3 passfrm">
    <Form.Label>Password</Form.Label>
    <Form.Control onChange={(e)=>setPassword(e.target.value)} style={{borderRadius:"10px"}} type="password" placeholder="Password" />
  </Form.Group>
  <Button style={{marginLeft:"160px",width:"100px"}} className="mt-3 mb-3 btnform" variant="primary" type="submit">
    Sign In
  </Button>
  <br/>
  <Form.Text>
      Don't Have An Account? <Link style={{color:"#333"}} to={`/signup?redirect=${redirect}`}>Create Account</Link>
  </Form.Text>
</Form>
    </>
  )
}

export default Login