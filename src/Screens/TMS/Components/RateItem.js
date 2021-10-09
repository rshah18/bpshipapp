import React, {useState, useContext, useEffect} from "react";

export default function RateItem({rateDetails, AddPartner, current}){
    
    return(
        <div style = {current.id === rateDetails.carrierTradingPartners.carrierTradingPartner[0].id?
            {margin: 10, borderRadius: 5, padding: 10, background: '#ccffcc'}: 
            {margin: 10, borderRadius: 5, padding: 10, background: '#f0e6ff'}
        } 
        
            onClick = {()=>{
                AddPartner(rateDetails.carrierTradingPartners.carrierTradingPartner[0]);          
            }}
        
        >

            <div style ={{fontWeight: 'bold', color: '#007399'}}>{rateDetails.carrierTradingPartners.carrierTradingPartner[0].name}</div>
            
            <div className = "row">
                <div className = "col-auto">
                    {"Est. PickUp: "}
                </div>
                <div className = "col-auto">
                    {new Date(rateDetails.service.estimatedPickup.substr(0, 10).split('-')).toDateString()}
                </div>
            </div>

            <div className = "row">
                <div className = "col-auto">
                    {"Est. Delivery: "}
                </div>
                <div className = "col-auto">
                    {new Date(rateDetails.service.estimatedDelivery.substr(0, 10).split('-')).toDateString()}
                </div>
            </div>

            <div className = "row">
                <div className = "col-auto">
                    {"Days: "}
                </div>
                <div className = "col-auto">
                    {rateDetails.service.days }
                </div>
            </div>

            <div className = "row">
                <div className = "col-auto">
                    {"Distance: "}
                </div>
                <div className = "col-auto">
                    {rateDetails.distance.milesForRating.value + " "+ rateDetails.distance.milesForRating.uom}
                </div>
            </div>

            <div className = "row">
                <div className = "col-auto">
                    {"Price: "}
                </div>
                <div className = "col-auto">
                {rateDetails.pricing.total.value + " " + rateDetails.pricing.total.uom}
                </div>
            </div>
    
            
        </div>
    )
}

//<div>{"Transport Mode. "+rateDetails.contractInfo.strategy.transportMode}</div>