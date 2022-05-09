import React, { useContext, useEffect, useState } from 'react'
import { Badge, Button, Container, Dropdown, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { AiOutlineHeart } from 'react-icons/ai';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineBars } from 'react-icons/ai';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { AiFillDelete } from 'react-icons/ai';



const Menubar = () => {

  let navigate =useNavigate()
  let [logo,setLogo] = useState({})
  useEffect(async()=>{
    let data = await axios.get("http://localhost:8000/logo")
    setLogo(data.data.logoimg)
  },[])
  
  const {state,dispatch,state2,dispatch2,} = useContext(Store)
  const {cart:{cartItems}} = state
  const {wishlist:{wishlistItems}}= state2

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

let handleRemoveWItem=(item)=>{
  dispatch2({
      type:'WISHLIST_REMOVE_ITEM',
      payload:item
  })
}

let handleCheckOut=()=>{
  navigate('/signin?redirect=/shipping')
}
  return (
    <>
    <Navbar style={{borderTop:"1px solid #eee",background:"#fff",height:"100px"}} expand="lg">
  <Container>
    <Navbar.Brand ><Link to='/'><img src={logo} style={{height:"35px",marginLeft:"100px"}}/></Link></Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="ms-auto"
          aria-label="Search"
        />
        <Button variant="success">Search </Button>
      </Form>
      <Nav
        className="carticons "
        navbarScroll
      >
        <NavDropdown style={{marginLeft:"150px",fontSize:"20px"}} title={<AiOutlineHeart className="menuicn"/>} id="basic-nav-dropdown">
          
      {wishlistItems.map((item)=>(
      
                      
        
      <>
        <img width="80" className='mt-2'  src={item.img}/>
      <Link style={{color:"#333"}} className='wishlistname' to={`/products/${item.slug}`}>{item.carddiscription}</Link>
                            <span onClick={()=>handleRemoveWItem(item)} className='wishdlt' ><AiFillDelete/></span>
                            <NavDropdown.Divider/>
      </>
      
      ))}   
               
                   <div className="text-center">
                   <Button className='wishlistbtn' variant='info'>
                   <Link to="/wishlist">Go to Wishlist</Link></Button>
                   </div>
            </NavDropdown>
            {state2.wishlist.wishlistItems.length>0 && (<span class='badge badge-warning' id='lblCartCount1'> {state2.wishlist.wishlistItems.length} </span>
            )}
        <Nav.Link  style={{fontSize:"20px"}}>
        <NavDropdown id="nav-dropdown-dark-example" className="menuicn" title={<AiOutlineShoppingCart/>}>
        {cartItems.map((item)=>(
        <div>
          <img src={item.img} style={{width:"80px"}}/>
          <Link className='droptitle' to={`/products/${item.slug}`}>{item.carddiscription}</Link>
      <span className='pc'>{item.quantity} ITEMS</span>
          <span onClick={()=>handleRemoveItem(item)} className='dlticn1' ><AiFillDelete/></span>
          
          <Dropdown.Divider />
          </div>
          
        ))}
        <Dropdown.Divider />
        <div>
          
          <Button className='viewcart'><Link style={{color:"#fff"}} to='/cartpage'>View Cart</Link></Button>
          <Button onClick={handleCheckOut} className='check'><Link style={{color:"#fff"}} to='/cartpage'>Checkout</Link></Button>          
          </div>
        </NavDropdown>
{state.cart.cartItems.length>0 && ( 
          
          <span class='badge badge-warning' id='lblCartCount'> {state.cart.cartItems.length} </span>

 )} 

</Nav.Link>
        {/* <Nav.Link  style={{fontSize:"20px"}}><Link to='/cartpage'><AiOutlineShoppingCart className="menuicn"/>
        {state.cart.cartItems.length>0 && (
          <>
<span class='badge badge-warning' id='lblCartCount'> {state.cart.cartItems.length} </span>
          </>
        )}
        </Link></Nav.Link> */}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

    </>
  )
}

export default Menubar