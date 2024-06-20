import React, { useEffect, useState } from "react";
import DehazeIcon from '@mui/icons-material/Dehaze';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { Box, IconButton, Link, Typography, useMediaQuery } from "@mui/material";
import { getCookie } from "cookies-next";

const Footer = () => {

    return (
        <Box sx={{
            display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 1
        }}>
            © 2024  All rights reserved by <Link href='https://takatech.com.vn/'>Takatech</Link>
        </Box>
    )
}
export default Footer;
