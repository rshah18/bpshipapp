import React, {useState, useContext, useEffect} from "react";

export default function Address({title}){
        // contacts
        const [addBookRef, setAddBookRef] = useState('');
        const [company, setCompany]     = useState('');
        const [sentBy, setSentBy]       = useState('');
        const [phone, setPhone]         = useState('');
        // address variables
        const [address1, setAddress1]   = useState(''); 
        const [address2, setAddress2]   = useState('');
        const [city, setCity]           = useState('');
        const [state, setState]         = useState(''); 
        const [zip, setZip]             = useState(''); 
        const [country, setCountry]     = useState(''); 

    return(
        <div className = "shadow" style={{
            margin: 15
        }}>
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
                            <div className ="row mb-1">
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
                                <div className = 'col-4'>
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
                                <div className = 'col-4'>
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
                                <div className = 'col-4'>
                                    <label className = "form-label">Country Code</label>
                                    <input 
                                            type="text" 
                                            className="form-control form-control-sm"
                                            value = {country} 
                                            onChange={event => setCountry(event.target.value)} 
                                    />
                                </div>
                                {/* Country code  */}

                                </div>


                                

                            
                        </form>



                    </div>
                </div>
            </div>
        </div>
    )
}