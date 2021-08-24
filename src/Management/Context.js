import React, {useState, useReducer, createContext} from 'react'; 
import { findDOMNode } from 'react-dom';

// create context..................................................................................
export const ShipmentContext = createContext(); 

// initial state...................................................................................
const initialState = {
    "recipient": {},
    "shipAddress": {},
    "billAddress": {},
    "boxList": [],
    "itemList": [],
    "service": '',
    "payment": '',
    "thirdPartyAccount": ''
}

// reducer function ...............................................................................
function reducer(state, action){
    switch(action.type){
        case 'ADD_BOX':
            return add_box(state, action.payload); 
        case 'ADD_ITEM':
            return add_item(state, action.payload); 
        case 'REMOVE_ITEM': 
            return remove_item(state, action.payload); 
        case 'REMOVE_BOX': 
            return remove_box(state, action.payload); 
        case 'ADD_RECIPIENT': 
            return add_recipient(state, action.payload); 
        case 'ADD_SHIP_ADDRESS':
            return add_ship_address(state, action.payload); 
        case 'ADD_BILL_ADDRESS':
            return add_bill_address(state, action.payload); 
        case 'ADD_SERVICE': 
            return add_service(state, action.payload); 
        case 'ADD_PAYMENT':
            return add_payment(state, action.payload); 
        case 'ADD_THIRD_PARTY_ACCOUNT': 
            return add_third_party_account(state, action.payload); 

        default: 
            return state; 

    }
}

// create the provider ............................................................................
export const ShipProvider = props => {
    const [state, dispatch] =  useReducer(reducer, initialState);  

    return (
        <ShipmentContext.Provider value={[state, dispatch]}>
            {props.children}
        </ShipmentContext.Provider>
    )
}

// add boxes.......................................................................................
function add_box(prev, payload){
    console.log("payload: ", payload)
    let order = Object.assign({}, prev);
    order.boxList.push(payload)
    console.log(order); 
    return order; 
}

// add items.......................................................................................
function add_item(prev, payload){
    console.log("payload: ", payload)
    let order = Object.assign({}, prev);
    order.itemList.push(payload)

    return order; 
}

// remove boxes.......................................................................................
function remove_box(prev, payload){
    console.log("payload: ", payload)
    let order = Object.assign({}, prev);
    let boxToRemove = order.boxList.find(box => box.id === payload)
    if(boxToRemove){
        let idx = order.boxList.indexOf(boxToRemove); 
        order.boxList.splice(idx, 1); 
    }
    console.log("removing box", boxToRemove); 
    console.log(order.boxList)

    return order; 
}


// remove items.......................................................................................
function remove_item(prev, payload){
    console.log("payload: ", payload)
    let order = Object.assign({}, prev);
    let itemToRemove = order.itemList.find(itm => itm.vizOrder === payload)
    if(itemToRemove){
        let idx = order.itemList.indexOf(itemToRemove); 
        order.itemList.splice(idx, 1); 
    }
    console.log("removing item")

    return order; 
}

// add recipient...................................................................................
function add_recipient(prev, payload){
    console.log("payload: ", payload)
    let order = Object.assign({}, prev);
    console.log(order)
    order.recipient = payload; 

    return order;

}

// add ship address ...............................................................................
function add_ship_address(prev, payload){
    console.log("payload: ", payload)
    let order = Object.assign({}, prev);
    order.shipAddress = payload; 
    console.log(order)
    return order;

}

// add billing address ............................................................................
function add_bill_address(prev, payload){
    console.log("payload: ", payload)
    let order = Object.assign({}, prev);
    order.billAddress = payload; 
    console.log(order)
    return order;

}

// add service ....................................................................................
function add_service(prev, payload){
    console.log("payload: ", payload)
    let order = Object.assign({}, prev);
    order.service = payload; 

    return order;

}

// add payment ....................................................................................
function add_payment(prev, payload){
    console.log("payload: ", payload)
    let order = Object.assign({}, prev);
    order.payment = payload; 
    console.log(order);
    return order;

} 

// add third party account ........................................................................
function add_third_party_account(prev, payload){
    console.log("payload: ", payload)
    let order = Object.assign({}, prev);
    order.thirdPartyAccount = payload; 

    return order;

}
