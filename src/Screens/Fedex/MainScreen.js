import React, {useContext, useEffect, useState} from "react";
import bpshipping from '../../Resources/img/bpshipping.svg'
import fedex from '../../Resources/img/fedex.svg'
import Address from '../../Components/Address'
import Contact from "../../Components/Contact";
import Package from "../../Components/Package";
import ServiceSelect  from "../../Components/Service";
import Payment from "../../Components/Payment";
import { ShipmentContext } from "../../Management/Context";

export default function MainScreen(){
    // context variables
    const [state, dispatch] = useContext(ShipmentContext); 
    const [billAdd, setBillAdd] = useState(false); 
    const [quotes, setQuotes] = useState([]); 

    const addRecipient = recipient =>{
        dispatch({type: 'ADD_RECIPIENT', payload: recipient});
    }

    const addRecipientAddress = address =>{
        dispatch({type: 'ADD_SHIP_ADDRESS', payload: address});
    }

    const addBillingAddress =  address =>{
        dispatch({type: 'ADD_BILL_ADDRESS', payload: address});
    }

    const getRates = () =>{
        // fetch 
        fetch("http://localhost:8088/getAllRates", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state),
        })
        .then(response => response.json())
        .then(rep => {
            console.log(rep) 
            setQuotes(rep); 
        
        })
        .catch(err=> {
            console.log(err)
        })
    }

    const ship = () =>{

    }


    return (
        <div>
            {/* NavBar */}
            <nav className="navbar navbar-light bg-light">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">
                 <img src={fedex} alt="" width="90em"/>
                </a>
                <div className="row" style = {{marginTop: 10, marginBottom: -20}}>
                    <div className="col-auto">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control form-control-sm" placeholder="Sales Order #"   />
                            <button class="btn btn-outline-secondary" type="button" >Search</button>
                        </div>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary">Ship</button>
                    </div>
                    
                </div>
              </div>
            </nav>
            {/* NavBar */}

            <div style={{
               
            }}>
                <div className = "row">
                    {/* Recipient info column */}
                    <div className = "col-4">
                        {/* Contact */}
                        <div style={eachbox}>
                            <Contact title = "Recipient Information" addRecipient = {addRecipient} />
                        </div>
                        
                        {/*Address */}
                        <div style={eachbox}>
                            <Address title="Recipient Address" addAddress = {addRecipientAddress} />
                        </div>
                    </div>

                    {/* Package and Payment column */}
                    <div className = "col-4">
                        <div style={eachbox}>
                            <Package />
                        </div>
                        <div style={eachbox}>
                            <Payment setBillAdd={setBillAdd}/>
                        </div>
                        <div style={eachbox}>
                            {billAdd ? <Address title="Billing Address" addAddress = {addBillingAddress} />: <div></div>}
                        </div>
                    </div>
                    <div className="col-4">
                        <div style={eachbox}>
                            <ServiceSelect getRates ={getRates} quotes={quotes}/>
                        </div>
                    </div>
                </div>

            </div>






        </div>
    )
}

const eachbox = {
    margin: 20
}