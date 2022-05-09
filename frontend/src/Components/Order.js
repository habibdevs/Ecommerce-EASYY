import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import { Alert, Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Store } from '../Store'



function reducer (state,action){
    switch(action.type){
        case 'FETCH_REQUEST' :
            return{...state,loading:true,error:''}
            case 'FETCH_SUCCESS' :
                return{...state,loading:false,order:action.payload,error:''}
                case 'FETCH_FAIL':
                    return{
                        ...state,loading:false,error:action.payload}
    }
}

const Order = () => {
  
    const [{loading,error,order},dispatch] = useReducer(reducer,{
        loading : false,
        order : {},
        error : '',
    })

    const {state3} = useContext(Store)
    const {userInfo} = state3
    const params = useParams()
    const {id: orderID} = params
    const navigate = useNavigate()

    useEffect(()=>{
        if(!order._id || (order._id && order._id !== orderID)){
            const fetchOrder = async()=>{
                try{
                    dispatch({type:'FETCH_REQUEST'})
                    const {data} = await axios.get(`http://localhost:8000/api/orders/${orderID}`,{
                        headers : {authorization : `Bearer ${userInfo.token}`}
                    })
                    // console.log(data)
                    dispatch({type:'FETCH_SUCCESS',payload:data})
                }catch (err){
                    dispatch({type: 'FETCH_FAIL',payload:err})
                }
            }
            fetchOrder()
        }
    },[])
    console.log(order)

    return (
    
        loading 
            
        ?

        <div class="loader"></div>
    :

    error
    ?
    
    <Alert variant='danger'>
        <p>{error}</p>
    </Alert>
    :
        <Container>
        <h1>Order {orderID}</h1>
        <Row>
            <Col lg={8}>
            <Card>
  <Card.Body>
    <Card.Title>Shipping</Card.Title>
    <Card.Text>
        <b>Name</b> {order.shippingaddress && order.shippingaddress.fullname}<br/>
        <b>Address</b> {order.shippingaddress  && order.shippingaddress.address}<br/>
        <b>Address</b> {order.shippingaddress  && order.shippingaddress.address},{order.shippingaddress  && 
        order.shippingaddress.city},{order.shippingaddress  && order.shippingaddress.country}<br/>
    </Card.Text>
    
  </Card.Body>
</Card>
            <Card>
  <Card.Body>
    <Card.Title>Payment</Card.Title>
    <Card.Text>
        <b>Method</b> {order.paymentMethod}<br/>
    </Card.Text>
    
  </Card.Body>
</Card>
            <Card>
  <Card.Body>
    <Card.Title>Items</Card.Title>
    <Card.Text>
        <ListGroup>
        {order.orderItems  && order.orderItems.map(item=>(
            <ListGroup.Item>
                <Row>
                    <Col lg={6}>
                        <img style={{width:"80px"}} src={item.img}/>
                        <Link to={`/products/${item.slug}`}>{item.title}</Link>
                    </Col>
                    <Col lg={3}>
                        {item.quantity}
                    </Col>
                    <Col lg={3}>
                        $ {item.price}
                    </Col>
                </Row>
            </ListGroup.Item>

        ))}
</ListGroup>
    </Card.Text>
    
  </Card.Body>
</Card>
            </Col>
            <Col lg={4}>
                <h3>Order Summary</h3>
                <Row>
                    <Col>Items</Col>
                    <Col>${order.totalPrice}</Col>
                </Row>
                <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                </Row>
            </Col>
        </Row>
        </Container>

  )
}

export default Order