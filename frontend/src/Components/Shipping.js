import React,{useState,useContext, useEffect} from 'react'
import { Form,Button,Container,Alert } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate,Link } from 'react-router-dom'
import { Store } from '../Store'
import Checkoutstep from './Checkoutstep'
import Menubar from './Menubar'
import Topbar from './Topbar'


const Shipping = () => {
  const navigate = useNavigate()
  const {state4,dispatch4,state3} = useContext(Store)
  const  {userInfo} = state3
  const [fullname,setFullname] = useState(state4.shippingaddress.fullname || "")
  const [street,setStreet] = useState(state4.shippingaddress.fullname || "")
  const [address,setAddress] = useState(state4.shippingaddress.address || "")
  const [city,setCity] = useState(state4.shippingaddress.city || "")
  const [postcode,setPostcode] = useState(state4.shippingaddress.postcode || "")
  const [country,setCountry] = useState(state4.shippingaddress.country || "")

  // console.log(state4.shippingaddress)

  let handleSubmit=(e)=>{
  e.preventDefault()
  dispatch4({
    type:"SHIPPING_ADDRESS",
    payload:{
    fullname,
    street,
    address,
    city,
    postcode,
    country
    }
    
  })
  localStorage.setItem('shippingaddress',JSON.stringify({
    fullname,
    street,
    address,
    city,
    postcode,
    country
  }))
  navigate('/payment')
}

useEffect(()=>{
  if(!userInfo){
    navigate ('/signin/?redirect=/shipping')
  }
},[])
  return (
    <>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      
      <Topbar/>
      <Menubar/>
      <Checkoutstep step1="true"step2="true"/>

    <Container className='w-25 border mt-5 p-3'style={{borderRadius:"20px"}}>

    <div class="wrapper1">
        <Form onSubmit={handleSubmit}>
    <Alert className='text-center'style={{borderRadius:"10px"}}><h1>
                <i class="fas fa-shipping-fast"></i>
                Shipping Details
            </h1></Alert>
  <Form.Group className="mb-3">
    <Form.Label>Full Name</Form.Label>
    <Form.Control value={fullname} style={{borderRadius:"10px"}} placeholder="write your full name" onChange={(e)=>setFullname(e.target.value)}/>
  </Form.Group>

  <Form.Group className="address">
    <Form.Label>Address</Form.Label>
    <Form.Control value={address} style={{borderRadius:"10px"}} placeholder="write your address" onChange={(e)=>setAddress(e.target.value)}/>
  </Form.Group>
  <Form.Group className="city">
    <Form.Label>City</Form.Label>
    <Form.Control value={city} style={{borderRadius:"10px"}} placeholder="enter yourt city" onChange={(e)=>setCity(e.target.value)}/>
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Postal Code</Form.Label>
    <Form.Control value={postcode} style={{borderRadius:"10px"}} placeholder="enter your postal code" onChange={(e)=>setPostcode(e.target.value)}/>
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Country</Form.Label>
    <Form.Control value={country} style={{borderRadius:"10px"}} placeholder="enter your countey" onChange={(e)=>setCountry(e.target.value)}/>
  </Form.Group>
  <Button style={{borderRadius:"10px",marginLeft:"590px"}} className='checkoutcnt' variant="primary" type="submit">
    Continue
  </Button>
</Form>
</div>
      
    {/* <Form onSubmit={handleSubmit}>
    <Alert variant='primary' className='text-center'style={{borderRadius:"10px"}}><h1>Shipping Details</h1></Alert>
  <Form.Group className="mb-3">
    <Form.Label>Full Name</Form.Label>
    <Form.Control value={fullname} style={{borderRadius:"10px"}} placeholder="write your full name" onChange={(e)=>setFullname(e.target.value)}/>
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Address</Form.Label>
    <Form.Control value={address} style={{borderRadius:"10px"}} placeholder="write your address" onChange={(e)=>setAddress(e.target.value)}/>
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>City</Form.Label>
    <Form.Control value={city} style={{borderRadius:"10px"}} placeholder="enter yourt city" onChange={(e)=>setCity(e.target.value)}/>
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Postal Code</Form.Label>
    <Form.Control value={postcode} style={{borderRadius:"10px"}} placeholder="enter your postal code" onChange={(e)=>setPostcode(e.target.value)}/>
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Country</Form.Label>
    <Form.Control value={country} style={{borderRadius:"10px"}} placeholder="enter your countey" onChange={(e)=>setCountry(e.target.value)}/>
  </Form.Group>
  <Button style={{borderRadius:"10px"}} variant="primary" type="submit">
    Continue
  </Button>
</Form> */}

    </Container>
    </>
    
  )
}

export default Shipping