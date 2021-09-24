import React, {useState, useContext, useEffect} from "react";
import { ShipmentContext } from "../../../Management/Context";

export default function Contact({title, salesOrderRecipient}) {
    const [state, dispatch] = useContext(ShipmentContext); 
    // fields 
    const [name, setName]           = useState(''); 
    const [company, setCompany]     = useState(''); 
    const [email, setEmail]         = useState(''); 
    const [phone, setPhone]         = useState(''); 
    const [ext, setExt]             = useState(''); 
    const [taxId, setTaxid]         = useState(''); 
    const [added, setAdded]         = useState(false); 
    const [recipient, setRecipient] = useState(''); 


    const clear = () =>{
        setName('');
        setCompany('');
        setEmail('');
        setPhone('');
        setExt('');
        setRecipient(''); 
        dispatch({type: 'ADD_RECIPIENT', payload: {}})
        setAdded(false); 
    }

    const addToState =()=> {
        if(
            (name.length <1) || 
            (email.length < 1) ||
            (phone.length < 1) ||
            (recipient.length < 1) 
            ){
                window.alert("Please Enter valid contact Information!"); 
            } else {
                let body = {
                    'name': name,
                    'company': company,
                    'email' : email,
                    'phone': phone,
                    'ext': ext,
                    'recipient': recipient
                }
                dispatch({type: 'ADD_RECIPIENT', payload: body})
                setAdded(true)
            }

    }

    useEffect(()=>{
        
        if(Object.keys(salesOrderRecipient).length !== 0){ 
            setName(salesOrderRecipient.name);
            setCompany(salesOrderRecipient.company);
            setEmail(salesOrderRecipient.email);
            setPhone(salesOrderRecipient.phone);
            setExt(salesOrderRecipient.ext);
            setRecipient(salesOrderRecipient.recipient);  
        }
        
    }, [salesOrderRecipient])

    return (

        <div className = "shadow">

            <div className="card">
                <div className = "card-header" style={{background:'#3d0099',  color: 'white'}}>{title}</div>
                <div className = "card-body">

                    <div>
                        <form>
                            {/*recipient*/}
                            <div>
                                <label className = "form-label">Recipient Id</label>
                                <input 
                                        type="text" 
                                        className="form-control form-control-sm"
                                        value = {recipient} 
                                        onChange={event => setRecipient(event.target.value)}
                                />
                            </div>
                            {/* recipient */}
                            {/*Contact Name */}
                            <div>
                                <label className = "form-label">Contact Name</label>
                                <input 
                                        type="text" 
                                        className="form-control form-control-sm"
                                        value = {name} 
                                        onChange={event => setName(event.target.value)}
                                />
                            </div>
                            {/* contact name */}

                            {/*Comapny Name */}
                            <div>
                                <label className = "form-label">Company Name</label>
                                <input 
                                        type="text" 
                                        className="form-control form-control-sm"
                                        value = {company} 
                                        onChange={event => setCompany(event.target.value)} 
                                />
                            </div>
                            {/* company name */}

                            {/* Email */}
                            <div>
                                <label className = "form-label">Email</label>
                                <input 
                                        type="text" 
                                        className="form-control form-control-sm"
                                        value = {email} 
                                        onChange={event => setEmail(event.target.value)}
                                />
                            </div>
                            {/* Email */}

                            {/* Phone */}
                            <div className = "row">
                                <div className = "col-9">
                                    <label className = "form-label">Phone</label>
                                    <input 
                                            type="text" 
                                            className="form-control form-control-sm"
                                            value = {phone} 
                                            onChange={event => setPhone(event.target.value)}
                                    />
                                </div>
                                <div className = "col-3">
                                    <label className = "form-label">ext</label>
                                    <input 
                                            type="text" 
                                            className="form-control form-control-sm"
                                            value = {ext} 
                                            onChange={event => setExt(event.target.value)}
                                    />
                                </div>
                            </div>
                            {/* Phone */}
                        </form>    

                        <div className = "row" style = {{marginTop: 10}}>
                            <div className = "col-auto">
                                <button className = {added ? "btn btn-success btn-sm": "btn btn-primary btn-sm" } onClick = {addToState}>Add Contact</button>
                            </div>
                            <div className = "col-auto">
                                <button className = "btn btn-secondary btn-sm" onClick={clear}>Clear</button>
                            </div>

                            
                        </div>
                    </div>      
                
                </div>
            </div>

        </div>
    )
}