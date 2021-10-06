import React, {useState, useContext, useEffect} from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { FreightContext } from "../../../Management/FreightContext";



export default function DeliveryDetails(){
    const [state, dispatch] = useContext(FreightContext);
    const [currentOpt, setCurrentOpt] = useState('');
    const [ datetime, setDatetime ] = useState('');
    
    const  handleChange = ev => {
        if (!ev.target['validity'].valid) return;
        const dt= ev.target['value'] + ':00Z';
        setDatetime(dt);
        dispatch({type: 'ADD_PICKUP', payload: dt})
        console.log(datetime);
      }

    const AccessorialListOptions = {
        'APPT': 'Appointment',
        'NFY' :'Notification',
        'CSD': 'Construction Site Delivery',
        'HAZMAT': 'Hazardous Materials' ,
        'INSDD':'Inside Delivery',
        'INSDP':'Inside Pickup',
        'LFGD': 'Liftgate at Delivery',
        'LFGP': 'Liftgate at Pickup',
        'LAD': 'Limited Access Delivery',
        'LAP': 'Limited Access Pickup',
        'RESD': 'Residential Delivery',
        'RESP': 'Residential Pickup ',
        'TRDSHW': 'Tradeshow' 
    
    }
    

    const onChangeAccessorial = e =>{
        e.preventDefault(); 
        
        dispatch({type: 'ADD_ACCESSORIAL', payload: e.target.value})
        //setCurrentOpt('');
    }


    return(
        <div className="card shadow" >
            <div className = "card-header" style={{background:'#3d0099',  color: 'white'}}>
                Delivery Information
            </div>
            <div className="card-body" >
                <div className = "row">
                    <div className = "col-3 ">
                        <label>Pick up Date Time</label>
                        <input type="datetime-local" value={(datetime || '').toString().substring(0, 16)} onChange={handleChange} />
                    </div>
                    <div className = "col-3 mb-3">
                        
                        <select className="form-select form-select-sm" value={currentOpt} onChange={onChangeAccessorial}>
                                    <option defaultValue>Add Accessorial Info</option>
                                    {
                                        Object.keys(AccessorialListOptions).map((val, ndx)=>{
                                            return(
                                                <option value = {val} key={val}>{AccessorialListOptions[val]}</option>
                                            )
                                        })
                                    }
                        </select>
                    </div>
                </div>
                <div>
                    <Stack direction="row" spacing={1}>
                    {
                        state['accessorialList'].map((val, ndx)=>{
                            return(
                                <Chip label={AccessorialListOptions[val]}/>
                            )
                        })
                    }
                    </Stack>
                </div>
            </div>
        </div>
    )
}

//value={payment} onChange={ev => addPayment(ev.target.value)}