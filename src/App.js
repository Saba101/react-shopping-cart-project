import React from 'react';
import './App.css';
import Home from './components/Home'
import { Container, Row, Col } from 'react-bootstrap';

function App() {

  console.log("App.js");
  return (
    <Container fluid style={{ backgroundColor: '#e6f2f1' }}>
      {/* <Row><Col style={{ border: 'solid' }}> <Header /> </Col></Row> */}
      <Row>
        {/* <Col sm md lg={3} style={{ border: 'solid' }}> <SidePane /> </Col> */}
        <Col>
          <Home />
        </Col>
      </Row>
    </Container>
  );
}
export default App;
