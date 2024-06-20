import React, { useEffect, useState } from "react";
import DehazeIcon from '@mui/icons-material/Dehaze';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { IconButton, Typography, useMediaQuery } from "@mui/material";
import { getCookie } from "cookies-next";

const Header = ({ hideMenu }: any) => {
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const storedUsername: any = getCookie("username");
        setUsername(storedUsername);
        console.log("username", storedUsername);
    }, []);
    return (
        <div style={{
            height: 70, backgroundColor: "white",
            boxShadow: " 2px 2px 4px rgba(0, 0, 0, 0.2)", borderRadius: 10, width: "100%",
            display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
            <div>
                <IconButton onClick={hideMenu} style={{
                    marginLeft: 20
                }}>
                    <DehazeIcon sx={{ fontSize: 24 }} />
                </IconButton>
            </div>
            {lgUp && <div style={{ paddingRight: 20, display: "flex" }} >
                <Typography>Xin chào, <b>{username}</b></Typography>
            </div>}
            {!lgUp && <div style={{ paddingRight: 20, display: "flex" }} >
                <Typography>Hello, <b>{username}</b></Typography>
            </div>}
        </div>
    )
}
export default Header;
