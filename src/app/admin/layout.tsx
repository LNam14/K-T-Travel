"use client";
import { styled, Container, Box, useMediaQuery } from "@mui/material";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux-store/hook";
import Header from "./layout/header/Header";
import Sidebar from "./layout/sidebar/Sidebar";
const MainWrapper = styled("div")(() => ({
    display: "flex",
    width: "100%",
    backgroundColor: "#F0F5F9",
    position: 'fixed',
    zIndex: 1,
    top: 0,
    left: 0,
    bottom: 0,
}));

const PageWrapper = styled("div")(() => ({
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    zIndex: 1,
    top: 0,
}));

interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    const token: any = getCookie("token");

    useEffect(() => {
        const asyncCall = async () => {
            if (!token) {
                window.location.href = "/";
            }
        };

        asyncCall();
    }, [token]);

    const [buttonClicked, setButtonClicked] = useState(false);

    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
    if (lgUp) {
        const hideMenu = () => {
            setButtonClicked(prevState => !prevState);
        };
        if (!token) {
            return null;
        }
        return (

            <MainWrapper className="mainwrapper" sx={{ paddingLeft: 2, paddingTop: 2 }}>
                <link rel="icon" href="/images/logo/Logo1.png" />
                <Sidebar hideMenu={buttonClicked} setButtonClicked={setButtonClicked} />
                <PageWrapper className="page-wrapper">
                    <Box sx={{ width: "90%", paddingLeft: buttonClicked ? 33 : 43, transition: "padding-left 0.3s ease-in-out" }}>
                        <Header hideMenu={hideMenu} />
                        <Box sx={{ width: "100%", }}>
                            <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
                        </Box>
                    </Box>

                </PageWrapper>
            </MainWrapper>
        );
    }
    const hideMenu = () => {
        setButtonClicked(prevState => !prevState);
    };
    return (
        <MainWrapper className="mainwrapper" sx={{ paddingLeft: 2, paddingTop: 1 }}>
            <link rel="icon" href="/images/logo/Logo1.png" />
            <Sidebar hideMenu={buttonClicked} />
            <PageWrapper className="page-wrapper">
                <Box sx={{ width: "93.5%" }}>
                    <Header hideMenu={hideMenu} />
                    <Box sx={{ width: "100%", }}>
                        <Box sx={{ minHeight: "calc(100vh - 170px)" }} onClick={() => { setButtonClicked(false) }}>{children}</Box>
                    </Box>
                </Box>
            </PageWrapper>
        </MainWrapper>
    );
}
