import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Carousel, Container } from 'react-bootstrap'



const Banner = () => {


  let [banner,setbanner] = useState([])

  useEffect(async()=>{
      let data = await axios.get("http://localhost:8000/banner")
      // setLogo(data.data.img)
      setbanner(data.data)
    },[])


  return (
    <>
    <Container>
    <Carousel>
      {banner.map(item=>(
        <Carousel.Item interval={1000}>
        <img className="d-block w-100" src={item.img}/>
        <Carousel.Caption>
          <div>

          <h4 style={{color:"#fff"}}>{item.subheading}</h4>
          <h1 style={{color:"#F7941D"}}>{item.heading}</h1>
          <p style={{color:"#fff"}}>{item.subheading2}</p>
          <p style={{color:"#fff"}}>{item.subheading3}</p>
          <Button className='bannerbtn'>{item.button}</Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>     
      ))}
  
</Carousel>
</Container>
    </>
  )
}

export default Banner