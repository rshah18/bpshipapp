import React, {useContext, useEffect, useState} from "react";
import config from '../../../Management/Config';

export default function FreightPkgInfo({shipmentData})  

{
        // GET Pick List 
        const GetPickList = (docNum) =>{
            
            fetch(config.url +"gtms/getDocs/bol/"+shipmentData.loads.load[0].docRefs.docRef[0].docNum, {
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
              a.download = shipmentData.loads.load[0].docRefs.docRef[0].docNum+'.pdf'; 
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
                    <div>{shipmentData['freightHistory']['tradingPartnerNum']}</div>
                    <div>{shipmentData['freightHistory']['destinationCountryISO2']}</div>
                </div>

            </div>
        </div>
    )
}

