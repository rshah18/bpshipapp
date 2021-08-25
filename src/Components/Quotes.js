import React, {useState, useContext, useEffect} from 'react';

export default function Quotes({quote, setService, service}){
    const [current, setCurrent] = useState(false); 
    
    useEffect(()=>{
        if(service === quote.service){
            setCurrent(true);  
        } else {setCurrent(false);}
    }, [service])

    return (
        <div 
            style = {current ? {
                margin: 5,
                padding: 8,
                borderRadius: 5,
                background: '#ccffcc'
            } : 
            {
                margin: 5,
                padding: 8,
                borderRadius: 5,
                background: '#f0e6ff'
            }}
            
            onClick = {()=>{
                setService(quote.service); 
            }}
        
        >
            <div className = "row  justify-content-between">
                <div className = "col-auto" style = {{color: '#007399', fontWeight: 'bold'}}>{quote.service}</div>
                <div className = "col-auto" style = {{fontWeight: 'bold', color: '#5d3c5d'}}>{"$"+quote.totalCharge}</div>
            </div>
            <div className = "row justify-content-between">
                <div className = "col-auto" style = {{color: '#326760'}}>{"Delivery: " +new Date(quote.deliveryTime).toDateString()+ ", "+ new Date(quote.deliveryTime).toLocaleTimeString()}</div>
                <div className = "col-auto" style ={{color: '#ad7505'}}>{"Bill Wgt: " + quote.billingWeight + " lb"}</div>
            </div>
        </div>
    )
}