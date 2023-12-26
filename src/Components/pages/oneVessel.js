
import React, { useEffect, useState,useRef  } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Navbar from "../global/navbar";
import Sidenav from "../Sidenav";
import Input from '@mui/material/Input';
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MuiAlert from "@mui/material/Alert";

export default function OneVessel() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    vessel_name: "",
    captain_name: "",
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/vesselReg/${id}`);
      const data = await res.json();
      console.log(data.getvesselReg);
      // Update the formData state with the fetched values
      setFormData({
        vessel_name: data.getvesselReg.vessel_name,
        captain_name: data.getvesselReg.captain_name,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const obj = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const res = await fetch("http://localhost:3000/api/vesselReg", obj); // Use the appropriate endpoint for updating vessel data
      const data = await res.json();

      console.log(data.msg);
    } catch (err) {
      console.error(err);
    }
  };

  //   return (
  //     <div style={{margin:"auto"}}>

  //       <form onSubmit={handleSubmit}>
  //         <FormControl>
  //           <InputLabel htmlFor="first_name">First name</InputLabel>
  //           <Input
  //             name="first_name"
  //             id="first_name"
  //             aria-describedby="my-helper-text"
  //             value={formData.first_name}
  //             onChange={handleInputChange}
  //           />
  //         </FormControl>
  //         <FormControl>
  //           <InputLabel htmlFor="last_name">Last name</InputLabel>
  //           <Input
  //             name="last_name"
  //             id="last_name"
  //             aria-describedby="my-helper-text"
  //             value={formData.last_name}
  //             onChange={handleInputChange}
  //           />
  //         </FormControl>
  //         <button type="submit" className="left-[71%]">
  //           Save Changes
  //         </button>
  //       </form>

  //     </div>
  //   );
  // }
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidenav/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Navbar />
          <div className=' flex gap-5 ml-10'>
        <Card sx={{ maxWidth: 345, marginTop:"40px", width:70+"vh",height:70+"vh"}}>
      <CardActionArea>
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className=' text-center'>
            Name
          </Typography>
          <CardMedia
          component="img"
          height="140"
          
        />
          <Typography variant="body2" color="text.secondary">
            
          </Typography>
        </CardContent>
      </CardActionArea>
      </Card>
      <Card sx={{ marginTop:"40px", width:90+"vh",height:50+"vh"}}>
      <CardActionArea>
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className=' text-center'>
            Name
          </Typography>
          <CardMedia
          component="img"
          height="140"
          
        />
          <Typography variant="body2" color="text.secondary">
            
          </Typography>
        </CardContent>
      </CardActionArea>
      </Card>
      </div>
      </Box>
      </Box>
</div>
      
  );
}
