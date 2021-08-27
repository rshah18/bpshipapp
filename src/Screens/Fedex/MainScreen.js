import React, {useContext, useEffect, useState} from "react";
import bpshipping from '../../Resources/img/bpshipping.svg'
import fedex from '../../Resources/img/fedex.svg'
import Address from '../../Components/Address'
import Contact from "../../Components/Contact";
import Package from "../../Components/Package";
import ServiceSelect  from "../../Components/Service";
import Payment from "../../Components/Payment";
import Billing from "../../Components/Billing";
import { ShipmentContext } from "../../Management/Context";

import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function MainScreen(){
    // context variables
    const [state, dispatch] = useContext(ShipmentContext); 
    const [billAdd, setBillAdd] = useState(false); 
    const [quotes, setQuotes] = useState([]);
    const [quotesLoading, setquotesLoading] = useState(false);  
    const [shipLoading, setShipLoading] = useState(false); 

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

        if(Object.keys(state.recipient).length === 0){
            window.alert("Please Enter Recipient Information!"); 
            return; 
        }

        if(Object.keys(state.shipAddress).length === 0){
            window.alert("Please Enter Shipping Address!"); 
            return; 
        }

        if(state.boxList.length === 0){
            window.alert("Package Information Missing!"); 
            return; 
        }

        setquotesLoading(true); 
        // fetch 
        fetch("http://localhost:8088/getAllRates", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state),
        })
        .then(response => {
            if(response.status === 200){
                console.log("success");
                console.log(response);  
                return response.json(); 
            } else {
                return; 
            }
            
        })
        .then(rep => {
            console.log(rep) 
            if(rep.notification[0].code === '0'){
                setQuotes(rep.rateResponseList);
                console.log(rep.notification[0].message); 
            } else {
                window.alert(rep.notification[0].message);
            }
            // 
            //console.log(rep.rateResponseList)
            setquotesLoading(false); 
        
        })
        .catch(err=> {
            console.log(err)
            setquotesLoading(false); 
        })
    }

    const ShipBtn = () =>{
        if(Object.keys(state.recipient).length === 0){
            window.alert("Please Enter Recipient Information!"); 
            return; 
        }

        if(Object.keys(state.shipAddress).length === 0){
            window.alert("Please Enter Shipping Address!"); 
            return; 
        }

        if(state.boxList.length === 0){
            window.alert("Package Information Missing!"); 
            return; 
        }

        if(state.service === ''){
            window.alert("Delivery Method Missing!"); 
            return; 
        }
        if(state.payment === ''){
            window.alert("Please select a payment method!"); 
            return; 
        }

        if(state.payment === 'THIRD_PARTY'){
            if(Object.keys(state.billAddress).length === 0){
                window.alert("Please Enter Billing Address!"); 
                return; 
            }
            if(state.thirdPartyAccount === '' ){
                window.alert("Please enter third party account!"); 
                return; 
            }
            
        }

        //console.log(state); 
            
        setShipLoading(true); 
        // send fetch request for ship
        fetch("http://localhost:8088/shipRequest", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state),
        })
        
        .then(response => response.json())
        .then(rep => {
            if(rep.statusCode === '0000'){
                window.alert('succeess'); 
            }
        
        })
        .catch(err=> {
            console.log(err)
        })
            
        setShipLoading(false); 

    }

    useEffect(()=>{
        
    }, [shipLoading])


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
                        <div className="input-group mb-3">
                        <input type="text" className="form-control form-control-sm" placeholder="Sales Order #"   />
                            <input type="text" className="form-control form-control-sm" placeholder="Sales Order #"   />
                            <button className="btn btn-outline-secondary" type="button" >Search</button>
                        </div>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary" onClick = {ShipBtn}>Ship</button>
                    </div>
                </div>
              </div>
            </nav>
            {/* NavBar */}

            <div style={shipLoading ? {display: 'block'}: {display: 'none'}}>
                <LinearProgress />
            </div>

            <div  className = "container-fluid" >
                <div className = "row">
                    {/* Recipient info column */}
                    <div className = "col-4">
                        {/* Contact */}
                        <div style={eachbox}>
                            <Contact title = "Recipient Information" addRecipient = {addRecipient} />
                        </div>
                        
                        {/*Address */}
                        <div style={eachbox}>
                            <Address title="Recipient Address" addAddress = {addRecipientAddress} stateAdd = {state.shipAddress} />
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
                            {billAdd ? <Address title="Billing Address" addAddress = {addBillingAddress} stateAdd = {{}}/>: <div></div>}
                        </div>
                    </div>
                    <div className="col-4">
                        <div style={eachbox}>
                            <Billing />
                        </div>
                        <div style={eachbox}>
                            <ServiceSelect getRates ={getRates} quotes={quotes} loading = {quotesLoading}/>
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