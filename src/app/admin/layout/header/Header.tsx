import React, { useState } from "react";
import DehazeIcon from '@mui/icons-material/Dehaze';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { IconButton, Typography, useMediaQuery } from "@mui/material";
const Header = ({ hideMenu }: any) => {
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
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
                <img src="https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.6435-9/117990468_306368613757678_1398448180208998757_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF2rfTD-kxGDunhHJ6aYagNO-_jFrzqAN877-MWvOoA3wvmoSa8Hlvm0kYjQc6wHevoput_a9Op27skYww6h4n7&_nc_ohc=t-3vGvZgZ_8Ab4hyLDZ&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfDv064Cei6bCv64mAIm5fdsYUoM_qE-1xaz6yzJDkkEVg&oe=6645DED4" alt=""
                    style={{ width: 49, borderRadius: 50 }}
                />
                <div style={{ marginLeft: 15 }}>
                    <Typography sx={{ fontWeight: "bold" }}>Lê Hoài Nam</Typography>
                    <Typography >admin</Typography>

                </div>
            </div>}
            {!lgUp && <div style={{ paddingRight: 20, display: "flex" }} >
                <Typography>Hello, <b>admin</b></Typography>
                <ArrowDropDownRoundedIcon />
            </div>}
        </div>
    )
}
export default Header;
