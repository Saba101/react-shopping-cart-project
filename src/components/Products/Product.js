import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { Card, CardGroup, Button } from 'react-bootstrap'
import Operations from '../operations'

export default class Product extends React.Component {


    constructor(props) {
        super(props);
        this.product = this.props.product;
    }

    componentDidMount() {
        this.obj = new Operations(this.product, null);
    }

    addToCart = (event) => {
        const qty = this.obj.incrementItem();
        // console.log(qty);
        this.props.incrementProduct(qty, this.product)
    }

    render() {
        return (
            <Container fluid>
                <CardGroup>
                    <Card border="dark" style={{ width: '20rem' }}>
                        <Row>
                            <Col>
                                <Card.Img variant="top" src={this.product.img} alt="couldn't display image!" />
                            </Col>
                            <Col>
                                <Card.Body>
                                    <Card.Text> {this.product.name} </Card.Text>
                                    <Card.Title> ${this.product.price}.00 </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{this.product.colour}</Card.Subtitle>
                                </Card.Body>
                                <Card.Body>
                                    <Button variant="primary" onClick={this.addToCart}>Add to Cart</Button>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </CardGroup>
            </Container>
        );
    }

}