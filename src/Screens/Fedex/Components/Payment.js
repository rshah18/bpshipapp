import React, {useState, useEffect, useContext} from 'react';
import Address from './Address';
import { ShipmentContext } from "../../../Management/Context";

function Payment({setBillAdd}){
    // context variables 
    const [state, dispatch] = useContext(ShipmentContext); 
    
    // value set 
    const [payment, setPayment] = useState(''); 
    const [showThirdParty, setShowThirdParty] = useState(false); 
    

    // add payment type 
    const addPayment = (ev) =>{
        setPayment(ev); 
        dispatch({type: 'ADD_PAYMENT', payload: ev})
    }


    // address for third party condition
    const ThirdPartyAdd = () =>{
        const [acnt, setAcnt] = useState('')
        const [acAdded, setAcAdded] = useState(false); 

        const clear = () =>{
            setAcnt(''); 
            setAcAdded(false); 
        }

        const add_third_party_acnt = () =>{
            dispatch({type: 'ADD_THIRD_PARTY_ACCOUNT', payload: acnt})
            setAcAdded(true); 
        }


        if(showThirdParty){
            return (
                <div>
                    <form>
                        <div className="row">
                            <label className="col-sm-4 col-form-label">Account Number</label>
                            <div className = "col-sm-8">
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm"  
                                    //placeholder="Billing Account Number" 
                                    value = {acnt} 
                                    onChange={event => setAcnt(event.target.value)}
                                    />
                            </div>
                        </div>
                    </form>
                    {/* Buttons */}
                    <div className = "row">
                        <div className = "col-2" >
                            <button className= "btn btn-secondary btn-sm" onClick ={clear}>Clear</button>
                        </div>  
                        <div className = "col-3" >
                            <button className= {acAdded ?  "btn btn-success btn-sm": "btn btn-primary btn-sm"} onClick ={add_third_party_acnt}>Add Acnt</button>
                        </div>
                    </div>

                </div>
                
            )
        }
        else return (<div></div>)

    }


    // use effect 
    useEffect(()=>{
        if(payment === "THIRD_PARTY"){
            setBillAdd(true); 
            setShowThirdParty(true); 
        } else {
            setBillAdd(false); 
            setShowThirdParty(false); 
        }
    }, [payment])

    return (
        <div >
            <div className = "card shadow" style={{
        }}>
                <div className = "card-header" style={{background:'#3d0099',  color: 'white'}} >Payment Information</div>
                <div className = "card-body">
                    {/** payment */}
                    <div className = "mb-3">
                        <form onSubmit={e=>e.preventDefault()}>
                            
                            <select className="form-select form-select-sm" aria-label="Default select" value={payment} onChange={ev => addPayment(ev.target.value)}>
                                <option defaultValue>Select Payment type</option>
                                <option value="SENDER">Sender</option>
                                <option value="THIRD_PARTY">Third Party/Customer</option>
                            </select>
                        </form>
                    </div>
                    <div>
                        <ThirdPartyAdd />
                    </div>
                    {/**payment  */}
                </div>
            </div>
        </div>

    )
}

export default Payment; 