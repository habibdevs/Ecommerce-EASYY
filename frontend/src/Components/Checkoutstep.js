import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'


const Checkoutstep = (proops) => {
  return (
    <Container className=' mt-3'>
        <Row>

                <ol id="progress-bar">
  <li className={proops.step1? 'step-done' : ''}>Sign In</li>
  <li className={proops.step2? 'step-done' : ''}>Shipping Address</li>
  <li className={proops.step3? 'step-done' : ''}>payment</li>
  <li className={proops.step4? 'step-done' : ''}>Placeorder</li>
</ol>
        </Row>
    </Container>
  )
}

export default Checkoutstep