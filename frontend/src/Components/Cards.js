import axios from 'axios'
import React, { useContext, useEffect, useReducer, useState, } from 'react'
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import Rating1 from './Rating1';
import { Store } from '../Store';
import { AiOutlineEye } from 'react-icons/ai';
import Rating from './Rating';
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



const Cards = () => {
  const [lgShow, setLgShow] = useState(false);
  let navigate =useNavigate()
  const [{loading,product,error},dispatch] = useReducer(reducer,{
    loading:false,
    error:'',
    product:[]
})

const [details,setDetails] = useState({})

    useEffect(async ()=>{
      dispatch({type:'FETCH_REQUEST'})
      try{
        let product = await axios.get("http://localhost:8000/products")
        dispatch({type:'FETCH_SUCCESS',payload:product.data})
    }catch(err){
        dispatch({type:'FETCH_SUCCESS',payload:err.message})
        
    }
  },[])
  
  const { state , dispatch: ctxDispatch,state2,dispatch2} = useContext(Store)
  const {cart} = state

  let handleAddToCart=async(product)=>{
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
  }

  let handleDetails=async(pro)=>{
    setLgShow(true)
    let productDetails = await axios.get(`http://localhost:8000/products/${pro}`)
    setDetails(productDetails.data)
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
    <Container>
      <Row>
      {loading ? <div class="loader"></div>

      :

      product.map(item=>(

    <Col lg={3}>

<div class="container page-wrapper">
  <div class="page-inner">
    <div class="row">
      <div class="el-wrapper">
        <div class="box-up">
          <img class="img" src={item.img} alt=""/>
          <div class="img-info">
            <div class="a-size"><span class="size"><Link style={{color:"#333"}} to={`/products/${item.slug}`}>{item.carddiscription}</Link>
            <Rating1  rating={item.rating} numberofrating={item.numberofrating} className='rating'/>
            </span>
            
            </div>
          </div>
        </div>

        <div class="box-down">
          <div class="h-bg">
            <div class="h-bg-inner"></div>
          </div>

          <a class="cart">
            <span class="price">${item.price} </span>
            {item.instock == 0
          ?
          <span class="add-to-cart">
          <button disabled onClick={()=>handleAddToCart(item)} class="txt1 buynowpp">Out Of Stock</button>
          <button onClick={()=>handleAddToWishlist(item)} style={{marginLeft:"130px",marginTop:"-4px",position:"absolute",fontSize:"20px",background:"transparent",borderColor:"transparent",color:"#fff"}}><BsHeart className='heart'/></button>
          <button className='details' onClick={()=>handleDetails(item.slug)}><AiOutlineEye/></button>
        </span>
          
          :
            <span class="add-to-cart">
              <button onClick={()=>handleAddToCart(item)}   class="txt">Add in cart</button>
              <button onClick={()=>handleAddToWishlist(item)} style={{marginLeft:"130px",marginTop:"-4px",position:"absolute",fontSize:"20px",background:"transparent",borderColor:"transparent",color:"#fff"}}><BsHeart className='heart'/></button>
              <button className='details' onClick={()=>handleDetails(item.slug)}><AiOutlineEye/></button>
            </span>
            
}
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

    </Col>

      ))}

      </Row>      
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Product Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {details? 
        
        
        <Card>
  <Card.Header>{details.carddiscription}</Card.Header>
  <Card.Body>
    <img src={details.img} style={{width:"350px"}}/>
    <div className='detailscard'>
      <Card.Title>{details.carddiscription}</Card.Title>
    <Card.Text>
      {details.description}
    </Card.Text>
    <Card.Text>
      <Rating rating={details.rating} numberofrating={details.numberofrating} className='rating'/>
    </Card.Text>
    <Card.Text style={{color:"#F7941D",fontSize:"20px"}}>
      $ {details.price}
    </Card.Text>
    <button onClick={()=>handleAddToWishlist(details)} style={{marginLeft:"320px",marginTop:"-90px",position:"absolute",fontSize:"20px",background:"transparent",borderColor:"transparent"}}><BsHeart className='heart'/></button>
    {details.instock==0
    
    ?
  
    <button style={{marginLeft:"120px",background:"#dc3545",color:"#fff",borderRadius:"5px",height:"35px",width:"120px"}} disabled className='txt1 buynowpp'>Out Of Stock</button>
  
  :
  <>
  <button className='addtocartdetails' onClick={()=>handleAddToCart(details)} >Add in cart</button>
  <button onClick={handleCheckOut} className='buynowdetails'>Buy Now</button>
  </>
  
  }
    </div>
    
  </Card.Body>
</Card>
:
<h1>Details Not Found</h1>

}
</Modal.Body>
</Modal>

</Container>
</>
)
}

export default Cards