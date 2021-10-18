import React, {useContext, useEffect, useState} from "react";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import config from '../../Management/Config'

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

    const GetResults = () =>{
        console.log([type, searchItem]);
        fetch(config.url + 'gtms/history/freight?type='+type+'&searchitem='+searchItem, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(resp=>resp.json())
        .then(resp=>console.log(resp))
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
            </div>
            {/**Search box */}
        </div>
    )
}