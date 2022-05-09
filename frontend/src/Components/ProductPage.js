import React from 'react'
import { Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import Cards from './Cards'
import Itembar from './Itembar'
import Menubar from './Menubar'
import Topbar from './Topbar'



const ProductPage = () => {
  return (
      <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <Topbar/>
      <Menubar/>
      <Itembar/>
      <Container>
      <h2 style={{marginTop:"20px"}} className='trending'>Products</h2>
      </Container>
    <Cards/>
      </>
  )
}

export default ProductPage