import React, { useContext } from 'react'
import {Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { FiMail } from 'react-icons/fi';
import { FaHeadphonesAlt } from 'react-icons/fa';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { Store } from '../Store';
import { Link } from 'react-router-dom';


const Topbar = () => {

  const {state3,dispatch3} = useContext(Store)
  const {userInfo} = state3

  let handleLogout=()=>{
    dispatch3({type: "USER_LOGOUT"})
    localStorage.removeItem("userInfo")
  }
  return (
    <>
    <Navbar style={{color:"black"}} collapseOnSelect expand="lg"variant="dark">
  <Container>
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link ><FaHeadphonesAlt style={{marginRight:"7px",marginTop:"-5px",color:"#F7941D"}}/>+060 (800) 801-582</Nav.Link>
      <Nav.Link ><FiMail style={{marginRight:"5px",color:"#F7941D"}}/>support@shophub.com</Nav.Link>
    </Nav>
    <Nav>
    
      {userInfo ?  
      
      <NavDropdown title={<a><MdOutlineAccountCircle style={{marginRight:"5px",color:"#F7941D",fontSize:"20px",marginTop:"-5px"}}/><Link to='' style={{color:"rgb(247, 148, 29)"}}>{userInfo.name}</Link></a>} id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handleLogout}><Link style={{color:"#333"}} to={`/`}>Log Out</Link></NavDropdown.Item>
      </NavDropdown>
      :  
      <>
      <NavDropdown title={<Link style={{color:"rgb(247, 148, 29)"}} to='/signin'>Log In</Link>} >
    </NavDropdown>
    </>
      }
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
    </>
  )
}

export default Topbar