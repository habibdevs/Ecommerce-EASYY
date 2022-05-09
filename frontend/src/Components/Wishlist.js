import React, { useContext } from 'react'
import { Container,Row,Col,Alert,ListGroup, Button } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import { AiFillDelete } from 'react-icons/ai';
import Topbar from './Topbar'
import Menubar from './Menubar'



const WishList = () => {

    let navigate = useNavigate()

    const {state2,dispatch2}= useContext(Store)

    const {wishlist:{wishlistItems}}= state2

    let updatewishlist=(item,quantity)=>{
        dispatch2({
            type:'WISHLIST_ADD_ITEM',
            payload:{...item}
        })
    }

    let handleRemoveItem=(item)=>{
        dispatch2({
            type:'WISHLIST_REMOVE_ITEM',
            payload:item
        })
    }
    

  return (
    <>
    <Topbar/>
    <Menubar/>
    <Container>
        
    <Helmet>
        <title>WishList</title>
    </Helmet>
    
    {/* <Row className='mt-5'>
        <Col lg={8}>
            {wishlistItems.length <0 

            ?
            <Alert className="text-center mt-5" variant="danger">
                WishList Is Empty
            </Alert>

            :
            <ListGroup>
                {wishlistItems.map((item)=>(

                
                <ListGroup.Item>
                    <Row>
                        <Col lg={4}>
                            <img width="80" src={item.img}/>
                            <Link className='title' to={`/products/${item.slug}`}><a>{item.name}</a></Link>
                        </Col>
                        <Col lg={3} style={{marginTop:"25px"}}>
                        <h4>Price : <a style={{color:"#f57224"}}>${item.price}</a></h4>
                        </Col>
                        <Col lg={4}>
                            <Button variant="danger" style={{marginLeft:"110px",width:"200px",marginTop:"8px"}} onClick={()=>handleRemoveItem(item)}>Remove From Wishlist <i class="fas fa-trash"></i></Button>
                        </Col>
                        </Row>
                        </ListGroup.Item>
                
                ))}
                        </ListGroup>
          
        }
        </Col>
    </Row>*/}

    
    <Row style={{marginTop:"80px"}}>
    <Alert className='text-center'style={{borderRadius:"10px"}}><h2>Wishlist Items</h2></Alert>

      <Col lg={12}>
        {wishlistItems.length <0 
        ? 
        <Alert variant='danger'>
          WishList Is Empty
      </Alert>
      :
      <ListGroup variant="flush">
        <Row style={{background:"#F7941D",height:"40px",}}>
        <Col style={{marginTop:"7px",}} lg={3}>Product</Col>
        <Col style={{marginTop:"7px"}} lg={3}>Name</Col>
        <Col style={{marginTop:"7px",textAlign:"center"}} lg={3}>Unit Price</Col>
        <Col style={{marginTop:"7px"}} lg={3}>Delete</Col>
        </Row>
  {wishlistItems.map((item)=>(
    <ListGroup.Item style={{marginTop:"20px"}}>
  
    <Row>
      <Col style={{marginLeft:"-15px"}}lg={1}>
        <img src={item.img} style={{width:"80px"}}/>
      </Col>
      <Col style={{textAlign:"center",marginLeft:"70px"}}  lg={3}>
      <Link style={{color:"#333"}} to={`/products/${item.slug}`}>{item.carddiscription}</Link>
      
      </Col>
      <Col style={{textAlign:"center",marginLeft:"210px"}}  lg={2}>
      <a>$ {item.price}</a>
      </Col>
      <Col style={{textAlign:"center"}} lg={1}>
      <a className='dlticn' style={{marginLeft:"80px",width:"200px",marginTop:"8px"}} onClick={()=>handleRemoveItem(item)}><AiFillDelete/></a>
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

    </Row>

    </Container>


    </>
  )
}

export default WishList