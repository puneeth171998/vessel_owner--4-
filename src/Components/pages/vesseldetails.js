import React from "react";
import Sidenav from "../Sidenav";
import Box from "@mui/material/Box";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Link } from "react-router-dom";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Navbar from "../global/navbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Sea from "../images/sea-navigation.png";
import Port from "../images/port.png";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Create from "./vesselReg";
import Edit from "./editVessel";

export default function Vesseldetails() {
  let serialNumber = 1;

  //This is for the delete button option to open the dailog and closing
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //This is for the create button option to open the dailog and closing
  const [opens, setOpens] = React.useState(false);

  const handleClickOpens = () => {
    setOpens(true);
  };

  const handleCloses = () => {
    setOpens(false);
  };
  //This is for the edit button option to open the dailog and closing
  const [opened, setOpened] = React.useState(false);

  const handleClickOpened = () => {
    setOpened(true);
  };

  const handleClosed = () => {
    setOpened(false);
  };

  const deleteHan = async (id) => {
    //This is the delete functionality

    try {
      await fetch(`http://localhost:3000/api/vesselReg/${id}`, {
        method: "DELETE",
      });

      handleClose();
      navigate("/vesseldetails")
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [vessels, setVessels] = useState([]);
  const [ownerId, setOwnerId] = useState("");
  const [ownerVessels, setOwnerVessel] = useState([]);
  const navigate = useNavigate();
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
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(ownerVessels);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Navbar />
          <h1 className=" text-2xl font-semibold p-2">VESSEL DETAILS</h1>

          <br />
          <Grid container spacing={2}>
            <Grid item xs={8}>
             
              <Stack spacing={2} direction="row">
                <Card
                  style={{
                    width: "200px",
                    height: "150px",
                    backgroundColor: "rgb(241, 242, 244)",
                    border: "3px",
                    borderStyle: "solid",
                    borderColor: "orange",
                  }}
                >
                  <CardContent>
                    <div>
                      <img
                        src={Port}
                        alt="Vessel"
                        style={{ width: "60px", margin: "auto" }}
                      ></img>
                      <Typography
                        className=" text-center"
                        gutterBottom
                        variant="h7"
                        component="div"
                      >
                        Total No. Of Vessels
                      </Typography>
                    </div>

                    <h1 className=" text-center text-2xl font-semibold ">3</h1>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: "200px",
                    height: "150px",
                    backgroundColor: "rgb(241, 242, 244)",
                    border: "3px",
                    borderStyle: "solid",
                    borderColor: "blue",
                  }}
                >
                  <CardContent>
                    <div>
                      <img
                        src={Sea}
                        alt="Vessel"
                        style={{ width: "60px", margin: "auto" }}
                      ></img>
                      <Typography
                        className=" text-center"
                        gutterBottom
                        variant="h7"
                        component="div"
                      >
                        Vessels in Movement
                      </Typography>
                    </div>

                    <h1 className=" text-center text-2xl font-semibold ">1</h1>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
          <br/>
          <Button
                variant="contained"
                style={{ marginBottom: "10px" ,padding:"5px"}}
                onClick={handleClickOpens}
              >
                Create Vessel
              </Button>
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ Width: 200 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Sl. No</StyledTableCell>
                  <StyledTableCell>Vessel Name</StyledTableCell>
                  <StyledTableCell>Vessel Owner</StyledTableCell>
                  <StyledTableCell>Captain Name</StyledTableCell>
                  <StyledTableCell>Port Name</StyledTableCell>
                  <StyledTableCell>MMSI</StyledTableCell>
                  <StyledTableCell>Vessel Type</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ownerVessels.map((data) => {
                  return (
                    <StyledTableRow key={data._id}>
                      <StyledTableCell component="th" scope="row">
                        {serialNumber++}
                      </StyledTableCell>
                      <StyledTableCell>{data.vessel_name}</StyledTableCell>
                      <StyledTableCell>{data.vessel_owner}</StyledTableCell>
                      <StyledTableCell>{data.captain_name}</StyledTableCell>
                      <StyledTableCell>{data.port_name}</StyledTableCell>
                      <StyledTableCell>{data.MMSI}</StyledTableCell>
                      <StyledTableCell>{data.vessel_type}</StyledTableCell>

                      <StyledTableCell style={{ display: "flex", gap: "7px" }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handleClickOpened}
                        >
                          <EditIcon></EditIcon>
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handleClickOpen}
                        >
                          <DeleteIcon></DeleteIcon>
                        </Button>
                        <Button>
                          <Link to={`/oneVessel/${data._id}`} />

                          <ArrowForwardIosIcon />
                        </Button>
                        <Box>
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            style={{ width: "35%", margin: "auto" }}
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
                          {/* This is for the creation of the vessels. */}
                          <Dialog
                            open={opens}
                            onClose={handleCloses}
                            style={{ marginLeft: "15%" }}
                          >
                            <DialogTitle>Create Vessel</DialogTitle>
                            <DialogContent>
                              <Create />
                            </DialogContent>
                          </Dialog>
                          {/* This is for the edit vessels.                 */}
                          <Dialog
                            open={opened}
                            onClose={handleClosed}
                            style={{ marginLeft: "15%" }}
                          >
                            <DialogTitle>Edit Vessel</DialogTitle>
                            <DialogContent>
                              <Edit />
                            </DialogContent>
                          </Dialog>
                        </Box>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
