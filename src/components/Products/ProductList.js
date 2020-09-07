import React from 'react';
import Product from './Product'
import {
    Container, Row, Col,
    Dropdown, DropdownButton
} from 'react-bootstrap';

class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.incrementProduct = this.props.incrementProduct;
        this.state = {
            selectedColor: 'All'
        }
    }

    onColorSelect = (color) => {
        this.setState({
            selectedColor: color
        });
        // console.log(this.state.selectedColor);
        return;
    }

    render() {
        return (
            <Container>
                <Row style={{ marginBottom: '10px', marginTop: '10px' }}>
                    <Col>
                        <Dropdown>
                            <DropdownButton title="Color Filter" variant="secondary"
                                onSelect={this.onColorSelect}>
                                <Dropdown.Item eventKey="All">All</Dropdown.Item>
                                <Dropdown.Item eventKey="Black">Black</Dropdown.Item>
                                <Dropdown.Item eventKey="Stone">Stone</Dropdown.Item>
                                <Dropdown.Item eventKey="Red">Red</Dropdown.Item>
                            </DropdownButton>
                        </Dropdown>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.products.filter(product => {
                            if (this.state.selectedColor == 'All') {
                                return this.props.products;
                            }
                            else
                                return product.colour == this.state.selectedColor;
                        }).map((filteredProd) => (
                            <Container key={filteredProd.id}>
                                <Row>
                                    <Col>
                                        {/* <Product product={filteredProd} /> */}
                                        <Product product={filteredProd}
                                            cartClick={this.props.cartClick}
                                            incrementProduct={this.incrementProduct} />
                                    </Col>
                                </Row>
                            </Container>
                        ))}
                    </Col>
                </Row>
            </Container>

        );
    }
}

export default ProductList;