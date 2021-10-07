import React, {useState, useContext, useEffect} from "react";

export default function RateItem({rateDetails}){
    const partnerInfo = rateDetails['carrierTradingPartners']['carrierTradingPartner']; 
    return(
        <div>
            <div>{partnerInfo['name']}</div>
            <div>{rateDetails.contractInfo.strategy.transportMode}</div>
            
        </div>
    )
}