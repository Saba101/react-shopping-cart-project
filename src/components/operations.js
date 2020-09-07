import React from 'react';

let store = [];
export default class operations {

    constructor(thing, qty) { //where thing= product
        this.thing = thing;
        if (!store.find(item => item.id === thing.id)) {  //new item (works at time of compoentDidMount)
            this.qty = 0;
            store.push({
                id: this.thing.id,
                qty: this.qty
            })
            console.log("Store: ", store);
        }
        else { //already exists (cart case..) 
            this.qty = qty;
            // console.log("Product exists in store");
        }
    }

    incrementItem = () => {    // oldName: addToCart()
        let updated_qty = 0;
        if (this.qty < 10 && this.qty >= 0) {
            this.qty++;
            updated_qty = this.update_store();
            return updated_qty;
        }
        else {
            let prev_qty = (store.find(item => item.id == this.thing.id)).qty;
            this.qty = prev_qty;
            console.log(this.thing.name, ": ", "OUT OF STOCK!");
            // console.log("prev_qty", prev_qty);
            return prev_qty;
        }
    }

    decrementItem = (qty) => {
        let updated_qty = 0;
        this.qty = qty;
        if (this.qty > 0 && this.qty <= 10) {
            this.qty--;
            updated_qty = this.update_store();
        }
        else if (this.qty == 0) {
            console.log(this.thing.name, "- **Not found!**")
            this.deleteItem();
        }
        return updated_qty;  //rather return value form store
    }

    deleteItem = () => {
        let index = store.findIndex(prod => prod.id == this.thing.id);
        store.splice(index);
        this.qty = 0;
        // this.update_store();
        // return updated_qty;
    }


    //**A private function of class **//
    update_store = () => {
        let index = store.findIndex(prod => prod.id == this.thing.id);
        if (index !== -1) {
            const tempArray = store.slice(); //copy the array
            tempArray[index].qty = this.qty;
            store = tempArray;
            if (store[index].qty === 0) {
                console.log("quantity equals zero.")
                return 0;
            }
            else {
                console.log("updated product in store: ", store[index]);
                return store[index].qty;
            }
        }
        else {
            this.qty = 1;
            store.push({
                id: this.thing.id,
                qty: this.qty
            })
            console.log("Item Pushed in store!");
            console.log("updated product in store: ", store);
            return 1;
        }
    }
}