import React, { useContext } from 'react'
import { Alert, Button, Card, Col, Container, Dropdown, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import Itembar from './Itembar'
import Menubar from './Menubar'
import Topbar from './Topbar'
import { AiFillDelete } from 'react-icons/ai';




const Cartpage = () => {
  let navigate =useNavigate()
  const {state,dispatch} = useContext(Store)
  const {cart:{cartItems}} = state

  let updateCart=(item,quantity)=>{
    dispatch({
        type:'CART_ADD_ITEM',
        payload:{...item,quantity}
    })
}

let handleRemoveItem=(item)=>{
  dispatch({
      type:'CART_REMOVE_ITEM',
      payload:item
  })
}

let handleCheckOut=()=>{
  navigate('/signin?redirect=/shipping')
}

  return (
    <>
    <Helmet>
      <title>Shopping Cart</title>
    </Helmet>
    <Topbar/>
    <Menubar/>
    <Itembar/>
    <Container>
    <Row style={{marginTop:"80px"}}>
      <Col lg={12}>
        {cartItems.length ===0 
        ? 
        <Alert variant='danger'>
          Cart Is Empty
      </Alert>
      :
      <ListGroup variant="flush">
        <Row style={{background:"#F7941D",height:"40px",}}>
        <Col style={{marginTop:"7px",}} lg={2}>Product</Col>
        <Col style={{marginTop:"7px"}} lg={2}>Name</Col>
        <Col style={{marginTop:"7px",textAlign:"center"}} lg={2}>Unit Price</Col>
        <Col style={{marginTop:"7px",textAlign:"center"}} lg={4}>Quantity</Col>
        <Col style={{marginTop:"7px"}} lg={1}>Delete</Col>
        <Col style={{marginTop:"7px"}} lg={1}>Total</Col>
        </Row>
  {cartItems.map((item)=>(
    <ListGroup.Item style={{marginTop:"20px"}}>
      
    <Row>
      <Col style={{marginLeft:"-15px"}}lg={1}>
        <img src={item.img} style={{width:"80px"}}/>
      </Col>
      <Col style={{textAlign:"center"}}  lg={3}>
      <Link style={{color:"#333"}} to={`/products/${item.slug}`}>{item.carddiscription}</Link>
      
      </Col>
      <Col style={{textAlign:"center"}}  lg={2}>
      <a>$ {item.price}</a>
      </Col>
      <Col style={{textAlign:"center",marginLeft:"10px"}} lg={4}>
      <Button variant="light" className='minusbtn' onClick={()=>updateCart(item,item.quantity-1)} disabled={item.quantity === 1}>-</Button>
      <span>{item.quantity}</span>
      <Button variant="light" className='plusbtn' onClick={()=>updateCart(item,item.quantity+1)}  disabled={item.quantity == item.instock}>+</Button>
      </Col>
      <Col style={{textAlign:"center"}} lg={1}>
      <a onClick={()=>handleRemoveItem(item)} className='dlticn'><AiFillDelete/></a>
      </Col>
      <Col style={{textAlign:"center"}}  lg={1}>
      <a className='dlticn'>{item.quantity}</a>
      </Col>
    </Row>
  </ListGroup.Item>
  ))}
</ListGroup>


      }
      </Col>
<div className='carttotal'>


<ListGroup variant="flush" >
        <Row style={{height:"40px",}} className='total'>
        <Col style={{marginTop:"7px",}} lg={2}>Subtotal</Col>
        <Col style={{marginTop:"7px",marginLeft:"40px"}} lg={1}>${cartItems.reduce((accumulator,current)=>accumulator + current.price * current.quantity, 0)}</Col>
        </Row>
    <ListGroup.Item style={{marginTop:"20px"}}>
      
    <Row style={{marginLeft:"-28px",marginTop:"-10px",display:"inline-block"}}>
      <Col style={{}} >
      <a>Shipping</a>
      </Col>
      <Col style={{marginLeft:"120px",marginTop:"-22px"}}  lg={1}>
      <a>Free</a>
      </Col>
    </Row>
    <Dropdown.Divider style={{width:"250px",marginLeft:"-40px"}}/>
      <Row>
      <Col style={{marginTop:"10px",fontWeight:"500"}} lg={2}>
      <a>Pay</a>
      </Col>
      <Col style={{marginTop:"10px",marginLeft:"25px",fontWeight:"500"}} lg={1}>
      <a>${cartItems.reduce((accumulator,current)=>accumulator + current.price * current.quantity, 0)}</a>
      </Col>
      </Row>
  </ListGroup.Item>
</ListGroup>

<div style={{marginLeft:"-25px"}}>
<Button onClick={handleCheckOut} className='paymentButton'>Payment</Button>
<Button className='continueButton'><Link to='/products'>Continue Shopping</Link></Button>
</div>
</div>
    </Row>
    </Container>
    </>
  )
}

export default Cartpage