import React, { useContext, useState } from 'react'
import { Container,Alert,Form, Button,Modal } from 'react-bootstrap'
import Checkoutstep from './Checkoutstep'
import { useNavigate,Link } from 'react-router-dom'
import { Store } from '../Store'
import Topbar from './Topbar'
import Menubar from './Menubar'

const Payment = () => {
    let {state5,dispatch5}=useContext(Store)
    let navigate = useNavigate()
    let [paymentMethod,setPaymentMethod] = useState(state5.paymentMethod?state5.paymentMethod:"")
  
    

    let handleSubmit=(e)=>{
        e.preventDefault()
        dispatch5({type:'PAYMENT_METHOD',payload:paymentMethod})
        localStorage.setItem('paymentMethod',JSON.stringify(paymentMethod))
            navigate('/placeorder')
        }


    return (

      <>
      <Topbar/>
      <Menubar/>
                <Checkoutstep step1="true"step2="true" step3="true"/>
      <Container className='w-25 border mt-5 p-3'>
         <Alert variant='primary' className='text-center'style={{borderRadius:"10px"}}><h4>Choose Payment Method</h4></Alert>


         
         <Form onSubmit={handleSubmit}>
         <Form.Check 
        type="radio"
        id="paypal"
        label="Paypal"
        value="paypal"
        checked={paymentMethod == "paypal"}
        onChange={e=> setPaymentMethod(e.target.value)}
      />
         <Form.Check 
        type="radio"
        id="strip"
        label="Strip"
        value="Strip"
        checked={paymentMethod == "Strip"}
        onChange={e=> setPaymentMethod(e.target.value)}
      />
         <Form.Check 
        type="radio"
        id="sslcommerze"
        label="SSLcommerze"
        value="SSLcommerze"
        checked={paymentMethod == "SSLcommerze"}
        onChange={e=> setPaymentMethod(e.target.value)}
      />
      
      <Button type='submit' variant="" className='mt-3 continuepp'>Continue</Button>

         </Form>
    </Container>
                </>
  )
}

export default Payment