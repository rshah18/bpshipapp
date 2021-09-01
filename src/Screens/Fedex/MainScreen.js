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
import config from "../../Management/Config";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function MainScreen(){
    // context variables
    const [state, dispatch] = useContext(ShipmentContext); 
    const [billAdd, setBillAdd] = useState(false); 
    const [quotes, setQuotes] = useState([]);
    const [quotesLoading, setquotesLoading] = useState(false);  
    const [shipLoading, setShipLoading] = useState(false); 
    const [docnum, setDocnum] = useState('');

    const [salesOrderRecipient, setSalesOrderRecipient] = useState({});
    const [salesOrderAddress, setSalesOrderAddress] = useState({})

    const [statusMsg, setStatusMsg] = useState(''); 
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      window.location.reload();  
    };
    
    const clearAllFields = () =>{
        //dispatch({type: 'CLEAR_ALL', payload: {}});
        window.location.reload();  
    }

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
        fetch(config.url+"getAllRates", {
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
        fetch(config.url+"shipRequest", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state),
        })
        
        .then(response => {
            if(response.statusCode !== 200){
                setStatusMsg('Shipment Failed!'); 
                handleClickOpen(); 
            }
            return response.json(); 
        })
        .then(rep => {
            console.log(rep); 
            if(rep.statusCode === '0000'){
                setStatusMsg(rep.statusMsg); 
                handleClickOpen(); 
            }
        
        })
        .catch(err=> {
            console.log(err)
        })
            
        setShipLoading(false); 

    }



    const getAddressValues =() =>{
        fetch(config.url+"fedex/salesorderdetails/"+ docnum)
        .then(response => response.json())
        .then(resp=>{
            console.log(resp); 
            if(resp.docNum !== null){
                console.log(resp.docNum); 

                setSalesOrderRecipient({
                    'name': resp.shipPO,
                    'company': resp.shipToName,
                    'email' : resp.shipToEmail,
                    'phone': resp.shipToPhone,
                    'ext': '',
                    'recipient': resp.shipPO
                }); 

                setSalesOrderAddress({
                    "street1": resp.shipToAddr1,
                    "street2": '',
                    "city": resp.shipToCity,
                    "state": resp.shipToState,
                    "zip": resp.shipToZip,
                    "countryCode": resp.shipToCountry,
                })
                
                /*
                addBillingAddress({
                    "street1": resp.billToAddr1,
                    "street2": '',
                    "city": resp.billToCity,
                    "state": resp.billToState,
                    "zip": resp.billToZip,
                    "countryCode": resp.billToCountry,
                })
                */


            } else {
                window.alert("Sales Order Number Not valid"); 
            }
        })
        .catch(err=>console.log(err));
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
                        <div className="input-group mb-3">
                            <input type="text" className="form-control form-control-sm" placeholder="Sales Order #" value={docnum} onChange={event => setDocnum(event.target.value)} />
                            <button className="btn btn-outline-secondary" type="button" onClick={getAddressValues} >Search</button>
                        </div>
                    </div>
  
                    <div className="col-auto">
                        <button className="btn btn-secondary" onClick = {clearAllFields}>Clear</button>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary" onClick = {ShipBtn}>Ship</button>
                    </div>
                    <div className="col-auto" style = {shipLoading ? {display: 'block'} :{display: 'none'} }>
                        <div className="spinner-border text-primary" role="status"></div>
                    </div>
                </div>
              </div>
            </nav>
            {/* NavBar */}

            <div style={shipLoading ? {display: 'block'}: {display: 'none'}}>
               
            </div>

            <div  className = "container-fluid" >
                <div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Fedex Shipment Status"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div> {statusMsg}</div>
                            
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Close
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className = "row">
                    {/* Recipient info column */}
                    <div className = "col-4">
                        {/* Contact */}
                        <div style={eachbox}>
                            <Contact title = "Recipient Information" addRecipient = {addRecipient} />
                        </div>
                        
                        {/*Address */}
                        <div style={eachbox}>
                            <Address title="Recipient Address" addAddress = {addRecipientAddress} stateAdd = {salesOrderAddress} />
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