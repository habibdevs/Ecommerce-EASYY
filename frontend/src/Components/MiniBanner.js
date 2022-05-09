import axios from 'axios'
import {React, useEffect, useState } from 'react'
import { Card, CardGroup } from 'react-bootstrap'


const MiniBanner = () => {

    let [minibanner,setMinibanner] = useState([])

    useEffect(async()=>{
        let data = await axios.get("http://localhost:8000/minibanner")
        // setLogo(data.data.img)
        setMinibanner(data.data)
      },[])


  return (
    <>
    <div className='minibnr'>
    {minibanner.map(item=>(   
        <>
        <div>
            
        <img src={item.img} className='minibnrimg'/>
        <h4 className='minibnrsub'>{item.subheading}</h4>
        <h2 className='minibnrheading'>{item.heading}</h2>
        <h2 className='minibnrheading2'>{item.heading2}</h2>

        <a className='minibnrshop'>{item.button}</a>
        </div>
        
      </>         
        ))}
    </div>
    </>
  )
}

export default MiniBanner