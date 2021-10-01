import React, {useState, useContext, useEffect} from "react";
import logo3gtms from '../../Resources/img/3Glogo.png'
import Address from "./Components/Address";
import FreightLine from "./Components/FreightLine";
import FreightList from "./Components/FreightList";
import { FreightContext } from "../../Management/FreightContext";

export default function MainScreen3Gtms(){
    const [state, dispatch] = useContext(FreightContext); 
    const [docnum, setDocnum] = useState('');

    const AddOrigin = addressVal =>{
        dispatch({type: 'ADD_ORIGIN', payload:addressVal}); 
    }

    const AddDestination = addressVal =>{
        dispatch({type: 'ADD_DEST', payload:addressVal}); 
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
                        <button className="btn btn-primary" >Ship</button>
                    </div>
        
                </div>
              </div>
            </nav>
            {/* NavBar */}
            {/* Contents */}
            <div>
                <div className = "row">
                    <div className= "col-4">
                        <div>
                            {/**Addresses */}
                            <div style={{paddingLeft: 25, paddingRight: 25, paddingTop: 10, paddingBottom: 15}}>
                                <Address title = "Origin Address" addAction = {AddOrigin}/>
                            </div>
                            <div style={{paddingLeft: 25, paddingRight: 25 }}>
                                <Address title = "Destination Address" addAction = {AddDestination}  />
                            </div>
                        </div>
                    </div>
                    <div className = "col-6">
                        <div>
                            <FreightLine/>
                        </div>
                        <div>
                            <FreightList/>
                        </div>
                        

                    </div>
                </div>
            </div>
            {/* Contents */}

        </div>
    )
}