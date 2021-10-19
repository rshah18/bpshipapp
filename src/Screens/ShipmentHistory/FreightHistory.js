import React, {useContext, useEffect, useState} from "react";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import config from '../../Management/Config'

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';


function SearchBox({type, searchItem,setSearchItem }){
    if((type==='bol') || (type === 'docnum')){
        return (
            <div>
                <input className="form-control" type="text" value={searchItem} onChange={ev=>setSearchItem(ev.target.value)}/>
            </div>
        )
    } else if(type==='date'){
        return (
            <div>
                <input className="form-control" type='date' value={searchItem} onChange={ev=>setSearchItem(ev.target.value)}/>
            </div>
        )
    }
     else {
         return(
             <div></div>
         )
     }
}

export default function FreightHistory(){

    const [type, setType] = useState('bol');
    const [searchItem, setSearchItem] = useState('');
    const [result, setResult] = useState([]);

    const GetResults = () =>{
        console.log([type, searchItem]);
        fetch(config.url + 'gtms/history/freight?type='+type+'&searchitem='+searchItem, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(resp=>resp.json())
        .then(resp=>{
            console.log(resp);
            setResult(resp);
        })
        .catch(er=>console.log(er));

    }

    return(
        <div className="container">
            {/**Search box */}
            <div className="row">
                <div className="col-1">
                    <lable>Search by</lable>
                </div>
                <div className="col-2">
                    <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>

                        <Select
                            value={type}
                            size = 'small'
                            onChange={e=>{
                                setSearchItem('');
                                setType(e.target.value);
                            }}
                        >
                            <MenuItem value={'bol'}>BOL #</MenuItem>
                            <MenuItem value={'date'}>Date</MenuItem>
                            <MenuItem value={'docnum'}>Sales Order</MenuItem>
                            
                        </Select>
                    </FormControl>
                    </Box>
                </div>
                <div className="col-3">
                    <SearchBox searchItem={searchItem} setSearchItem={setSearchItem} type={type}/>
                </div>
                <div className="col-auto">
                    <button className = "btn btn-primary" onClick={GetResults}>Search</button>
                </div>
                <div className="col-auto">
                    <button className = "btn btn-secondary" onClick={()=>setResult([])}>Clear</button>
                </div>
            </div>
            {/**Search box */}
            {/** search result */}
            
            <div style = {{marginTop: 40}}>
                {
                    result.map((item, ndx)=>{
                        return (
                            <div key={'key_'+ ndx}>
                                <Accordion>
                                    <AccordionSummary>
                                        {'Sales Order: '+item['salesOrder']}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    <div className="row justify-content-between" >
                                            {/** origin address */}
                                            <div className = "col-auto" style = {{fontWeight: 'bold'}}>
                                                <h5>{'Origin'}</h5>
                                                <div>{item['originAddr1']}</div>
                                                <div>{item['originCityName']}</div>
                                                <div>{item['originStateCode'] + ', ' + item['originPostalCode']}</div>
                                                <div>{item['originCountryISO2']}</div>
                                            </div>

                                            {/** destination */}
                                            <div className = "col-auto" style = {{fontWeight: 'bold'}}>
                                                <h5>{'Destination'}</h5>
                                                <div>{item['destinationAddr1']}</div>
                                                <div>{item['destinationCityName']}</div>
                                                <div>{item['destinationStateCode'] + ', ' + item['destinationPostalCode']}</div>
                                                <div>{item['destinationCountryISO2']}</div>
                                            </div>

                                            {/** Load Carrier info */}
                                            <div className = "col-auto" style = {{fontWeight: 'bold'}}>
                                                <h5>{'Carrier Info'}</h5>
                                                <div>{item['tradingPartnerName']}</div>
                                                <div>{'Cost: $' + item['cost']}</div>
                                                <div>{'Pro Num: ' + item['proNum']}</div>
                                                <div>{'BOL: ' + item['bol']}</div>
              
                                            </div>

                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        )
                    })
                }
            </div>

            {/** search result */}
        </div>
    )
}