// Sidebar.js
import React, { useEffect, useState } from "react";
import SidebarItem from "./SideBarItem";
import menuItems from "./menuItem";
import { useMediaQuery } from "@mui/material";
const Sidebar = ({ hideMenu, setButtonClicked }: any) => {
    const [showText, setShowText] = useState(true);
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
    useEffect(() => {
        setShowText(!hideMenu);
    }, [hideMenu]);

    const handleMouseEnter = () => {
        if (hideMenu) {
            setShowText(true);
        }
    };

    const handleMouseLeave = () => {
        if (hideMenu) {
            setShowText(false);
        }
    };
    if (lgUp) {
        return (
            <div style={{
                width: showText ? 250 : 73,
                left: 20,
                top: 16,
                position: 'fixed',
                zIndex: 999,
                borderRight: "1px solid #e0e0e0",
                transition: "width 0.3s ease-in-out",
                backgroundColor: "white",
                boxShadow: " 2px 2px 4px rgba(0, 0, 0, 0.2)",
                height: 760,
                borderRadius: 10,
            }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {showText ?
                    <img src="/images/logo/Logo.png" alt="" style={{ marginLeft: 10, marginTop: 20, height: 44 }} />
                    : <img src="/images/logo/Logo1.png" alt="" style={{ marginTop: 10, height: 52 }} />
                }

                <div style={{
                    marginTop: 30,
                    marginRight: 5,
                    height: 650,
                    paddingRight: 5,
                    overflow: "auto",
                    scrollbarWidth: "none",
                    scrollbarColor: "rgba(0, 0, 0, 0.1) transparent",
                }}>
                    {menuItems.map((item: any) => (
                        <SidebarItem key={item.id} label={item.label} items={item.items} showText={showText} />
                    ))}
                </div>

            </div >

        );

    }
    return (
        <div style={{
            position: 'fixed',
            width: 250,
            left: hideMenu ? 0 : -250,
            top: 0,
            bottom: 0,
            zIndex: 999,
            backgroundColor: '#fff',
            borderRight: "1px solid #e0e0e0",
            transition: "left 0.3s ease-in-out",

        }}>
            <img src="/images/logo/Logo.png" alt="" style={{ marginLeft: 10, marginTop: 20, height: 44 }} />

            <div style={{
                marginTop: 30, marginRight: 5,
                overflow: "auto",
                scrollbarWidth: "none",
                scrollbarColor: "rgba(0, 0, 0, 0.1) transparent",
            }}>
                {menuItems.map((item: any) => (
                    <SidebarItem key={item.id} label={item.label} items={item.items} showText={true} />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
