import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import HistoryMainScreen from './HistoryMainScreen';
import FreightHistory from './FreightHistory';

export default function History() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <div>
            {/* NavBar */}
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">Shipment History</span>
                </div>
            </nav>
            {/* NavBar */}
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} >
                        <Tab label="Fedex" value="1" />
                        <Tab label="Freight" value="2" />
                        
                    </TabList>
                    </Box>
                    <TabPanel value="1"><HistoryMainScreen/></TabPanel>
                    <TabPanel value="2"><FreightHistory/></TabPanel>
                    
                </TabContext>
            </Box>
      </div>

  );
}