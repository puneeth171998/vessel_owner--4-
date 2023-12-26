// import React from "react";
// import Sidenav from "../Sidenav";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Grid from "@mui/material/Grid";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
// import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import Navbar from "../global/navbar";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import { styled } from "@mui/material/styles";
// import { Icon } from "leaflet";



// export default function Vessels() {
//   const customIcon = new Icon({
//     iconUrl: require ("../images/mark.png"),
//     iconSize: [38,38]
//   })
//   const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: "#1486f7",
//       color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//     },
//   }));

//   return (
//     <>
//       <Box sx={{ display: "flex" }}>
//         <Sidenav />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Navbar/>
//           <h1 className=" text-2xl font-semibold p-2">VESSELS</h1>

//           <Grid item xs={4} className=" p-4 grid gap-4">
//             <PopupState variant="popover" popupId="demo-popup-menu">
//               {(popupState) => (
//                 <React.Fragment>
//                   <Button className=" w-24" variant="contained" {...bindTrigger(popupState)}>
//                     <FilterAltIcon /> Filter
//                   </Button>
//                   <Menu {...bindMenu(popupState)}>
//                     <MenuItem onClick={popupState.close}>All Vessels</MenuItem>
//                     <MenuItem onClick={popupState.close}>Vessel</MenuItem>
//                   </Menu>
//                 </React.Fragment>
//               )}
//             </PopupState>

//             <Card sx={{ height: 60 + "vh" }}>
//               <CardContent>
//               <MapContainer
//                   style={{ height: "100vh" }}
//                   center={[12.884019, 74.821096]}
//                   zoom={12}
//                   scrollWheelZoom={true}
//                 >
//                   <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  
//                   />
//                   <Marker position={[12.884019, 74.821096]} icon={customIcon}>
//                     <Popup>
//                       Vessel 1
//                     </Popup>
//                   </Marker>
//                 </MapContainer>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Box>
//       </Box>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import { Icon } from "leaflet"

export default function Vessels(){
  const [coordinates, setCoordinates] = useState([]);

  
  const customIcon = new Icon({
        iconUrl: require ("../images/navigation.png"),
        iconSize: [38,38]
      })

    

      const [geoData, setGeoData] = useState(null);


      console.log(coordinates)
    
      // useEffect(() => {
       
      //   fetchData();
      // }, []); 
    
      // const fetchData = async () => {
      //   try {
      //     const res = await fetch(`http://localhost:3000/api/vesselReg`);
      //     const data = await res.json();
      //     console.log(data.newReg)
      //     // Update the geoData state with the fetched values
      //     setGeoData(data.newReg);
          
      //   } catch (error) {
      //     console.error(error);
      //   }
      // };
      const [ownerId, setOwnerId] = useState("");
      const [ownerVessels, setOwnerVessel] = useState([]);
      
      const token = JSON.parse(localStorage.getItem("accessToken"));
      console.log(token);
    
      useEffect(() => {
        fetchProfile();
      }, [token]);
    
      useEffect(() => {
        fetchOwnerVessel();
      }, [ownerId]);
    
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
    
      const fetchOwnerVessel = () => {
        try {
          fetch("http://localhost:3000/api/vesselReg", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              const ownerVessels = data.newReg.filter((item) => {
                return item.vessel_owner == ownerId;
              });
              setOwnerVessel(ownerVessels);
              // setGeoData(data.newReg);
            });
        } catch (error) {
          console.log(error);
        }
      };
    
      console.log(ownerVessels);
    

  return (
    <MapContainer center={[12.952036, 80.358020]} zoom={3} style={{ height: '100vh', width: '100%' }}>
      <TileLayer  
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {ownerVessels?.map(coord => (
        <Marker position={[coord?.latitude,coord?.longitude]} key={`${coord?.latitude}-${coord?.longitude}`} icon={customIcon}>
          <Popup className=' min-w-fits'>
            <div className =' font-bold text-center'>
            Vessel Name: {coord?.vessel_name}</div>
            <div className='p-2'>
            Latitude:{coord?.latitude}
            <br></br>
            Longitude:{coord?.longitude}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}


