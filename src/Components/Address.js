import React, {useState, useContext, useEffect} from "react";
import check from '../Resources/img/check.svg'
import config from '../Management/Config'

export default function Address({title, addAddress, stateAdd}){
    // variables
    const [address1, setAddress1]   = useState(''); 
    const [address2, setAddress2]   = useState('');
    const [city, setCity]           = useState('');
    const [state, setState]         = useState(''); 
    const [zip, setZip]             = useState(''); 
    const [country, setCountry]     = useState(''); 
    const [res, setRes]             = useState(false); 
    const [valid, setValid]         = useState(false);
    const [add, setAdd]             = useState(false); 

    // functions
    const addToState = e => {
        e.preventDefault(); 
        let addressBody = {
            "street1": address1,
            "street2": address2,
            "city": city,
            "state": state,
            "zip": zip,
            "countryCode": country,
            
        }
        if(valid){
            addAddress(addressBody); 
            setAdd(true); 
        } else {
            window.alert('Address Not Valid!'); 
            setAdd(false); 
        }
    }

    const clear =()=> {
        setAddress1(''); 
        setAddress2(''); 
        setCity(''); 
        setState(''); 
        setZip(''); 
        setCountry('');
        setRes(false);
        setValid(false); 
        setAdd(false); 
        addAddress({}); 
    }

    // set address 
    const setInput= (rep) =>{
        setAddress1(rep.street1);
        if(rep.street2 === null){
            setAddress2(''); 
        } else {
            setAddress2(rep.street2);
        }

        setCity(rep.city);
        setState(rep.state);
        setZip(rep.zip);
        setCountry(rep.countryCode);
        setRes(rep.residential); 
        setValid(rep.valid); 

    }


    const validateAdd = (e) => {

        e.preventDefault();  

        let isRes = res === 'checked' ? true : false; 

        let addressBody = {
            "street1": address1,
            "street2": address2,
            "city": city,
            "state": state,
            "zip": zip,
            "countryCode": country,
            "residential": isRes
        }

        fetch(config.url+"addressValidate", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(addressBody),
          })
          .then(response => response.json())
          .then(rep => {
              console.log(rep); 
            // add valid address
            
            if(rep.valid){
                setInput(rep); 
                setAdd(false); 
            } else {
                console.log("address not valid"); 
                window.alert("Address Not valid"); 
                setValid(false); 
                setAdd(false); 
                
            }
          })
          .catch(err=> {
            console.log(err)
          })
        
    }

    useEffect(()=>{
        if(Object.keys(stateAdd).length !== 0){
            setInput(stateAdd); 
            setAdd(false); 
        }
        
    }, [stateAdd])


    // return 
    return(
        <div className = "shadow" style={{
            
        }}>
            <div className="card">
                <div className = "card-header" style={{background:'#3d0099',  color: 'white'}}>{title}</div>
                <div className = "card-body">
                    <div >
                        <form >
                            {/*Address One */}
                            <div>
                                <label className = "form-label">Address 1</label>
                                <input 
                                        type="text" 
                                        className="form-control form-control-sm"
                                        value = {address1}
                                        onChange={event => setAddress1(event.target.value)}
                                />
                            </div>
                            {/*Address One */}

                            {/*Address two */}
                            <div>
                                <label className = "form-label">Address 2</label>
                                <input 
                                        type="text" 
                                        className="form-control form-control-sm"
                                        value = {address2} 
                                        onChange={event => setAddress2(event.target.value)}
                                />
                            </div>
                            {/*Address two */}

                            <div className = "row">
                                {/*City */}
                                <div className = 'col-6'>
                                    <label className = "form-label">City</label>
                                    <input 
                                            type="text" 
                                            className="form-control form-control-sm"
                                            value = {city} 
                                            onChange={event => setCity(event.target.value)}
                                    />
                                </div>
                                {/*Address city */}

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

                                <div className = 'row'>
                                    {/* Country code */}
                                    <div className = 'col-auto'>
                                        <label className = "form-label">Country Code</label>
                                        <input 
                                                type="text" 
                                                className="form-control form-control-sm"
                                                value = {country} 
                                                onChange={event => setCountry(event.target.value)} 
                                        />
                                    </div>
                                    {/* Country code  */}

                                    {/* residential   */}
                                    <div className = 'col-auto' style = {res ? {display: 'block', marginTop: 30}: {display: 'none'}}>
                                        <div className = "row">
                                            <div className = 'col-auto'>
                                                Residential 
                                            </div>
                                            <div className = 'col-auto'>
                                                <img src={check} width = "20" />
                                            </div>
                                        </div>
                                    
                                    </div>
                                    {/* residential  */}

                                </div>

                            </div>
                        </form>

                        <div className = "row" style = {{marginTop: 10}}>

                            <div className = "col-auto">
                                <button className = {valid ? "btn btn-success btn-sm": "btn btn-primary btn-sm"} onClick = {validateAdd}>Validate</button>
                            </div>
                            <div className = "col-auto">
                                <button className = {add ? "btn btn-success btn-sm": "btn btn-primary btn-sm" } onClick = {addToState}>Add Address</button>
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