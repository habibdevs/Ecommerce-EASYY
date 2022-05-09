import React from 'react'
import { Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import Banner from './Banner'

import Cards from './Cards'
import Itembar from './Itembar'
import Menubar from './Menubar'
import MiniBanner from './MiniBanner'
import Topbar from './Topbar'


const HomePage = () => {
  return (
      <>
      <Helmet>
        <title>Easyy</title>
      </Helmet>
      <Topbar/>
      <Menubar/>
      <Itembar/>
      <Banner/>
      <MiniBanner/>
      <Container>
      <h2 className='trending'>Trending Item</h2>
      </Container>
      <Cards/>
      </>
  )
}

export default HomePage