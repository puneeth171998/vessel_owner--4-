import React from "react";
import Sidenav from "../Sidenav";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "../global/navbar";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; 
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function CaptainDetails() {
  let serialNumber = 1; 
  const [open, setOpen] = React.useState(false);

  // const [data,setData]= useState([])
  // useEffect(()=>{
  //     getData()
  // },[])
  // const getData=()=>{
  //   fetch("http://localhost:3000/api/captain")
  //       .then((res)=>res.json())
  //       .then((data)=>setData(data.captain))
  // }
  const [ownerId, setOwnerId] = useState("");
  const [ownerCaptains, setOwnerVessel] = useState([]);
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
  console.log(ownerId)
  const fetchOwnerVessel = () => {
    try {
      fetch("http://localhost:3000/api/captain", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const ownerCaptains = data.captain.filter((item) => {
            return item.vessel_owner == ownerId;
          });
          setOwnerVessel(ownerCaptains);
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(ownerCaptains);
  const navigate= useNavigate();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1486f7",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  // const deleteHan=async(id)=>{
   
  //   fetch(`http://localhost:3000/api/captain/${id}`,{method:'DELETE'})
  //   .then((res)=>res.json())
  //   getData()
  // }
  const deleteHan = async (id) => {
    console.log("first");
    try {
      await fetch(`http://localhost:3000/api/captain/${id}`, {
        method: "DELETE",
      });
      // getData();
      handleClose();
      navigate("/captainDetails")
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Navbar />
          <h1 className=" text-2xl font-semibold p-2">CAPTAIN DETAILS</h1>
          <Button variant="contained" style={{marginBottom:"10px"}} onClick={()=>{navigate("/captainReg")}}>Create Captain</Button>
          <TableContainer component={Paper}>
            <Table sx={{ Width: 200 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Sl. No</StyledTableCell>
                  <StyledTableCell>Captain Name</StyledTableCell>
                  <StyledTableCell>Licence</StyledTableCell>
                  <StyledTableCell>Phone</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {ownerCaptains.map((data) => (
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
              {serialNumber++}
              </StyledTableCell>
              <StyledTableCell >{data.captain_name}</StyledTableCell>
              <StyledTableCell>{data.licence_id}</StyledTableCell>
              <StyledTableCell>{data.ph_no}</StyledTableCell>
              <StyledTableCell>{data.email}</StyledTableCell>
              <StyledTableCell>{data.address}</StyledTableCell>
              <StyledTableCell style={{display:"flex",gap:"5px"}}><Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClickOpen}
                        >
                          <EditIcon onClick={()=>{navigate("/Edit_vessel")}}/></Button>
                          <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClickOpen}
                        >
                        <DeleteIcon></DeleteIcon>
                      </Button></StyledTableCell>
                      <Box>
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            style={{width:"35%", margin:"auto"}}
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"Are you sure to delete?"}
                            </DialogTitle>
                            <DialogContent>
                              {/* <DialogContentText id="alert-dialog-description">
                                Are you sure to delete the selected field? Once
                                you delete the field you will not be able to
                                retrieve it back.
                              </DialogContentText> */}
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose}>No</Button>
                              <Button
                                onClick={() => deleteHan(data._id)}
                                autoFocus
                              >
                                Yes
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </Box>
              </StyledTableRow>
               ))}
               </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
