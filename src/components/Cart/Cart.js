import React from "react";
import CartItem from './CartItem'

export default class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.decrementProduct = this.props.decrementProduct;
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center", marginBottom: '30px' }}> Your Cart</h1>
                <hr></hr>
                {this.props.cartItems.map((items) => (
                    <CartItem key={items.item.id} qty={items.qty}
                        item={items.item}
                        decrementProduct={this.decrementProduct}
                        deleteProduct={this.props.deleteProduct} />
                ))}
                <hr />
                <h1>Total: {this.props.total}</h1>
            </div>
        );
    }
}