import React from "react";
import Sidenav from "../Sidenav";
import Box from "@mui/material/Box";
import Navbar from '../global/navbar'

export default function Settings() {
  return (
    <>
    <Box sx={{ display: "flex" }}>
      <Sidenav />
     
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Navbar/>
      <h1 className=" text-3xl font-bold p-2">Settings</h1>
      </Box>
    </Box>
    </>
  );
}
