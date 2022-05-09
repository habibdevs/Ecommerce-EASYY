import React from 'react'
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { AiOutlineBars } from 'react-icons/ai';
import axios from 'axios'
import { Link } from 'react-router-dom';

const Itembar = () => {
  return (
    <>
    <Navbar collapseOnSelect expand="lg" style={{background:"#333"}} >
  <Container>
  <NavDropdown className='menuitm1' title={<a><AiOutlineBars style={{marginRight:"10px",fontSize:"20px",fontWeight:"700",marginTop:"-5px"}}/>CATEGORIES</a>} id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="auto ">
      <Nav.Link className='menuitm home'><Link style={{textDecoration:"none" , color:"#fff"}} to='/'>Home</Link></Nav.Link>
      <Nav.Link className='menuitm'><Link style={{textDecoration:"none" , color:"#fff",marginLeft:"20px"}} to='/products'>Products</Link></Nav.Link>
      <Nav.Link style={{marginLeft:"20px"}} className='menuitm'>Pricing</Nav.Link>
      <NavDropdown style={{marginLeft:"20px"}} title="Contact Us" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
    </>
  )
}

export default Itembar