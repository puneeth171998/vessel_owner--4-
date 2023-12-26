import React from "react";
import Sidenav from "../Sidenav";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Stack from '@mui/material/Stack';
import Navbar from '../global/navbar'
import '../../dash.css';
import Image from '../images/temp2.png'
import Vessel from '../images/cargo-ship.png'
import Port from '../images/port.png'
import Sea from '../images/sea-navigation.png'
export default function dashboard() {
 
  return (
    <>
      <Box sx={{ display: "flex" }}>
     
        <Sidenav />
        
        <Box height={70} />
        
        <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Navbar/>
          <h1 className=" text-2xl font-semibold p-2">DASHBOARD</h1>
          <Grid container spacing={2}>
            <Grid item xs={8}>
            <Stack spacing={2} direction="row">
              <Card sx={{ width:"200px",height:"150px",backgroundColor:"rgb(241, 242, 244)",border: "3px", borderStyle: "solid", borderColor: "red" }}>
                <CardContent>
                  <div> 
                  <img src={Vessel} alt="Vessel" style={{ width:"60px", margin: "auto"}}></img>
                  <Typography className=" text-center" gutterBottom variant="h7" component="div">
                    Total Vessels
                  </Typography>
                  </div>
                  <h1 className=" text-center text-2xl font-bold ">3</h1> 
                
                </CardContent>
              </Card>
              <Card sx={{ width:"200px",height:"150px",backgroundColor:"rgb(241, 242, 244)",border: "3px", borderStyle: "solid", borderColor: "purple" }}>
                <CardContent>
                  <div>
                  <img src={Port} alt="Vessel" style={{ width:"60px", margin: "auto"}}></img>
                  <Typography className=" text-center" gutterBottom variant="h7" component="div">
                    
                    Total Vessels In Port
                  </Typography>
                  </div>
                  
                   <h1 className=" text-center text-2xl font-bold ">2</h1> 
                  
                </CardContent>
              </Card>
              <Card sx={{ width:"200px",height:"150px",backgroundColor:"rgb(241, 242, 244)",border: "3px", borderStyle: "solid", borderColor: "blue"}}>
                <CardContent>
                  <div>
                  <img src={Sea} alt="Vessel" style={{ width:"60px", margin: "auto"}}></img>
                  <Typography className=" text-center" gutterBottom variant="h7" component="div">
                    Total Vessels In Sea
                  </Typography>
                  </div>
                  
                   <h1 className=" text-center text-2xl font-bold ">1</h1> 
                  
                </CardContent>
              </Card>
              </Stack>
             
            </Grid>
            
            <Grid item xs={4}>
            
            </Grid>
            <Grid item xs={8}>
           
                  <div>
                  <img src={Image} alt="weather" className=" rounded-lg"></img>
                  </div>
                
              </Grid>
             
          </Grid>
        </Box>
      </Box>
    </>
  );
}
