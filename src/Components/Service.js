import React, {useState, useContext} from 'react';
import { ShipmentContext } from "../Management/Context";
import Quotes from './Quotes';

function ServiceSelect({getRates, quotes}){
    // context variables 
    const [state, dispatch] = useContext(ShipmentContext); 
    const [service, setService] = useState(''); 
    const setValue = (ev) =>{
        console.log(ev)
        setService(ev)
        dispatch({type: 'ADD_SERVICE', payload: ev})
    }
    return (
        <div className = "card shadow">
            <div className = "card-header" style={{background:'#3d0099',  color: 'white'}}>Service</div>
            <div className = "card-body">
                <div>
                    <div style = {{marginTop: 10}}>
                        <button className= "btn btn-primary btn-sm" onClick={getRates}>Get Quotes</button>
                    </div>
                </div>
                <div>
                    {
                        quotes.map(q =>{
                            return(
                                <div>
                                    <Quotes quote= {q} key={q.service} setService={setValue} service={service}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>


    )
}

export default ServiceSelect; 
/**
 *                     <form>
                        <label className="form-label">Select Service</label>
                        <select className="form-select form-select-sm" value = {service} onChange={ev => setValue(ev.target.value) }>
                            <option selected value="opt">Select Service</option>
                            <option value="PRIORITY_OVERNIGHT"> PRIORITY_OVERNIGHT </option>
                            <option value="STANDARD_OVERNIGHT"> STANDARD_OVERNIGHT </option>
                            <option value="FEDEX_2_DAY"> FEDEX_2_DAY </option>
                            <option value="FEDEX_2_DAY_AM"> FEDEX_2_DAY_AM </option>
                            <option value="FEDEX_EXPRESS_SAVER"> FEDEX_EXPRESS_SAVER </option>
                            <option value="FIRST_OVERNIGHT"> FIRST_OVERNIGHT </option>
                            <option value="SAME_DAY"> SAME_DAY </option>
                            <option value="SAME_DAY_CITY"> SAME_DAY_CITY </option>
                            <option value="FEDEX_GROUND"> FEDEX_GROUND </option>
                            <option value="INTERNATIONAL_ECONOMY"> INTERNATIONAL_ECONOMY </option>
                            <option value="INTERNATIONAL_FIRST"> INTERNATIONAL_FIRST </option>
                            <option value="INTERNATIONAL_PRIORITY"> INTERNATIONAL_PRIORITY </option>
                            <option value="INTERNATIONAL_PRIORITY_EXPRESS"> INTERNATIONAL_PRIORITY_EXPRESS </option>
                        </select>
                    </form>
 */