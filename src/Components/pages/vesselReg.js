// import React from "react";
// import { useEffect, useState } from "react"; 
// import Box from "@mui/material/Box";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import Input from "@mui/material/Input";
// import { useNavigate } from "react-router-dom";
// import NativeSelect from "@mui/material/NativeSelect";
// import { Snackbar } from "@mui/material";
// import MuiAlert from "@mui/material/Alert";

// export default function VesselReg() {
//   const [value, setValue] = React.useState(0);
//   const nav= useNavigate()
// const [snackbarOpen, setSnackbarOpen] = useState(false);
// const [snackbarMessage, setSnackbarMessage] = useState("");
// const token = JSON.parse(localStorage.getItem("accessToken"));
// const [ownerId, setOwnerId] = useState("");
// const initialFormData = {
//   vessel_name:"",
//   port_name:"",
//   UserId:"",
//   captain_name:"",
//   MMSI:"",
//   vessel_type:"",
// };
// const [formData, setFormData] = useState(initialFormData);
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, [token]);
//   const fetchProfile = () => {
//     try {
//       fetch("http://localhost:3000/api/ownerprofile", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => setOwnerId(data?.user._id));
      
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // console.log(ownerId)
    

 

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const obj = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     };

//     try {
//       const res = await fetch("http://localhost:3000/api/vesselReg", obj);
//       const data = await res.json();
//       console.log(data.msg);
//       setSnackbarMessage(data.msg);
//       setSnackbarOpen(true); // Show Snackbar
//       setFormData(initialFormData);
//       nav("/vesseldetails")
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,vessel_owner:ownerId,
//       [name]: value,
//     }));
//   };

//   return (
//     <div>
//       {/* <Box sx={{ display: "flex" }}> */}
//       {/* <Sidenav /> */}
//       {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}> */}
//       {/* <Navbar /> */}
//       {/* <Card style={{width:"60%", margin:"auto", marginTop:"10px"}}> */}

//       <form onSubmit={handleSubmit} style={{ justifyContent: "center" }}>
//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             p: 1,
//             m: 1,
//             gap: 2,
//             bgcolor: "background.paper",
//             maxWidth: 600,
//             borderRadius: 1,
//           }}
//         >
//           <div>
//             <FormControl>
//               <InputLabel htmlFor="vessel_name">Vessel Name</InputLabel>
//               <Input
//                 name="vessel_name"
//                 id="vessel_name"
//                 aria-describedby="my-helper-text"
//                 value={formData.vessel_name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </FormControl>
//           </div>
//           <br />
//           <div>
//             <FormControl>
//               <InputLabel htmlFor="port_name">Port Name</InputLabel>
//               <Input
//                 name="port_name"
//                 id="port_name"
//                 aria-describedby="my-helper-text"
//                 value={formData.port_name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </FormControl>
//           </div>
//           <div>
//             <FormControl>
//               <InputLabel htmlFor="UserID">User ID</InputLabel>
//               <Input
//                 name="UserID"
//                 id="UserID"
//                 aria-describedby="my-helper-text"
//                 value={formData.UserID}
//                 onChange={handleInputChange}
//                 required
//               />
//             </FormControl>
//           </div>
//           <br />
//           <FormControl>
//             <InputLabel htmlFor="captain_name" variant="standard">
//               Captain Name
//             </InputLabel>
//             <NativeSelect
//               id="captain_name"
//               name="captain_name"
//               // value={formData.captain_name}
//               onChange={handleInputChange}
//               required
//             >
//               <option value={"Puneeth"}>Puneeth</option>
//               <option value={"Rohithgowda"}>Rohith gowda</option>
//               <option value={"Nandisha"}>Nandhisha</option>
//             </NativeSelect>
//           </FormControl>
//           <br />

//           <FormControl>
//             <InputLabel htmlFor="MMSI">MMSI</InputLabel>
//             <Input
//               name="MMSI"
//               id="MMSI"
//               aria-describedby="my-helper-text"
//               value={formData.MMSI}
//               onChange={handleInputChange}
//               required
//             />
//           </FormControl>
//           <br />

