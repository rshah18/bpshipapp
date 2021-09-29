import React, {useState, useReducer, createContext} from 'react'; 

// create context..................................................................................
export const FreightContext = createContext(); 

// initial state...................................................................................
const initialState = {
    "origin": {},
    "destination": {},
    "freightList": []
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
