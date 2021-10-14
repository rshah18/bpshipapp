import React, {useContext, useEffect, useState} from "react";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

export default function FreightHistory(){

    const [type, setType] = useState('');



    return(
        <div className="container">
            {/**Search box */}
            <div className="row">
                <div className="col-auto">
                    <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <div>
                            <lable>Search by</lable>
                        </div>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Search By"
                            onChange={e=>setType(e.target.value)}
                        >
                            <MenuItem value={10}>BOL #</MenuItem>
                            <MenuItem value={20}>Date</MenuItem>
                            
                        </Select>
                    </FormControl>
                    </Box>
                </div>
                <div className="col-auto">
                    
                </div>
                <div className="col-auto">
                
                </div>
            </div>
            {/**Search box */}
        </div>
    )
}