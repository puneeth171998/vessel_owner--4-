import React from 'react'
import { useEffect, useState } from "react"; 
import Sidenav from "../Sidenav";
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import Navbar from '../global/navbar'
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export default function CaptainReg() {
const [value, setValue] = React.useState(0);
const nav= useNavigate()
const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState("");
const token = JSON.parse(localStorage.getItem("accessToken"));
const [ownerId, setOwnerId] = useState("");
const [opens, setOpens] = React.useState(false);

// console.log(token);
const initialFormData2 ={
  captain_name: '',
  licence_id:'',
  ph_no: '',
  email: '',
  address:'',
}
const [formDa, setFormDa] = useState(initialFormData2);
useEffect(() => {
  fetchProfile();
}, [token]);


const fetchProfile = () => {
  try {
    fetch("http://localhost:3000/api/ownerprofile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOwnerId(data?.user._id));
    
  } catch (error) {
    console.log(error);
  }
};
// console.log(ownerId)


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



  const handleClick = () => {
    setOpens(true);
  };

  const handleCloses = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpens(false);
  };



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 
 



  const handleSubmit2 = async (event) => {
    event.preventDefault();

    const obj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDa),
    };
  
    try {
      const res = await fetch('http://localhost:3000/api/captain', obj);
      const data = await res.json();
      console.log(data.msg);
      setSnackbarMessage(data.msg);
      setSnackbarOpen(true); // Show Snackbar
      setFormDa(initialFormData2)
    } catch (err) {
      console.error(err);
    }
    nav(-1)
  };
  
  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setFormDa((prevData) => ({
      ...prevData,vessel_owner:ownerId,
      [name]: value,
    }));
  };

  return (
    <div>
        <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Navbar />
        <Card style={{width:"60%", margin:"auto", marginTop:"10px"}}>
    <h1 className=" text-2xl font-semibold ml-72">CAPTAIN</h1>
    <div style={{display:"flex",justifyContent:"center", marginTop:"10px", marginBottom:"20px"}}>
    <form onSubmit={handleSubmit2} style={{display:"flex",flexDirection:"column",justifyContent:"center", gap:"10px"}}>
      <div className=" grid-cols-2"></div>
        <FormControl>
          <InputLabel htmlFor="vessel_name">Captain Name</InputLabel>
          <Input
            name="captain_name"
            id="captain_name"
            aria-describedby="my-helper-text"
            value={formDa.captain_name}
            onChange={handleInputChange2} required
          />
        </FormControl>
        
        <FormControl>
          <InputLabel htmlFor="port_name">Licence Id</InputLabel>
          <Input
            name="licence_id"
            id="licence-id"
            aria-describedby="my-helper-text"
            value={formDa.licence_id}
            onChange={handleInputChange2} required
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="ph_no">Phone</InputLabel>
          <Input
            name="ph_no"
            id="ph_no"
            aria-describedby="my-helper-text"
            value={formDa.ph_no}
            onChange={handleInputChange2} required
          />
        </FormControl>
        
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            name="email"
            id="email"
            aria-describedby="my-helper-text"
            value={formDa.email}
            onChange={handleInputChange2} required
          />
        </FormControl>
        <br/>
        <FormControl>
          <InputLabel htmlFor="address">Address</InputLabel>
          <Input
            name="address"
            id="address"
            aria-describedby="my-helper-text"
            value={formDa.address}
            onChange={handleInputChange2} required
          />
        </FormControl>
        <button type="submit" className="left-[71%]">
          Submit
        </button>
        <Snackbar open={opens} autoHideDuration={6000} onClose={handleCloses}>
        <Alert onClose={handleCloses} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
        </Snackbar>
        </form>
        </div>
        

</Card>
</Box>
<Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={() => setSnackbarOpen(false)}
              severity="success"
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
</Box>

    </div>
  )
}
