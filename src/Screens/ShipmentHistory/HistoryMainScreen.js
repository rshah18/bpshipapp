import React, {useContext, useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

export default function HistoryMainScreen(){
    
    const [error, setError] = useState(true); 
    const [shipments, setShipments] = useState([]); 

    const getShipments = () =>{
        fetch("http://localhost:8088/fedex/shipments")
        .then(response => response.json())
        .then(res =>{
            console.log(res); 
            setShipments(res); 
        })
        .catch(err => console.log(err)); 
    }

    useEffect(()=>{
        getShipments(); 
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
                <div>
                {
                    shipments.map((order,index)=>{
                        return(
                            <Accordion>
                                <AccordionSummary>
                                    <div className = "row" style={{width: '100%'}}>
                                        <div className = "col-1" >{index+1}</div>
                                        <div className = "col-2" >
                                            {new Date(order.docDate).toDateString()}
                                        </div>
                                        <div className = "col-2">
                                            {order.trnspType}
                                        </div>
                                        <div className = "col-2">
                                            {order.shipToName}
                                        </div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div>
                                        <div className = "row">
                                            {/* Shipping Address */}
                                            <div className = "col-auto">
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
                                            <div className = "col-auto">
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

                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}