import React, { useEffect } from "react";
import { useState } from "react";
import Sidenav from "../Sidenav";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import Item from '@mui/material/ListItem';
import Card from "@mui/material/Card";
import Button from '@mui/material/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Navbar from '../global/navbar'
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
    'SOS',
    'Distant bad weather',
    'Local bad weather',
    'Danger',
    'Great danger',
    'Fishing alert',
    'Floods',
  ];

const vessels =[
  'Corvette',
  'Frigate'
]

const fleets = [
  'Cargo fleet',
  'Passenger fleet'

]

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box sx={{ p: 3 }}>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      );
    }
    
    CustomTabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    };
    
    function a11yProps(index) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }


export default function Alerts() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChanges = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [alertTitle, setAlertTitle] = useState([]);
    useEffect(() => {
      getAlerts();
    }, []);
    const getAlerts = async () => {
      const res = await fetch("http://localhost:3000/api/alert");
      const getconn = await res.json();
      console.log(getconn)
      setAlertTitle(getconn.alert);
    };

    
  return (
    <>
    
    <Box sx={{ display: "flex" }}>
      <Sidenav />
      
     
    <Box sx={{ width: '100%' }}>
    
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
   
    <Navbar/>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Fleets" {...a11yProps(0)} />
        <Tab label="Vessels" {...a11yProps(1)} />
        <Tab label="All" {...a11yProps(1)} />

        
      </Tabs>
    </Box>
    
    <CustomTabPanel value={value} index={0}>
        <div className=" ml-80">
    <Card sx={{height: 50 + "vh",width: 100 + "vh"}}>
        <div>
            <h1 className=" text-2xl text-center font-semibold">
                FLEETS ALERTS
            </h1>
        </div>

        <div className=" flex gap-5 mt-5">
    <div className=" ml-3">
    <FormControl sx={{ m: 1, width: 280 }}>
        <InputLabel id="demo-multiple-name-label" size="small">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
         
          value={personName}
          onChange={handleChanges}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          size="small"
        >
          {fleets.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        </div>
        <FormControl sx={{ m: 1, width: 300}}>
        <InputLabel id="demo-multiple-name-label" size="small">Type</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
        
          value={personName}
          onChange={handleChanges}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          size="small"
        >
          {alertTitle?.map((item,i )=>{
            return(
              <MenuItem key={i} value={item.alert_title} >
                {item.alert_title}
              </MenuItem>
            )
          })}
        </Select>
        
      </FormControl>
      
      <br></br>
      </div>
      <div className=" ml-14 mt-5">

      <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="Message" id="fullWidth" size="small" />
    </Box>

       
      </div>
      <div className=" ml-14 mt-5">

      <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="Description" id="fullWidth" size="small" />
    </Box>

       
      </div>
    <div className=" mt-5 ml-64">
    <Button variant="contained">Send</Button>
    </div>
   
    </Card>
    </div>
    </CustomTabPanel>
    <CustomTabPanel value={value} index={1}>
    <div className=" ml-80">
    <Card sx={{height: 50 + "vh",width: 100 + "vh"}}>
        <div>
            <h1 className=" text-2xl text-center font-bold">
              VESSEL ALERTS
            </h1>
        </div>

        <div className=" flex gap-5 mt-5">
    <div className=" ml-3">
    <FormControl sx={{ m: 1, width: 280 }}>
        <InputLabel id="demo-multiple-name-label" size="small">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          
          value={personName}
          onChange={handleChanges}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          size="small"
        >
          {vessels.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        </div>
        <FormControl sx={{ m: 1, width: 300}}>
        <InputLabel id="demo-multiple-name-label" size="small">Type</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
         
          value={personName}
          onChange={handleChanges}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          size="small"
        >
          {alertTitle?.map((item,i )=>{
            return(
              <MenuItem key={i} value={item.alert_title}>
                {item.alert_title}
              </MenuItem>
            )
          })}
           
        </Select>
        
      </FormControl>
      
      <br></br>
      </div>
      <div className=" ml-14 mt-5">

      <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="Message" id="fullWidth" size="small" />
    </Box>

       
      </div>
      <div className=" ml-14 mt-5">

      <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="Description" id="fullWidth" size="small" />
    </Box>

       
      </div>
    <div className=" mt-5 ml-64">
    <Button variant="contained">Send</Button>
    </div>
   
    </Card>
    </div>
    </CustomTabPanel>

    <CustomTabPanel value={value} index={2}>
    <div className=" ml-80">
    <Card sx={{height: 50 + "vh",width: 100 + "vh"}}>
        <div>
            <h1 className=" text-2xl text-center font-semibold">
             ALERTS
            </h1>
        </div>

        <div className="gap-5 ml-12 mt-2">
    <div className=" ml-8">
    <FormControl sx={{ m: 1, width: 280 }}>
        
        </FormControl>
        </div>
        <FormControl sx={{ m: 1, width: 300}}>
        <InputLabel id="demo-multiple-name-label" size="small">Type</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
         
          value={personName}
          onChange={handleChanges}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          size="small"
        >
         {alertTitle?.map((item,i )=>{
            return(
              <MenuItem key={i} value={item.alert_title} >
                {item.alert_title}
              </MenuItem>
            )
          })}
         
        </Select>
        
      </FormControl>
      
      <br></br>
      </div>
      <div className=" ml-14 mt-5">

      <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="Message" id="fullWidth" size="small" />
    </Box>

       
      </div>
      <div className=" ml-14 mt-5">

      <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="Description" id="fullWidth" size="small" />
    </Box>

       
      </div>
    <div className=" mt-5 ml-64">
    <Button variant="contained">Send</Button>
    </div>
   
    </Card>
    </div>
    </CustomTabPanel>
    
   
    
  </Box>
    </Box>
    </>
  )
}
