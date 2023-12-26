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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Sea from '../images/sea-navigation.png'
import Port from '../images/port.png'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Vesseldetails() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1486f7",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Navbar />
          <h1 className=" text-2xl font-semibold p-2">NOTIFICATIONS</h1>
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ Width: 200 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Sender</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Time</StyledTableCell>
                  <StyledTableCell>Message</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
                <StyledTableCell>Corvette</StyledTableCell>
                <StyledTableCell>2023-02-03</StyledTableCell>
                <StyledTableCell> 01:23:45</StyledTableCell>
                <StyledTableCell>Fuel low</StyledTableCell>
               
                <StyledTableCell style={{display:"flex"}}><DeleteIcon></DeleteIcon></StyledTableCell>
                
                
              </TableBody>
              <TableBody>
               
                <StyledTableCell>Frigate</StyledTableCell>
                <StyledTableCell>2023-05-23</StyledTableCell>
                <StyledTableCell> 05:30:00</StyledTableCell>
                <StyledTableCell>Help! Vessel crashed</StyledTableCell>
                
                <StyledTableCell style={{display:"flex"}}><DeleteIcon></DeleteIcon></StyledTableCell>
              </TableBody>
            </Table>
          </TableContainer>
              
          </Box>
          </Box>
          </>
  )
  }