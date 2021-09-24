import React, {useState, useContext} from 'react';
import { ShipmentContext } from "../../../Management/Context";
import Quotes from './Quotes';

function ServiceSelect({getRates, quotes, loading}){
    // context variables 
    const [state, dispatch] = useContext(ShipmentContext); 
    const [service, setService] = useState(''); 
    const setValue = (ev) =>{
        console.log(ev)
        setService(ev)
        dispatch({type: 'ADD_SERVICE', payload: ev})
    }

    const getfedexQuotes = () =>{
        setValue(''); 
        getRates(); 
    }
    return (
        <div className = "card shadow">
            <div className = "card-header" style={{background:'#3d0099',  color: 'white'}}>Service</div>
            <div className = "card-body">
                <div className = "row">
                    <div className = "col-auto" style = {{margin: 7, marginBottom: 15}}>
                        <button className= "btn btn-primary " onClick={getfedexQuotes}>Get Quotes</button>
                    </div>
                    <div className = "col-auto" style = {loading ? {margin: 7, marginBottom: 15, display: 'block'} :{margin: 7, marginBottom: 15, display: 'none'} }>
                        <div className="spinner-border text-primary" role="status"></div>
                    </div>
                </div>
                <div>
                    {
                        quotes.map(q =>{
                            return(
                                <div key={q.service}>
                                    <Quotes quote= {q}  setService={setValue} service={service}/>
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
