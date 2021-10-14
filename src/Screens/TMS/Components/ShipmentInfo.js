import React, {useContext, useEffect, useState} from "react";
import config from '../../../Management/Config';

export default function ShipmentInfoData({shipmentData})  

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
                <div className = "col-auto">
                    {"Order Number: "}
                </div>
                <div className = "col-auto" style = {{fontWeight: 'bold'}}>
                    {shipmentData.loads.load[0].loadNum}
                </div>
            </div>
            <div className="row">
                <div className = "col-auto">
                    {"Carrier: "}
                </div>
                <div className = "col-auto" style = {{fontWeight: 'bold'}}>
                    {shipmentData.loads.load[0].tradingPartnerCarrier.tradingPartnerName}
                </div>
            </div>
            <div className="row">
                <div className = "col-auto">
                    {"Cost : "}
                </div>
                <div className = "col-auto" style = {{fontWeight: 'bold'}}>
                    {"$"+shipmentData.loads.load[0].totalRouteCost.currencyValue.value}
                </div>
            </div>
            <div className="row">
                <div className = "col-auto">
                    {"Pro Number: "}
                </div>
                <div className = "col-auto" style = {{fontWeight: 'bold'}}>
                    {shipmentData.loads.load[0].pronum}
                </div>
            </div>
            <div className="row">
                <div className = "col-auto">
                    {"BOL Number: "}
                </div>
                <div className = "col-auto" style = {{fontWeight: 'bold'}}>
                    {shipmentData.loads.load[0].docRefs.docRef[0].docNum}
                </div>
            </div>
            <div >
                <button className="btn btn-sm btn-primary" onClick={GetPickList}>Get BOL</button>
            </div>
            
        </div>
    )
}

