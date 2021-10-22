import React, {useState, useReducer, createContext} from 'react'; 

// create context..................................................................................
export const FreightContext = createContext(); 

// initial state...................................................................................
const initialState = {
    "origin": {},
    "destination": {},
    "freightList": [],
    "accessorialList": [],
    "pickUp": '',
    'salesOrderNum': '',
    'tradingPartner':{},
    'carrier': '',
    'customerPO': '',
    'reference': ''
}


// reducer function ...............................................................................
function reducer(state, action){
    switch(action.type){
        case 'ADD_ORIGIN':
            return add_origin(state, action.payload); 
        case 'ADD_DEST':
            return add_dest(state, action.payload); 
        case 'ADD_FREIGHT': 
            return add_freight(state, action.payload); 
        case 'ADD_ACCESSORIAL': 
            return add_accessorial(state, action.payload); 
        case 'ADD_PICKUP':
            return add_pickUp(state, action.payload);
        case 'ADD_SALES_ORDER':
            return add_sales_order(state, action.payload);
        case 'ADD_PARTNER':
            return add_partner(state, action.payload);
        case 'REMOVE_FREIGHT':
            return remove_freight(state, action.payload);
        case 'REMOVE_ACCESSORIAL':
            return remove_accessorial(state, action.payload);
        case 'ADD_CUSTOMER_PO':
            return add_customer_po(state, action.payload);
        case 'ADD_REF':
            return add_ref(state, action.payload);
        case 'CLEAR':
            return initialState;
        

        default: 
            return state; 

    }
}



// create the provider ............................................................................
export const FreightContextProvider = props => {
    const [state, dispatch] =  useReducer(reducer, initialState);  

    return (
        <FreightContext.Provider value={[state, dispatch]}>
            {props.children}
        </FreightContext.Provider>
    )
}

function add_origin(prev, payload){
    console.log("payload: ", payload)
    let order = Object.assign({}, prev);
    order.origin = payload; 
    console.log(order); 
    return order; 
}

function add_dest(prev, payload){
    console.log("payload: ", payload)
    let order = Object.assign({}, prev);
    order.destination = payload; 
    console.log(order); 
    return order; 
}

function add_freight(prev, payload){
    console.log("payload: ", payload)
    let order = Object.assign({}, prev);
    order.freightList.push(payload);  
    console.log(order); 
    return order; 
}

function add_accessorial(prev, payload){
    console.log("payload: ", payload)
    let order = Object.assign({}, prev);
    if(!order.accessorialList.includes(payload)){
        order.accessorialList.push(payload); 
    }
    console.log(order); 
    return order; 
} 

function add_pickUp(prev, payload){
    console.log("payload: ", payload)
    let order = Object.assign({}, prev);
    order['pickUp'] = payload;
    console.log(order); 
    return order; 
}

function add_sales_order(prev, payload){
    console.log('adding sales order now', payload);
    console.log("payload: ", payload)
    let order = Object.assign({}, prev);
    order['salesOrderNum'] = payload;
    console.log(order); 
    return order; 
}

function add_partner(prev, payload){
    let order = Object.assign({}, prev);
    order['tradingPartner'] = payload;
    order['carrier'] = payload['ref'];
     
    return order; 
}

function remove_freight(prev, payload){
    console.log("payload: ", payload)
    let order = Object.assign({}, prev);
    let itemFound = order['freightList'].find(item=> item.id === payload);
    if(itemFound){
        let idx = order['freightList'].indexOf(itemFound); 
        order['freightList'].splice(idx, 1); 
    }

    console.log(itemFound); 
    return order; 
}

function remove_accessorial(prev, payload){
    console.log("payload: ", payload)
    let order = Object.assign({}, prev);
    let itemFound = order['accessorialList'].find(item=> item === payload);
    if(itemFound){
        let idx = order['accessorialList'].indexOf(itemFound); 
        order['accessorialList'].splice(idx, 1); 
    }

    console.log(itemFound); 
    return order;
}

function add_customer_po(prev, payload){
    let order = Object.assign({}, prev);
    order['customerPO'] = payload;
    return order; 
}
function add_ref(prev, payload){
    let order = Object.assign({}, prev);
    order['reference'] = payload;
    return order; 
}

