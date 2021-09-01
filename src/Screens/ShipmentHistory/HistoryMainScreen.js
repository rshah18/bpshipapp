import React, {useContext, useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import config from '../../Management/Config'

import TextField from '@material-ui/core/TextField';

function ShipmentDetail ({order, index}){

    const [detail, setDetail] = useState([]); 

    const getShipmentDetails = ukey =>{
        fetch(config.url + "/fedex/shipmentdetail/" + ukey)
        .then(response => response.json())
        .then(res =>{
            console.log(res); 
            setDetail(res); 
            
        })
        .catch(err => console.log(err));
    }

    return (
        <Accordion  onChange={(ev, expanded)=>{if(expanded){getShipmentDetails(order.ukey)}}} >
                                <AccordionSummary >
                                    <div className = "row" style={{width: '100%'}}>
                                        <div className = "col-1" >{index+1}</div>
                                        <div className = "col-2" >
                                            {new Date(order.docDate).toDateString()}
                                        </div>
                                        <div className = "col-2">
                                            {order.trnspType}
                                        </div>
                                        <div className = "col-2">
                                            {order.recipientId}
                                        </div>
                                        <div className = "col-2">
                                            {order.shipToName}
                                        </div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails style = {{background: '#f2f2f2'}}>
                                    <div style = {{width: '100%'}}>
                                        <div className = "row">
                                            {/* Shipping Address */}
                                            <div className = "col-4">
                                                <h6>Shipping Address</h6>
                                                <div>
                                                    <table className = "table table-borderless">
                                                        <tbody>
                                                            <tr><td>{order.shipToName}</td></tr>
                                                            <tr><td>{order.shipToAddr1}</td></tr>
                                                            <tr><td>{order.shipToCity + ", "+order.shipToState}</td></tr>
                                                            <tr><td>{order.shipToCountry + ", "+ order.shipToZip}</td></tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            {/* Billing Address */}
                                            <div className = "col-4">
                                                <h6>Billing Address</h6>
                                                <div>
                                                    <table className = "table table-borderless">
                                                        <tbody>
                                                            <tr><td>{order.shipToName}</td></tr>
                                                            <tr><td>{order.shipToAddr1}</td></tr>
                                                            <tr><td>{order.shipToCity + ", "+order.shipToState}</td></tr>
                                                            <tr><td>{order.shipToCountry + ", "+ order.shipToZip}</td></tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            {/* Billing Address */}
                                            <div className = "col-4">
                                                <h6>Billing Details</h6>
                                                <div>
                                                    <table className = "table table-borderless">
                                                        <tbody>
                                                            <tr><td style = {{fontWeight: 'bold'}}>{"Cost: $"+ (order.cost)}</td></tr>
                                                            <tr><td style = {{fontWeight: 'bold'}}>{"Markup (20%): $"+ (order.markupCost)}</td></tr>
                                                            <tr><td>{ (order.reference !== null? "Ref: "+order.reference: '')}</td></tr>
                                                            <tr><td>{(order.poNum !== null? "PO: "+ order.poNum: '')}</td></tr>
                                                            <tr><td>{ (order.invoice !== null? "invoice: "+order.invoice: '')}</td></tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>


                                        </div>
                                        <div>
                                              {/* Billing Address */}
                                              <div className = "col-5">
                                                    
                                                    <div>
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Dim </th>
                                                                    <th>Wgt</th>
                                                                    <th>Tracking #</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                detail.map((pkg, ndx)=>{
                                                                    return(
                                                                        <tr>
                                                                            <td>{"Box "+(ndx+1)}</td>
                                                                            <td>{pkg.pkgLength + " x " + pkg.pkgWidth + " x "+pkg.pkgHeight + ' [in] '}</td>
                                                                            <td>{pkg.pkgWidth + " lb"}</td>
                                                                            <td style = {{fontWeight: 'bold'}}>{pkg.trackingNum}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                        </div>
 
                                    </div>
                                </AccordionDetails>
                            </Accordion>
    )
}

export default function HistoryMainScreen(){
    
    const [error, setError] = useState(true); 
    const [shipments, setShipments] = useState([]); 
    const [value, setValue] = React.useState(null);

    const searchByDate = () =>{
        console.log(value); 
        getShipments(); 
    }

    const getShipments = () =>{
        fetch(config.url+"fedex/shipmentsbydate/" + value)
        .then(response => response.json())
        .then(res =>{
            console.log(res); 
            setShipments(res); 
        })
        .catch(err => console.log(err)); 
    }

    


    useEffect(()=>{
        
    }, [])
   

    return (
        <div>
            {/* NavBar */}
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">Shipment History</span>
                </div>
            </nav>
            {/* NavBar */}
            <div className = "container" >
                <div className = "row mb-3" style = {{margin: 10}}>
                    <div className = "col-auto">
                        <form>
                            <TextField
                                type="date"
                                onChange = {ev =>setValue(ev.target.value)}
                            />
                        </form>
                    </div>
                    <div className = "col-auto">
                        <button className = "btn btn-primary" onClick = {searchByDate}>Search</button>
                    </div>
                    <div className = "col-auto">
                        <button className = "btn btn-secondary" onClick = {()=>setShipments([])}>Clear</button>
                    </div>
                </div>
                <div >
                {
                    shipments.map((order,index)=>{
                        return(
                            <ShipmentDetail order = {order} key = {order.ukey} index = {index}/>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}

/**
 *              
 */