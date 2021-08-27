import React, {useState, useEffect, useContext} from 'react';

export default function Billing(){
    const [ref, setRef]         = useState('');
    const [po, setPo]           = useState('');
    const [invoice, setInvoice] = useState(''); 

    return (
        <div>
            <div className = "card shadow">
                <div className = "card-header" style={{background:'#3d0099',  color: 'white'}} >Billing Details</div>
                <div className = "card-body">
                    <div>
                        <form>
                            {/*Address One */}
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
                            {/*Address One */}
                            
                            {/*Address One */}
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
                            {/*Address One */}
                            {/*Address One */}
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
                            {/*Address One */}
                        </form>
                    </div>
                    <div>
                        <button className ="btn btn-primary btn-sm">Add References</button>
                    </div>
                </div>
            </div>
        </div>
    )

}