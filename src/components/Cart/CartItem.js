import React from 'react';
import {
    Container, Row, Col,
    Button, ButtonGroup
} from 'react-bootstrap';
import Operations from '../operations'

export default class CartItem extends React.Component {

    componentDidMount() {
        // console.log("did mount called for cartItem: ", this.props.item.name);
        this.obj = new Operations(this.props.item, this.props.qty);
    }

    removeFromCart = (e) => {
        const qty = this.obj.decrementItem(this.props.qty);
        // console.log(this.props.item);
        this.props.decrementProduct(qty, this.props.item);
    }

    deleteFromCart = (e) => {
        // const qty = 
        this.obj.deleteItem();
        // console.log("qty", qty);
        this.props.deleteProduct(this.props.item);
    }

    render() {
        // console.log(this.props.item); //.name, this.props.qty);
        return (
            <Container style={{ backgroundColor: 'white', border: 'solid 2px' }}>
                <Row style={{ marginBottom: '5px' }}>
                    <Col>
                        <img src={this.props.item.img} alt="image" width="95" height="150" />
                    </Col>
                    <Col md={8}>
                        <Container>
                            <Row>
                                <Col>
                                    <p>{this.props.item.name}</p>
                                </Col>
                            </Row >
                            <Row>
                                <Col md={4} style={{ textAlign: 'right' }}>
                                    <b>{this.props.qty}</b>X${this.props.item.price}
                                </Col>
                                <Col md={8} >
                                    <Button variant="warning"
                                        onClick={this.removeFromCart}>Remove</Button>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '5px' }}>
                                <Col md={9} style={{ textAlign: 'right' }}>
                                    <Button variant="danger"
                                        onClick={this.deleteFromCart}>Delete</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container >
        );
    }

}