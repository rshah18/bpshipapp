import React, {useState, useContext, useEffect} from "react";
import logo3gtms from '../../Resources/img/3Glogo.png'
import Address from "./Components/Address";
import FreightLine from "./Components/FreightLine";
import FreightList from "./Components/FreightList";
import DeliveryDetails from "./Components/DeliveryDetail";
import { FreightContext } from "../../Management/FreightContext";
import config from '../../Management/Config'
import LinearProgress from '@mui/material/LinearProgress';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { LoadingButton } from '@mui/lab';
import RateItem from "./Components/RateItem";


export default function MainScreen3Gtms(){
    const [state, dispatch] = useContext(FreightContext); 
    const [docnum, setDocnum] = useState('');
    const [quotes, setQuotes]   = useState([]);

    const [loadingFlag, setLoadingFlag] = useState(false);
    
    const [carrier, setCarrier] = useState('');

    const [dialonMsg, setDialogMsg] = useState(''); 
    const [dialogOpen, setDialogOpen] = useState(false); 

    const AddOrigin = addressVal =>{
        dispatch({type: 'ADD_ORIGIN', payload:addressVal}); 
    }

    const AddPartner = val =>{
        dispatch({type: 'ADD_PARTNER', payload:val}); 
    }

    const AddDestination = addressVal =>{
        dispatch({type: 'ADD_DEST', payload:addressVal}); 
    }

    const DisplayMsg = msg =>{
        setDialogMsg(msg);
        setDialogOpen(true);
    }

    const GetQuotesFunc = () =>{
        setLoadingFlag(true);
        setQuotes([]);
       
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
            if(resp['success']){
                setQuotes(resp['rates']['rate']);
                console.log(resp);
            } else {
                DisplayMsg('Rate Request Error!')
            }
            console.log(resp['success']);
            setLoadingFlag(false);
            
        })
        .catch(er=>{
            console.log(er);
            setLoadingFlag(false);
        });

        
        console.log('loading flag: ', loadingFlag);
    }

    const ShipFunc = () =>{
        //setLoadingFlag(true);
        fetch(config.url+'gtms/ship', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
        })
        .then(rep=>rep.json())
        .then(resp=>{
            console.log(resp);
        })
        .catch(er=>console.log(er));

        //setLoading(false);
    }


    

    return (
        <div className="container-fluid">
            
            <Dialog open={dialogOpen} onClose ={()=>setDialogOpen(false)}>
                    <DialogTitle>{'3Gtms'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{dialonMsg}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>setDialogOpen(false)}>Close</Button>
                    </DialogActions>
            </Dialog>
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
                        <LoadingButton className="btn btn-primary" onClick={GetQuotesFunc} loading = {loadingFlag} loadingPosition ={'center'}>Quotes</LoadingButton>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-success" onClick = {ShipFunc}>Ship</button>
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
                                <Address title = "Origin Address" addAction = {AddOrigin} delivery={false} addedFlag={Object.keys(state['origin']).length !== 0}/>
                            </div>
                            <div className = "col-6">
                                <Address title = "Destination Address" addAction = {AddDestination} delivery={true} addedFlag={Object.keys(state['destination']).length !== 0} />
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
                    <div className = "col-3">
                        {
                            quotes.map((item, ndx)=>{
                                return(
                                    <div key = {'key_'+ndx}>
                                        <RateItem rateDetails = {item} AddPartner={AddPartner} current ={state['tradingPartner']} 
                                            carrier = {carrier}  setCarrier = {setCarrier}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* quotes display */}
                </div>
            </div>
            {/* Contents */}

        </div>
    )
}