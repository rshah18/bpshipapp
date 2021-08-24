import React, {useState, useEffect, useContext} from 'react';
import Address from './Address';
import {ShipmentContext} from '../Management/Context'

function Payment({setBillAdd}){
    // context variables 
    const [_state, dispatch] = useContext(ShipmentContext); 
    // value set 
    const [payment, setPayment] = useState(''); 
    const [showThirdParty, setShowThirdParty] = useState(false); 
    const [acnt, setAcnt] = useState('')

    // add payment type 
    const addPayment = (ev) =>{
        setPayment(ev); 
        dispatch({type: 'ADD_PAYMENT', payload: ev})
    }

    // add third party account # 
    const add_third_party_acnt = (num) =>{
        console.log(num); 
    }

    // address for third party condition
    const ThirdPartyAdd = () =>{
        if(showThirdParty){
            return (
                <div className= "row" >
                    <div className="col-8">
                        <form>
                            <div >
                                <label className="form-label">Account Number</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm"  
                                    placeholder="Billing Account Number" 
                                    value = {acnt} onChange={ev => setAcnt(ev.target.value)} />
                            </div>
                        </form>
                    </div>
                    <div className = "col-4" style = {{marginTop: 32}}>
                        <button className="btn btn-primary btn-sm">Add Acnt</button>
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
                    <div>
                        <form className="row" onSubmit={e=>e.preventDefault()}>
                            
                            <select className="form-select" aria-label="Default select" value={payment} onChange={ev => addPayment(ev.target.value)}>
                                <option selected>Select Payment type</option>
                                <option value="SENDER">Sender</option>
                                <option value="THIRD_PARTY">Third Party</option>
                            </select>
                        </form>
                        <div>
                            <ThirdPartyAdd />
                        </div>
                    </div>
                    {/**payment  */}
                </div>
            </div>
        </div>

    )
}

export default Payment; 