import React from "react";
import Sidenav from "../Sidenav";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Navbar from "../global/navbar";
import Card from "@mui/material/Card";
import { useState } from "react";
import NativeSelect from "@mui/material/NativeSelect";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";

export default function VesselReg() {
  const { id } = useParams();   

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const initialFormData = {
    vessel_name: "",
    port_name: "",
    vessel_owner: "",
    captain_name: "",
    MMSI: "",
    vessel_type: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
   
    fetchData();
  }, [id]); 

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/vesselReg/${id}`);
      const data = await res.json();
      console.log(data.newReg)
      // Update the formData state with the fetched values
      setFormData({
        vessel_name: data.newReg.vessel_name,
        port_name: data.newReg.port_name,
        vessel_owner: data.newReg.vessel_owner,
        captain_name: data.newReg.captain_name,
        MMSI: data.newReg.MMSI,
        vessel_type: data.newReg.vessel_type,
        
      });
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const obj = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    try {
      const res = await fetch('http://localhost:3000/api/vesselReg', obj); // Use the appropriate endpoint for updating vessel data
      const data = await res.json();
     
      console.log(data.msg);
    } catch (err) {
      console.error(err);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      {/* <Box sx={{ display: "flex" }}> */}
      {/* <Sidenav /> */}
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}> */}
      {/* <Navbar /> */}
      {/* <Card style={{width:"60%", margin:"auto", marginTop:"10px"}}> */}

      <form onSubmit={handleSubmit} style={{ justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            p: 1,
            m: 1,
            gap: 2,
            bgcolor: "background.paper",
            maxWidth: 600,
            borderRadius: 1,
          }}
        >
          <div>
            <FormControl>
              <InputLabel htmlFor="vessel_name">Vessel Name</InputLabel>
              <Input
                name="vessel_name"
                id="vessel_name"
                aria-describedby="my-helper-text"
                value={formData.vessel_name}
                onChange={handleInputChange}
                required
              />
            </FormControl>
          </div>
          <br />
          <div>
            <FormControl>
              <InputLabel htmlFor="port_name">Port Name</InputLabel>
              <Input
                name="port_name"
                id="port_name"
                aria-describedby="my-helper-text"
                value={formData.port_name}
                onChange={handleInputChange}
                required
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <InputLabel htmlFor="vessel_owner">Vessel Owner</InputLabel>
              <Input
                name="vessel_owner"
                id="vessel_owner"
                aria-describedby="my-helper-text"
                value={formData.vessel_owner}
                onChange={handleInputChange}
                required
              />
            </FormControl>
          </div>
          <br />
          <FormControl>
            <InputLabel htmlFor="captain_name" variant="standard">
              Captain Name
            </InputLabel>
            <NativeSelect
              id="captain_name"
              name="captain_name"
              // value={formData.captain_name}
              onChange={handleInputChange}
              required
            >
              <option value={"Puneeth"}>Puneeth</option>
              <option value={"Rohithgowda"}>Rohith gowda</option>
              <option value={"Nandisha"}>Nandhisha</option>
            </NativeSelect>
          </FormControl>
          <br />

          <FormControl>
            <InputLabel htmlFor="MMSI">MMSI</InputLabel>
            <Input
              name="MMSI"
              id="MMSI"
              aria-describedby="my-helper-text"
              value={formData.MMSI}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <br />

          <FormControl>
            <InputLabel htmlFor="vessel_type">Vessel Type</InputLabel>
            <Input
              name="vessel_type"
              id="vessel_type"
              aria-describedby="my-helper-text"
              value={formData.vessel_type}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <br />
          <button type="submit" className="left-[71%]">
            Submit
          </button>
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
      </form>

      {/* </Card> */}
      {/* </Box> */}
      {/* </Box> */}
    </div>
  );
}