//           <FormControl>
//             <InputLabel htmlFor="vessel_type">Vessel Type</InputLabel>
//             <Input
//               name="vessel_type"
//               id="vessel_type"
//               aria-describedby="my-helper-text"
//               value={formData.vessel_type}
//               onChange={handleInputChange}
//               required
//             />
//           </FormControl>
//           <br />
//           <button type="submit" className="left-[71%]">
//             Submit
//           </button>
//           <Snackbar
//             open={snackbarOpen}
//             autoHideDuration={6000}
//             onClose={() => setSnackbarOpen(false)}
//           >
//             <MuiAlert
//               elevation={6}
//               variant="filled"
//               onClose={() => setSnackbarOpen(false)}
//               severity="success"
//             >
//               {snackbarMessage}
//             </MuiAlert>
//           </Snackbar>
//         </Box>
//       </form>

//       {/* </Card> */}
//       {/* </Box> */}
//       {/* </Box> */}
//     </div>
//   );
// }

import React from "react";
import Sidenav from "../Sidenav";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Navbar from "../global/navbar";
import Card from "@mui/material/Card";
import { useState, useEffect} from "react";
import NativeSelect from "@mui/material/NativeSelect";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Select from "@mui/material/Select"
import MenuItem from '@mui/material/MenuItem';
import { useParams } from "react-router-dom";

export default function VesselReg() {
  const id = useParams().id;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const token = JSON.parse(localStorage.getItem("accessToken"));
const [ownerId, setOwnerId] = useState("");

  const initialFormData = {
    vessel_name: "",
    port_name: "",
    // vessel_owner: "",
    UserId:"",
    captain_name: "",
    MMSI: "",
    vessel_type: "",
  };
  const [formData, setFormData] = useState(initialFormData);
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
    
  const handleSubmit = async (event) => {
    event.preventDefault();

    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
   
        
    try {
      const res = await fetch("http://localhost:3000/api/vesselReg", obj);
      const data = await res.json();
      console.log(data.msg);
      setSnackbarMessage(data.msg);
      setSnackbarOpen(true); // Show Snackbar
      setFormData(initialFormData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,vessel_owner:ownerId,
      [name]: value,
    }));
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/captain`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      const captainDetails = responseData.captain.filter((item) => {
        return item.vessel_owner === id;
      });

      console.log(id);
      console.log(responseData.captain);
      console.log('Filtered Data:', captainDetails);
      setData(captainDetails);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
      // const res = await fetch("http://localhost:3000/api/captain");
      // const getconn = await res.json();
      // 

      // })
      // setCaptain(getconn.captain);
    

    // .then((res) => res.json())
    // .then((data) => {
    //   const ownerDetails = data.newReg.filter((item) => {
    //     return item.vessel_owner==id;
    //   });
    //   console.log(id)
    //   console.log(data.newReg)
    //   console.log("Filtered Data:", ownerDetails);
    //   setData(ownerDetails);
    // });


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
              <InputLabel htmlFor="UserID">User ID</InputLabel>
              <Input
                name="UserID"
                id="UserID"
                aria-describedby="my-helper-text"
                value={formData.UserID}
                onChange={handleInputChange}
                required
              />
            </FormControl>
          </div>
          <br />
          <FormControl>
            <InputLabel htmlFor="captain_name" variant="standard"
            name="captain"
            id="captain"
            aria-describedby="my-helper-text"
            value={formData.captain}
            onChange={handleInputChange}
            required>
              Captain Name
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              sx={{width:"170px"}}
              name="captain_name"
              // value={formData.captain_name}
              onChange={handleInputChange}
              required
            >
              {captainDetails?.map((compget) => (
              <MenuItem value={compget.captain_name}>
                console.log(data)
                {compget.captain_name}
              </MenuItem>
            ))}
            </Select>
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
