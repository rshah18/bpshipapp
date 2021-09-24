import React, {useState, useContext, useEffect} from "react";
import logo3gtms from '../../Resources/img/3Glogo.png'
import Address from "./Components/Address";
import FreightLine from "./Components/FreightLine";

export default function MainScreen3Gtms(){
    const [docnum, setDocnum] = useState('');

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
                            <div>
                                <Address title = "Origin Address"/>
                            </div>
                            <div>
                                <Address title = "Destination Address"/>
                            </div>
                        </div>
                    </div>
                    <div className = "col-6">
                        <FreightLine/>
                    </div>
                </div>
            </div>
            {/* Contents */}

        </div>
    )
}