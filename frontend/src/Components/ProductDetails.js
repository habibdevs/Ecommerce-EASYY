import axios from 'axios'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import Menubar from './Menubar';
import Rating from './Rating';
import Topbar from './Topbar';
import ReactImageZoom from 'react-image-zoom';
import Itembar from './Itembar';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { BsHeart } from 'react-icons/bs';


function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return {...state,loading:true};
      case 'FETCH_SUCCESS':
        return {...state,loading:false,product:action.payload};
      case 'FETCH_FAIL':
        return {...state,loading:false,error:action.payload};
      default:
        return state
    }
  }
  
  
  

const ProductDetails = () => {

    let params = useParams();
    let navigate =useNavigate()
    const [{loading,product,error},dispatch] = useReducer(reducer,{
        loading:false,
        error:'',
        product:{}
    })

    useEffect(async ()=>{
        dispatch({type:'FETCH_REQUEST'})
        try{
          let product = await axios.get(`http://localhost:8000/products/${params.slug}`)
          dispatch({type:'FETCH_SUCCESS',payload:product.data})
      }catch(err){
          dispatch({type:'FETCH_FAIL',payload:err.message})
          
      }
    },[params.slug])

    const { state , dispatch: ctxDispatch,state2,dispatch2} = useContext(Store)
    const {cart} = state

    let handleAddToCart=async()=>{
        const existingItem = cart.cartItems.find((item)=>item._id === product._id)
        const quantity = existingItem ? existingItem.quantity +1 : 1
        const {data} = await axios.get(`http://localhost:8000/cartproduct/${product._id}`)       
        if(data.instock <quantity){
            window.alert(`${product.title}Product Out Of Stock`)
            return
        }
        
        ctxDispatch({
            type:'CART_ADD_ITEM',
            payload:{...product,quantity}
        })
        navigate(`/cartpage`)
    }

    let handleAddToWishlist= async(product)=>{
    
      dispatch2({
        type:'WISHLIST_ADD_ITEM',
        payload:{...product}
      })
    }

    let handleCheckOut=()=>{
      navigate('/signin?redirect=/shipping')
    }
  
  return (
    <>
    <Helmet>
        <title>{product.carddiscription}</title>
      </Helmet>
    <Topbar/>
    <Menubar/>
    <Itembar/>
    <Container>
        <Row style={{marginTop:"50px"}}>
        {loading ? <div class="loader"></div>

:

            product ?
            <>
            <Col lg={6}>
            {product.img &&
          <ReactImageZoom width= "600"  zoomWidth= "500" img= {product.img}  className='imgzoom'/>
          }
            </Col>
            <Col lg={6}>
            <Card style={{ width: '18rem' }}>
            <Card.Header>Home  /  Products</Card.Header>
  <Card.Body>
    <Card.Title>Product Details</Card.Title>
    <Card.Subtitle style={{marginTop:"20px"}} className="mb-2 text-muted"><h3>{product.carddiscription}</h3></Card.Subtitle>
    <Card.Text style={{marginTop:"40px"}}>
      {product.description}
    </Card.Text>
    <Card.Text className="del">Free delivery available*</Card.Text>
    <Card.Text style={{marginTop:"30px"}}>
      <Rating rating={product.rating} numberofrating={product.numberofrating} className='rating'/>
    </Card.Text>
    <Card.Text style={{marginTop:"30px"}}>
      <h3 style={{color:"#F7941D"}}>$ {product.price}
      </h3>
      
<button onClick={()=>handleAddToWishlist(product)} style={{marginLeft:"520px",marginTop:"-150px",position:"absolute",fontSize:"20px",background:"transparent",borderColor:"transparent"}}><BsHeart className='heart'/></button>
    </Card.Text>
    <Button onClick={handleCheckOut} className='pdbuynow'>Buy Now</Button>
    <Button onClick={handleAddToCart} className='pdcartbtn'>Add To Cart</Button>
  </Card.Body>
</Card>
            </Col>
            </>
            
        :
        
        <Alert variant='danger'> Product Not Found, Try Another Product
    </Alert>
        

    }
        </Row>
    </Container>
    </>
  )
}

export default ProductDetails