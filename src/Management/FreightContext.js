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