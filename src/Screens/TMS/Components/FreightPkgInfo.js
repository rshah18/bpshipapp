import React, {useContext, useEffect, useState} from "react";
import config from '../../../Management/Config';

function LoadInfo({shipmentData}){

    // GET Pick List 
    const GetPickList = () =>{
    
        fetch(config.url +"gtms/getDocs/bol/"+shipmentData['freightHistory']['bol'], {
            method: 'GET',
            headers: {
                'Accept': 'application/pdf', 
            }
        })
        .then(response => response.blob())
        .then(blob => {

            const url = window.URL.createObjectURL(new Blob([blob]));
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = shipmentData['freightHistory']['bol']+'.pdf'; 
            a.target = '_blank';
            a.click();
            a.parentElement.removeChild(a);
            
        })
        .catch(err=> {
            console.log(err)
        })
    }

    return(
        <div>
            <div className="row">
                <h4>{'Sales Order: '+ shipmentData['freightHistory']['salesOrder']}</h4>
                <div>{'Load TMS Status: ' + shipmentData['freightHistory']['loadTMSStatus'] }</div>
                {/** origin address */}
                <div className = "col-auto" style = {{fontWeight: 'bold'}}>
                    <h5>{'Origin'}</h5>
                    <div>{shipmentData['freightHistory']['originAddr1']}</div>
                    <div>{shipmentData['freightHistory']['originCityName']}</div>
                    <div>{shipmentData['freightHistory']['originStateCode'] + ', ' + shipmentData['freightHistory']['originPostalCode']}</div>
                    <div>{shipmentData['freightHistory']['originCountryISO2']}</div>
                </div>

                {/** destination */}
                <div className = "col-auto" style = {{fontWeight: 'bold'}}>
                    <h5>{'Destination'}</h5>
                    <div>{shipmentData['freightHistory']['destinationAddr1']}</div>
                    <div>{shipmentData['freightHistory']['destinationCityName']}</div>
                    <div>{shipmentData['freightHistory']['destinationStateCode'] + ', ' + shipmentData['freightHistory']['destinationPostalCode']}</div>
                    <div>{shipmentData['freightHistory']['destinationCountryISO2']}</div>
                </div>

                {/** Load Carrier info */}
                <div className = "col-auto" style = {{fontWeight: 'bold'}}>
                    <h5>{'Carrier Info'}</h5>
                    <div>{shipmentData['freightHistory']['tradingPartnerName']}</div>
                    <div>{'Cost: $' + shipmentData['freightHistory']['cost']}</div>
                    <div>{'Pro Num: ' + shipmentData['freightHistory']['proNum']}</div>
                    <div>{'BOL: ' + shipmentData['freightHistory']['bol']}</div>
                    <div style={shipmentData['freightHistory']['bol'] === null ? {display:'none'}: {}}>
                        <button className="btn btn-sm btn-primary" onClick={GetPickList}>Get BOL (pdf)</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default function FreightPkgInfo({shipmentData, shipmentStatus})  

{
    if(shipmentStatus === 3){
        return(
            <div>
                <LoadInfo shipmentData={shipmentData}/>
            </div>
        )
    } else if(shipmentStatus === 2){
        return (
            <div>
                <div>Shipment Order Status: Released</div>
                <div className="row">
                    <div className="col-auto">Requesting Carrier Information...</div>
                    <div className= "col-auto">
                        <div className="spinner-border" role="status" />
                    </div>
                </div>

            </div>
        )
    } 
    
    else if(shipmentStatus === 4){
        return (
            <div>
                <div>Shipment Order Status: Released</div>
                <div>Carrier Info not loaded...</div>
            </div>
        )
    }

    else {
        return (
            <div>Loading</div>
        )
    }



}

