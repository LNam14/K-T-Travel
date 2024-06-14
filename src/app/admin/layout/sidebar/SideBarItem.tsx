// SidebarItem.js
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Box, useMediaQuery } from "@mui/material";

const SidebarItem = ({ label, items, showText }: any) => {
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
    const isBrowser = typeof window !== 'undefined';
    const pathName: any = isBrowser ? window.location.pathname : '';
    const lastPart = pathName.substring(pathName.lastIndexOf('/') + 1);
    const [selectedItem, setSelectedItem] = useState(lastPart);

    if (lgUp) {
        return (
            <label style={{
                fontFamily: "Roboto, Helvetica, Arial, sans-serif", fontSize: 14, fontWeight: "bold", color: "#291868",
                alignItems: showText ? "" : "center", display: 'flex', flexDirection: "column",
            }}>
                <span style={{ marginLeft: showText ? 10 : 0, marginTop: 20 }}>{showText ? label : "..."}</span>
                {items.map((item: any, index: any) => (
                    <Link key={index} href={item.href} style={{ textDecoration: "none" }}>
                        <span
                            onClick={() => {
                                setSelectedItem(item.href)
                            }}
                            style={{
                                backgroundColor: selectedItem === item.href ? "#E5F3FB" : "#fff",
                                color: "#291868", height: 50,
                                borderTopRightRadius: 30,
                                borderBottomRightRadius: 30,
                                display: 'flex',
                                fontWeight: "normal",
                                alignItems: 'center', textDecoration: "none",
                                transition: "background-color 0.3s",

                            }}>
                            <item.icon sx={{ fontSize: 32, marginLeft: 1, marginRight: 1 }} />{showText && <span>{item.title}</span>}
                        </span>
                    </Link>
                ))
                }
            </label >
        );
    }
    return (
        <label style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif", fontSize: 14, fontWeight: "bold", marginLeft: 10, color: "#291868" }}>
            {label}
            {items.map((item: any, index: any) => (
                <Link key={item.id} href={item.href} style={{ textDecoration: "none" }}>
                    <Box onClick={() => setSelectedItem(index)}
                        style={{
                            backgroundColor: selectedItem === index ? "#E5F3FB" : "#fff",
                            color: "#291868", height: 50, marginTop: 1, marginRight: 1, marginBottom: 1, paddingLeft: 5,
                            borderTopRightRadius: 30,
                            borderBottomRightRadius: 30,
                            display: 'flex', fontWeight: "normal",
                            alignItems: 'center'
                        }}
                    >
                        <item.icon sx={{ fontSize: 32, marginLeft: 1, marginRight: 1 }} />{showText && <span>{item.title}</span>}
                    </Box>
                </Link>
            ))}
        </label>
    );
}


export default SidebarItem;
