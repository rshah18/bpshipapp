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
import ShipmentInfoData from "./Components/ShipmentInfo";
import FreightPkgInfo from "./Components/FreightPkgInfo";




export default function MainScreen3Gtms(){
    const [state, dispatch] = useContext(FreightContext); 
    const [docnum, setDocnum] = useState('');
    const [quotes, setQuotes]   = useState([]);
    const [shipmentData, setShipmentData] = useState({});
    const [FreightPkgData, setFreightPkgData] = useState({});

    const [loadingFlag, setLoadingFlag] = useState(false);
    
    const [carrier, setCarrier] = useState('');
    const [addressList, setAddressList] = useState([]);

    const [dialonMsg, setDialogMsg] = useState(''); 
    const [dialogOpen, setDialogOpen] = useState(false); 
    
    const [loadScreenMsg, setLoadScreenMsg] = useState('Loading quotes');
    const [loadScreenOpen, setLoadScreenOpen] = useState(false);
    
    const [shipmentdialgOpen, setShipmentDialongOpen] = useState(false);
    const [shipmentStatus, setShipmentStatus] = useState(0);

    const clearFunction = ()=>{
        window.location.reload();
        //dispatch({type: 'CLEAR'}); 
    }

    const AddSalesOrderNum = num =>{
        setDocnum(num);
        dispatch({type: 'ADD_SALES_ORDER', payload: num});
    }

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
        console.log(state);
        
        setLoadScreenMsg("Fetching Quotes...")
        setLoadScreenOpen(true);
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
            setLoadScreenOpen(false);
            
        })
        .catch(er=>{
            console.log(er);
            setLoadScreenOpen(false);
        });

        
        
        
    }

    const ShipFunc = () =>{
        setLoadScreenMsg("Processing Shipment...")
        setLoadScreenOpen(true);
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
            /*
            if(resp.status === 500){
                setLoadScreenOpen(false);
                DisplayMsg('Shipment Failed');
                console.log('shipment Failed');
            } else {
                setShipmentData(resp);
                console.log(resp);
                setLoadScreenOpen(false);
                setShipmentDialongOpen(true);
            }
            */
            
            
           setFreightPkgData(resp);
           console.log(resp);
           setLoadScreenOpen(false);
           setShipmentDialongOpen(true);
        })
        .catch(er=>{
            console.log(er);
            setLoadScreenOpen(false);
        });

        //setLoading(false);
    } 

    const ShipInfoFunc = () =>{
        console.log(FreightPkgData);
        if(FreightPkgData['freightHistory']['ukey']){
            setLoadingFlag(true);
            fetch(config.url+'gtms/ship/carrierinfo/' + FreightPkgData['freightHistory']['ukey'],{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(rep=>rep.json())
            .then(resp=>{            
               setFreightPkgData(resp);
               console.log(resp);
               setLoadingFlag(false);
            })
            .catch(er=>{
                console.log(er);
                setLoadingFlag(false);
            });
        } else{
            setLoadingFlag(false);
            DisplayMsg("Carrier Info not Loaded!");
        }

    }

    const GetSalesOrderInfo = () =>{
        fetch(config.url + 'gtms/salesorder/addresses/'+docnum,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(res => {
            if(Object.keys(res).length === 0){
                DisplayMsg('No order found!');
            } else {
                setAddressList(res);
            }
        })
        .catch(err=>console.log(err));
    }

    const ValidationForQuotes = () =>{
        
        if(Object.keys(state['origin']).length === 0){
            DisplayMsg('Origin Address Missing');
        } else if(Object.keys(state['destination']).length === 0){
            DisplayMsg('Destination Address Missing');
        } else if(state['freightList'].length === 0){
            DisplayMsg('Freight Items Missing');
        } else if(state['pickUp'].length === 0){
            DisplayMsg('Shipping Date Missing');
        } else if(state['salesOrderNum'].length === 0){
            DisplayMsg('Order number missing Missing');
            console.log('Order num missing', docnum, docnum.length)
        } else {
            GetQuotesFunc();
        }
    }

    const ValidationForShip = () =>{

        if(Object.keys(state['origin']).length === 0){
            DisplayMsg('Origin Address Missing');
        } else if(Object.keys(state['destination']).length === 0){
            DisplayMsg('Destination Address Missing');
        } else if(state['freightList'].length === 0){
            DisplayMsg('Freight Items Missing');
        } else if(state['pickUp'].length === 0){
            DisplayMsg('Freight Date Missing');
        } else if(state['salesOrderNum'].length === 0){
            DisplayMsg('Order number missing Missing');
        } else if(Object.keys(state['tradingPartner']).length === 0){
            DisplayMsg('Destination Address Missing');
        }
        
        else {
            ShipFunc();
        }
    }


    useEffect(()=>{
        console.log(window.screen.width);
    }, [window.screen.width])

    

    return (
        <div className="container-fluid">
            
            <Dialog open={loadScreenOpen}>
                <DialogContent>
                    <DialogContentText>
                        <div className="row">
                            <div className= "col-auto">
                                <div>{loadScreenMsg}</div>
                            </div>
                            <div className= "col-auto">
                                <div className="spinner-border" role="status" />
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            
            <Dialog open={dialogOpen} onClose ={()=>setDialogOpen(false)}>
                    <DialogTitle>{'3Gtms'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{dialonMsg}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>setDialogOpen(false)}>Close</Button>
                    </DialogActions>
            </Dialog>

            <Dialog open={shipmentdialgOpen}>
                <DialogTitle>{'Shipment Info'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <FreightPkgInfo shipmentData={FreightPkgData}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <LoadingButton loading={loadingFlag} variant="outlined" onClick={ShipInfoFunc}>
                        Load More info
                    </LoadingButton>
                    <Button variant="outlined" onClick={()=>setShipmentDialongOpen(false)}>Close</Button>
                    
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
                            <input type="text" className="form-control form-control-sm" placeholder="Sales Order #" value={docnum} onChange={event => AddSalesOrderNum(event.target.value)} />
                            <button className="btn btn-outline-secondary" type="button" onClick = {GetSalesOrderInfo} >Search</button>
                        </div>
                    </div>
  
                    <div className="col-auto">
                        <button className="btn btn-secondary" onClick = {clearFunction}  >Clear</button>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary" onClick={ValidationForQuotes}>Quotes</button>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-success" onClick = {ValidationForShip}>Ship</button>
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
                            <DeliveryDetails salesOrder = {docnum}/>
                        </div>
                        <div className = 'row mb-3'>
                            <div className = 'col-6'>
                                <Address title = "Origin Address" 
                                    addAction = {AddOrigin} 
                                    delivery={false} 
                                    addedFlag={Object.keys(state['origin']).length !== 0}
                                    preloaded={addressList.length === 0 ? {}: addressList[0]}
                                    />
                            </div>
                            <div className = "col-6">
                                <Address title = "Destination Address" 
                                    addAction = {AddDestination}
                                    delivery={true} 
                                    addedFlag={Object.keys(state['destination']).length !== 0}
                                    preloaded={addressList.length === 0 ? {}: addressList[1]}
                                    />
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