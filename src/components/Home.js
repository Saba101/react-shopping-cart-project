import React from 'react';
import ProductList from './Products/ProductList';
import Cart from './Cart/Cart';
import { Container, Row, Col, Button } from 'react-bootstrap';
import update from 'react-addons-update';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            cartItems: [],  //add quantities against their products to it..
            total: 0
        }
    }

    incrementProduct = (quantity, product) => {
        // console.log(product.name, ": ", quantity);
        const items = this.state.cartItems;
        if (!(this.state.cartItems.find(items => items.item.id == product.id))) { //if item not already exists in cartItems array..then add to it.
            items.push({
                item: product,
                qty: quantity
            });
            this.pushToCart(items);
        }
        else { //if allready exists
            // console.log("items already exists in cart Items..updating qty! ");
            let existingItemIndex = this.state.cartItems.findIndex(items => items.item.id == product.id);
            const tempArray = this.state.cartItems.slice(); //copy the array
            tempArray[existingItemIndex].qty = quantity;
            this.pushToCart(tempArray);
            // console.log("updated quantity: ", this.state.cartItems[existingItemIndex].qty)
        }
        this.updateTotal();
    }

    decrementProduct = (quantity, product) => {
        // console.log(product.name, ": ", quantity);
        if (this.state.cartItems.find(items => items.item.id == product.id)) {
            let existingItemIndex = this.state.cartItems.findIndex(items =>
                items.item.id == product.id);
            const tempArray = this.state.cartItems.slice(); //copy the array
            tempArray[existingItemIndex].qty = quantity;
            this.pushToCart(tempArray);
        }
        else //if not exists
            console.log("Item not found!");
        this.updateTotal();
    }

    deleteProduct = (product) => {
        if (this.state.cartItems.find(items => items.item.id == product.id)) {
            let existingItemIndex = this.state.cartItems.findIndex(items =>
                items.item.id == product.id);
            if (this.state.cartItems[existingItemIndex].qty != 0) {
                console.log("not zero");
                const tempArray = this.state.cartItems.slice(); //copy the array
                tempArray[existingItemIndex].qty = 0;
                this.pushToCart(tempArray);
            }
            this.state.cartItems.splice(existingItemIndex);
            console.log(product.name, " deleted!\n Press Add to Cart to buy product.")
            this.updateTotal();
        }
    }

    pushToCart(items) {
        this.setState({
            cartItems: items
        })
        // console.log("Cart Items Array: ", this.state.cartItems);
    }

    updateTotal = () => {
        let val = 0;
        console.log("cart items ", this.state.cartItems);
        for (let i = 0; i < this.state.cartItems.length; i++) {
            val = val + (this.state.cartItems[i].qty * this.state.cartItems[i].item.price);
        }
        // console.log("val: ", val);
        if (val >= 0) {
            this.setState({
                total: val
            })
            // console.log("prev-total: ", this.state.total); //shows one value back(because of render issue)
        }
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col sm md lg={7}>
                        <ProductList
                            products={this.state.products}
                            incrementProduct={this.incrementProduct} />
                    </Col>
                    <Col sm md lg={5}>
                        <Cart cartItems={this.state.cartItems} total={this.state.total}
                            updateTotal={this.updateTotal}
                            decrementProduct={this.decrementProduct}
                            deleteProduct={this.deleteProduct} />
                    </Col>
                </Row>
            </Container>
        );
    }

    async componentDidMount() {

        //     axios.get('https://baconipsum.com/api/?type=meat-and-filler&paras=4&format=text')
        //   .then(response => this.setState({ post: response.data })); 

        // console.log("componentDidMount");
        const url = "https://my-json-server.typicode.com/benirvingplt/products/products";
        const response = await fetch(url)
            .then(res => {
                // console.log('res', res);
                if (!res.ok) {
                    throw Error("Error fetching response!");
                }
                return res
            });
        const data = await response.json();
        this.setState({
            products: data
        })
        // console.log(this.state.products);
    }
}

export default Home;
