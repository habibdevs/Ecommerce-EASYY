import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Container,Row,Col,Button,Card,Modal,Form,Alert,ListGroup } from 'react-bootstrap'
import Checkoutstep from './Checkoutstep'
import { Store } from '../Store'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Topbar from './Topbar'
import Menubar from './Menubar'
import { toast } from 'react-toastify'
import axios from 'axios'


const reducer  =(state,action)=>{
  switch(action.type){
    case 'CREATE_REQUEST' :
      return {...state,loading : true}
      case 'CREATE_SUCCESS':
        return {...state,loading:false}
        case 'CREATE_FAIL':
          return {...state,loading :false}
  }

}


const Placeorder = () => {

    const [{loading},dispatch] = useReducer(reducer,{
      loading:false,
      error:''
    })

    const {dispatch4,} = useContext(Store)
    let {state,dispatch:ctxdispatch,state3,state4,state5}=useContext(Store)
    console.log(state5)
    const  {userInfo} = state3
    console.log(userInfo)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate()
  const [fullname,setFullname] = useState(state4.shippingaddress.fullname || "")
  const [address,setAddress] = useState(state4.shippingaddress.address || "")
  const [city,setCity] = useState(state4.shippingaddress.city || "")
  const [postcode,setPostcode] = useState(state4.shippingaddress.postcode || "")
  const [country,setCountry] = useState(state4.shippingaddress.country || "")
  const [total,setTotal] = useState("")
  // const {dispatch} = useContext(Store)
  const {cart:{cartItems}} = state


  let handleSubmit=(e)=>{
    e.preventDefault()
    dispatch4({
      type:"SHIPPING_ADDRESS",
      payload:{
      fullname,
      address,
      city,
      postcode,
      country
      }
      
    })
    localStorage.setItem('shippingaddress',JSON.stringify({
      fullname,
      address,
      city,
      postcode,
      country
    }))
  }
  
  useEffect(()=>{
    if(!userInfo){
      navigate ('/signin/?redirect=/shipping')
    }
  },[])


  let updateCart=(item,quantity)=>{
    dispatch({
        type:'CART_ADD_ITEM',
        payload:{...item,quantity}
    })
}

  useEffect(()=>{
    let total = state.cart.cartItems.reduce((accumulator,current)=>accumulator + current.price * current.quantity, 0)
    setTotal(total)
  },[state.cart.cartItems])
  let handlePlaceOrder =async()=>{
    try{
      const {data} = await axios.post('http://localhost:8000/api/orders',
      {
        orderItems : state.cart.cartItems,
        shippingaddress : state4.shippingaddress,
        paymentMethod : state5.paymentMethod,
        productPrice : total,
        shippingPrice: 0 ,
        taxPrice : total<500?0:(total*5)/100,
        totalPrice : total+(total<500?0:(total*5)/100)+0
      },
      {
        headers:{
          authorization : `Bearer ${userInfo.token}`
        }
      }
      )
      console.log(data)
      ctxdispatch({type:'CLEAR_CART'})
      dispatch({type : 'CREATE_SUCCESS'})
      localStorage.removeItem('cartItems')
      navigate(`/orders/${data.order._id}`)
    }catch(err){
      dispatch({type: 'CREATE_FAIL'})
      toast.error(err)
    }
  }
  return (
        <>
      <Topbar/>
      <Menubar/>
        <Checkoutstep step1="true" step2="true" step3="true" step4="true"/>
        <Helmet>
        <title>
          Place Order
        </title>
      </Helmet>
    <Container className='mt-5'>
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit} className="frm">
    <Alert variant='primary' className='text-center'style={{borderRadius:"10px"}}><h1>Shipping Details</h1></Alert>
  <Form.Group className="mb-3 frminput">
    <Form.Label>Full Name</Form.Label>
    <Form.Control value={fullname} style={{borderRadius:"10px"}} placeholder="write your full name" onChange={(e)=>setFullname(e.target.value)}/>
  </Form.Group>

  <Form.Group className="mb-3 frminput">
    <Form.Label>Address</Form.Label>
    <Form.Control value={address} style={{borderRadius:"10px"}} placeholder="write your address" onChange={(e)=>setAddress(e.target.value)}/>
  </Form.Group>
  <Form.Group className="mb-3 frminput">
    <Form.Label>City</Form.Label>
    <Form.Control value={city} style={{borderRadius:"10px"}} placeholder="enter yourt city" onChange={(e)=>setCity(e.target.value)}/>
  </Form.Group>
  <Form.Group className="mb-3 frminput">
    <Form.Label>Postal Code</Form.Label>
    <Form.Control value={postcode} style={{borderRadius:"10px"}} placeholder="enter your postal code" onChange={(e)=>setPostcode(e.target.value)}/>
  </Form.Group>
  <Form.Group className="mb-3 frminput">
    <Form.Label>Country</Form.Label>
    <Form.Control value={country} style={{borderRadius:"10px"}} placeholder="enter your countey" onChange={(e)=>setCountry(e.target.value)}/>
  </Form.Group>
  <Button type="submit" className= 'save continuepp' onClick={handleClose}>
            Save Changes
          </Button>
</Form>
        
      </Modal>
        <Row>
            <Col lg={8}>
                <h1>Preview Order</h1>
                <Card mt='5'>                   
                    <Card.Body>
                        <Card.Title>Shipping Address</Card.Title>
                        <hr/>
                        <Card.Text>
                        <b>Name: {state4.shippingaddress.fullname}</b><br/>
                        <b>Address: {state4.shippingaddress.address}</b><br/>
                        <b>City: {state4.shippingaddress.city}</b><br/>
                        <b>Postal code: {state4.shippingaddress.postcode}</b><br/>
                        <b>Country: {state4.shippingaddress.country}</b><br/>
                        </Card.Text>                       
                        <Button  className='continuepp' onClick={handleShow}>Edit</Button>
                    </Card.Body>
                </Card>
                
                <Card style={{marginTop:"60px"}}>                   
                    <Card.Body>
                        <Card.Title>Order Items</Card.Title>
                        <hr/>
                        <Card.Text>
                        <b>Total Items: {state.cart.cartItems.length}</b><br/>
                        </Card.Text>                       
                        <ListGroup className='mt-3'>
                            {state.cart.cartItems.map(item=>(
                                <ListGroup.Item>
                                    <img className='me-3' src={item.img} style={{width:"80px"}}/>
                                    {item.name}
                                    <b className='ms-4'>Quantity : {item.quantity} </b>
                                    <div className='calcart'>
                                    <Button variant="light" className='minusbtn' onClick={()=>updateCart(item,item.quantity-1)} disabled={item.quantity === 1}>-</Button>
      <span>{item.quantity}</span>
      <Button variant="light" className='plusbtn' onClick={()=>updateCart(item,item.quantity+1)}  disabled={item.quantity == item.instock}>+</Button>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        <Link to='/cartpage'>
                        <Button className='continuepp' >Edit</Button>
                            </Link>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={4}>
                <Card mt='5'>                   
                    <Card.Body>
                        <Card.Title>Payment Method</Card.Title>
                        <hr/>
                        <Card.Text>
                        <b>Payment Method: {state5.paymentMethod}</b><br/>
                        </Card.Text>
                        <Link to="/payment"><Button className='continuepp'>Edit</Button></Link>
                    </Card.Body>
                </Card> 
                <Card style={{marginTop:"60px"}}>                   
                    <Card.Body>
                        <Card.Title>Payment Summary</Card.Title>
                        <hr/>
                        <Card.Text>
                        </Card.Text>                       
                        <ListGroup className='mt-3'>
                        <ListGroup.Item><b>Product Price: <a>${total}</a></b></ListGroup.Item>
                        <ListGroup.Item><b>Shipping Fee: $0</b></ListGroup.Item>
                        <ListGroup.Item><b>Tax: ${total<500?0:(total*5)/100}</b></ListGroup.Item>
                        <ListGroup.Item><b>Total Price: {total+(total<500?0:(total*5)/100)+0}</b></ListGroup.Item>
                        <Button  className='continuepp' onClick={handlePlaceOrder} >Place Order</Button>
                        </ListGroup>
                    </Card.Body>
                </Card>
                </Col>
        </Row>
    </Container>
        </>
  )
}

export default Placeorder