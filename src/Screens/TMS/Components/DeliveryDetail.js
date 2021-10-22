import React, {useState, useContext, useEffect} from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { FreightContext } from "../../../Management/FreightContext";


export default function DeliveryDetails({salesOrder}){
    const [state, dispatch] = useContext(FreightContext);
    const [currentOpt, setCurrentOpt] = useState('');
    const [ datetime, setDatetime ] = useState('');
    const [ordNum, setOrdNum] = useState('');

    const [customerPO, setCustomerPO] = useState('');
    const [ref, setRef] = useState('');


    
    const handleChange = ev => {
        if (!ev.target['validity'].valid) return;
        const dt= ev.target['value'] + ':00Z';
        setDatetime(dt);
        dispatch({type: 'ADD_PICKUP', payload: dt})
        console.log(datetime);
      }
    
    const addSalesOrder = val => {
        setOrdNum(val);
        dispatch({type: 'ADD_SALES_ORDER', payload: val});
    }

    const addCustomerPO = val => {
        setCustomerPO(val);
        dispatch({type: 'ADD_CUSTOMER_PO', payload: val});
    }

    const addRef = val => {
        setRef(val);
        dispatch({type: 'ADD_REF', payload: val});
    }

    const handleDelete = key =>{
        console.log(key);
        dispatch({type: 'REMOVE_ACCESSORIAL', payload: key})
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

    useEffect(()=>{
        setOrdNum(salesOrder);
    }, [salesOrder])


    return(
        <div className="card shadow" >
            <div className = "card-header" style={{background:'#3d0099',  color: 'white'}}>
                Delivery Information
            </div>
            <div className="card-body" >

                <div className = "row">
                    <div className = "col-4">
                        <div className = "row">
                            <label className = "col-sm-4 col-form-label">Order Num</label>
                            <div className = "col-sm-8">
                            <input 
                                    type="text" 
                                    className="form-control form-control-sm"
                                    value = {ordNum}
                                    onChange={event => addSalesOrder(event.target.value)}
                            />
                            </div>
                        </div>
                    </div>
                    <div className = "col-4">
                        <div className = "row">
                            <label className = "col-sm-3 col-form-label">Pick up </label>
                            <div className = "col-sm-9">
                                <input type="datetime-local" value={(datetime || '').toString().substring(0, 16)} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className = "col-3">
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
                                <Chip label={AccessorialListOptions[val]} key={'chipkey_'+ndx} onDelete={()=>handleDelete(val)}/>
                            )
                        })
                    }
                    </Stack>
                </div>
                <div style = {{marginTop: 15}} >
                    <div >
                            <div className = "row">
                                <div className = "col-auto">
                                    <div className="col-auto input-group input-group-sm mb-3">
                                            <span className="input-group-text">Customer PO</span>
                                            <input type="text" className="form-control" 
                                                                                value = {customerPO}
                                                                                onChange={event => addCustomerPO(event.target.value)}
                                            />
                                            
                                    </div>
                                </div>
                                <div className = "col-auto">
                                    <div className="col-auto input-group input-group-sm mb-3">
                                            <span className="input-group-text">Reference</span>
                                            <input type="text" className="form-control" 
                                                                                value = {ref}
                                                                                onChange={event => addRef(event.target.value)}
                                            />
                                            
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

//value={payment} onChange={ev => addPayment(ev.target.value)}