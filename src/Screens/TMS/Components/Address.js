import React, {useState, useContext, useEffect} from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

export default function Address({title, addAction, delivery}){
        // contacts
        const [addBookRef, setAddBookRef] = useState('');
        const [company, setCompany]     = useState('');
        const [sentBy, setSentBy]       = useState('');
        const [phone, setPhone]         = useState('');
        const [email, setEmail]         = useState('');
        // address variables
        const [address1, setAddress1]   = useState(''); 
        const [address2, setAddress2]   = useState('');
        const [city, setCity]           = useState('');
        const [state, setState]         = useState(''); 
        const [zip, setZip]             = useState(''); 
        const [country, setCountry]     = useState(''); 

        const [dialonMsg, setDialogMsg] = useState(''); 
        const [dialogOpen, setDialogOpen] = useState(false); 
        
        const DisplayMsg = msg =>{
            setDialogMsg(msg);
            setDialogOpen(true);
        }

        const clearFields = (e) =>{
            e.preventDefault();

            setAddBookRef('');
            setCompany('');
            setSentBy('');
            setPhone('');
            setEmail('');
            setAddress1('');
            setAddress2('');
            setCity('')
            setState('')
            setZip('')
            setCountry('')

        }



        const addAddres = (e) =>{

            e.preventDefault();

            if(addBookRef.length === 0){
                DisplayMsg("Please Enter Address Reference!");
            } else if(company.length === 0){
                DisplayMsg("Please Enter Company/Name");
            } else if((sentBy.length === 0) && (delivery === false)){
                    DisplayMsg("Please Enter sentBy");
            } else if(phone.length === 0){
                DisplayMsg("Please Enter phone");
            } else if(email.length === 0){
                DisplayMsg("Please Enter email");
            } else if(address1.length === 0){
                DisplayMsg("Please Enter address1");
            } else if(city.length === 0){
                DisplayMsg("Please Enter city");
            } else if(state.length === 0){
                DisplayMsg("Please Enter state");
            } else if(zip.length === 0){
                DisplayMsg("Please Enter zip");
            } else if(country.length === 0){
                DisplayMsg("Please Enter country");
            } else {
                addAction({
                    reference: addBookRef,
                    company: company,
                    sentBy: sentBy,
                    phone: phone,
                    email: email,
                    address1: address1,
                    address2: address2,
                    city: city,
                    state: state,
                    zip:  zip,
                    country: country
                })
            }
            
        }

    return(
        <div className = "shadow" style={{
            
        }}>

                <Dialog open={dialogOpen} onClose ={()=>setDialogOpen(false)}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{dialonMsg}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>setDialogOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>



            <div className="card">
                <div className = "card-header" style={{background:'#3d0099',  color: 'white'}}>{title}</div>
                <div className = "card-body">
                    <div >
                        <form >
                            {/*address book ref */}
                            <div className ="row mb-1">
                                <label className = "col-sm-4 col-form-label">Address Ref.</label>
                                <div className = "col-sm-8">
                                    <input 
                                            type="text" 
                                            className="form-control form-control-sm"
                                            value = {addBookRef}
                                            onChange={event => setAddBookRef(event.target.value)}
                                    />
                                </div>
                            </div>
                            {/*address book ref */}
                            
                            {/*Company/name */}
                            <div className ="row mb-1">
                                <label className = "col-sm-4 col-form-label">Company/Name</label>
                                <div className = "col-sm-8">
                                    <input 
                                            type="text" 
                                            className="form-control form-control-sm"
                                            value = {company}
                                            onChange={event => setCompany(event.target.value)}
                                    />
                                </div>
                            </div>
                            {/*Company/name */}

                            {/*sent by */}
                            <div className ="row mb-1" style = {delivery === true? {display: "none"}: {}}>
                                <label className = "col-sm-4 col-form-label">Sent by </label>
                                <div className = "col-sm-8">
                                <input 
                                        type="text" 
                                        className="form-control form-control-sm"
                                        value = {sentBy}
                                        onChange={event => setSentBy(event.target.value)}
                                />
                                </div>
                            </div>
                            {/*sent by */}

                            {/*Email */}
                            <div className ="row mb-1">
                                <label className = "col-sm-4 col-form-label">Email</label>
                                <div className = "col-sm-8">
                                <input 
                                        type="text" 
                                        className="form-control form-control-sm"
                                        value = {email}
                                        onChange={event => setEmail(event.target.value)}
                                />
                                </div>
                            </div>


                            {/*Email */}

                            {/*phone */}
                            <div className ="row mb-1">
                                <label className = "col-sm-4 col-form-label">Phone</label>
                                <div className = "col-sm-8">
                                <input 
                                        type="text" 
                                        className="form-control form-control-sm"
                                        value = {phone}
                                        onChange={event => setPhone(event.target.value)}
                                />
                                </div>
                            </div>
                            {/*Phone */}

                            {/*Address One */}
                            <div className ="row mb-1">
                                <label className = "col-sm-4 col-form-label">Address 1</label>
                                <div className = "col-sm-8">
                                <input 
                                        type="text" 
                                        className="form-control form-control-sm"
                                        value = {address1}
                                        onChange={event => setAddress1(event.target.value)}
                                />
                                </div>
                            </div>
                            {/*Address One */}

                            {/*Address two */}
                            <div className ="row mb-1">
                                <label className = "col-sm-4 col-form-label">Address 2</label>
                                <div className = "col-sm-8">
                                <input 
                                        type="text" 
                                        className="form-control form-control-sm"
                                        value = {address2} 
                                        onChange={event => setAddress2(event.target.value)}
                                />
                                </div>
                            </div>
                            {/*Address two */}

                            {/*City */}
                            <div className = 'row mb-1'>
                                <label className = "col-sm-4 col-form-label">City</label>
                                <div className = "col-sm-8">
                                <input 
                                        type="text" 
                                        className="form-control form-control-sm"
                                        value = {city} 
                                        onChange={event => setCity(event.target.value)}
                                />
                                </div>
                            </div>
                            {/*Address city */}

                            <div className = "row mb-1">

                                {/* state */}
                                <div className = 'col-3'>
                                    <label className = "form-label">State</label>
                                    <input 
                                            type="text" 
                                            className="form-control form-control-sm"
                                            value = {state} 
                                            onChange={event => setState(event.target.value)}
                                    />
                                </div>
                                {/* State */}

                                {/* zip */}
                                <div className = 'col-3'>
                                    <label className = "form-label">Zip</label>
                                    <input 
                                            type="text" 
                                            className="form-control form-control-sm"
                                            value = {zip} 
                                            onChange={event => setZip(event.target.value)}
                                    />
                                </div>
                                {/* Zip  */}

                                {/* Country code */}
                                <div className = 'col-3'>
                                    <label className = "form-label">Country</label>
                                    <input 
                                            type="text" 
                                            className="form-control form-control-sm"
                                            value = {country} 
                                            onChange={event => setCountry(event.target.value)} 
                                    />
                                </div>
                                {/* Country code  */}

                                {/* Add */}
                                <div className = 'col-3' style = {{marginTop: 31}}>
                                    <div className="btn-group btn-group-sm" role="group">
                                        <button className="btn btn-primary" onClick={addAddres}>Add</button>
                                        <button className="btn btn-secondary" onClick={clearFields}>clear</button>
                                    </div>
                                    
                                </div>
                                {/* Add */}

                            </div>


                                

                            
                        </form>



                    </div>
                </div>
            </div>
        </div>
    )
}