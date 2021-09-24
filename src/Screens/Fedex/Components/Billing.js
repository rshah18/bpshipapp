import React, {useState, useEffect, useContext} from 'react';
import { ShipmentContext } from "../../../Management/Context";


export default function Billing(){
    // references 
    const [state, dispatch]     = useContext(ShipmentContext); 
    const [ref, setRef]         = useState('');
    const [po, setPo]           = useState('');
    const [invoice, setInvoice] = useState(''); 
    const [added, setAdded]     = useState(false); 

    const addRef = () => {
        dispatch({type: 'ADD_REF', payload: {
            ref: ref,
            po: po,
            invoice: invoice
        }});
        setAdded(true); 
    }

    const clear = () =>{
        setRef('');
        setPo('');
        setInvoice(''); 
        dispatch({type: 'ADD_REF', payload: {}})
        setAdded(false); 
    }

    useEffect(()=>{
    }, [])

    return (
        <div>
            <div className = "card shadow">
                <div className = "card-header" style={{background:'#3d0099',  color: 'white'}} >Billing Details</div>
                <div className = "card-body">
                    <div>
                        <form>
                            {/*Reference  */}
                            <div className = "row mb-2">
                                <label className = "col-sm-3 col-form-label">Reference</label>
                                <div className = "col-sm-9">
                                    <input 
                                            type="text" 
                                            className="form-control form-control-sm"
                                            value = {ref}
                                            onChange={event => setRef(event.target.value)}
                                    />
                                </div>
                            </div>
                            {/*Reference */}
                            
                            {/*PO */}
                            <div className = "row mb-2">
                                <label className = "col-sm-3 col-form-label">P.O. no.</label>
                                <div className = "col-sm-9">
                                    <input 
                                            type="text" 
                                            className="form-control form-control-sm"
                                            value = {po}
                                            onChange={event => setPo(event.target.value)}
                                    />
                                </div>
                            </div>
                            {/*PO */}
                            {/*Invoice */}
                            <div className = "row mb-2">
                                <label className = "col-sm-3 col-form-label">Invoice no.</label>
                                <div className="col-sm-9">
                                    <input 
                                            type="text" 
                                            className="form-control form-control-sm"
                                            value = {invoice}
                                            onChange={event => setInvoice(event.target.value)}
                                    />
                                </div>
                            </div>
                            {/*INvoice */}
                        </form>
                    </div>
                    {/* Buttons */}
                    <div className = "row">
                        <div className = "col-4" >
                            <button className= {added ?  "btn btn-success btn-sm": "btn btn-primary btn-sm"} onClick = {addRef} >Add References</button>
                        </div>
                        <div className = "col-2" >
                            <button className= "btn btn-secondary btn-sm" onClick = {clear} >Clear</button>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    )

}