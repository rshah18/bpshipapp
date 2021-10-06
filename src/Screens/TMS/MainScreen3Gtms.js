import React, {useState, useContext, useEffect} from "react";
import logo3gtms from '../../Resources/img/3Glogo.png'
import Address from "./Components/Address";
import FreightLine from "./Components/FreightLine";
import FreightList from "./Components/FreightList";
import DeliveryDetails from "./Components/DeliveryDetail";
import { FreightContext } from "../../Management/FreightContext";
import config from '../../Management/Config'

export default function MainScreen3Gtms(){
    const [state, dispatch] = useContext(FreightContext); 
    const [docnum, setDocnum] = useState('');
    const [quotes, setQuotes]   = useState([]);

    const AddOrigin = addressVal =>{
        dispatch({type: 'ADD_ORIGIN', payload:addressVal}); 
    }

    const AddDestination = addressVal =>{
        dispatch({type: 'ADD_DEST', payload:addressVal}); 
    }

    const GetQuotesFunc = () =>{
        fetch(config.url+'gtms/getrates', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
        })
        .then(rep=>rep.json())
        .then(resp=>{
            
        })
        .catch(er=>console.log(er));
    }
    

    return (
        <div className="container-fluid">
            {/* NavBar */}
            <nav className="navbar navbar-light bg-light">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">
                 <img src={logo3gtms} alt="" width="40em"/>
                </a>

                <div className="row" style = {{marginTop: 10, marginBottom: -20}}>
                    <div className="col-auto">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control form-control-sm" placeholder="Sales Order #" value={docnum} onChange={event => setDocnum(event.target.value)} />
                            <button className="btn btn-outline-secondary" type="button"  >Search</button>
                        </div>
                    </div>
  
                    <div className="col-auto">
                        <button className="btn btn-secondary" >Clear</button>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary" onClick={GetQuotesFunc} >Quotes</button>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-success" >Ship</button>
                    </div>
        
                </div>
              </div>
            </nav>
            {/* NavBar */}
            {/* Contents */}
            <div >
                <div className = "row">
                    {/**form area */}
                    <div className= "col-9">
                        <div className = "mb-3">
                            <DeliveryDetails/>
                        </div>
                        <div className = 'row mb-3'>
                            <div className = 'col-6'>
                                <Address title = "Origin Address" addAction = {AddOrigin} delivery={false}/>
                            </div>
                            <div className = "col-6">
                                <Address title = "Destination Address" addAction = {AddDestination} delivery={true} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <FreightLine/>
                            </div>
                            <div>
                                <FreightList/>
                            </div>
                        </div>
                    </div>
                    {/* quotes display */}
                    <div>

                    </div>
                </div>
            </div>
            {/* Contents */}

        </div>
    )
}