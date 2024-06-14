import React, { useEffect, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import {
    Modal,
    Box,
    Button,
} from "@mui/material";
import "react-quill/dist/quill.snow.css";
import { useAppDispatch } from "@/app/redux-store/hook";

interface LooseObject {
    [key: string]: any;
}

const ViewGT = ({
    open,
    closeForm,
    customer
}: {
    open: boolean;
    closeForm: any;
    customer: any;
}
) => {
    const dispatch = useAppDispatch()
    return (
        <Modal open={open} onClose={closeForm}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "50%",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: 2,
                    overflowY: "auto",
                    scrollbarColor: "#edeef0",
                    scrollbarWidth: "none",
                    maxHeight: 700,
                    fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                }}
            >
                <div style={{
                    borderBottom: "1px solid #edeef0", fontSize: 30, display: "flex",
                    justifyContent: "center", paddingTop: 40, backgroundColor: "#4287f5", fontWeight: "bold", color: "white",
                }}>Tour</div>
                <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 50, paddingTop: 20 }}>
                    <div style={{ marginBottom: 10, color: "black", fontWeight: "bold" }}>
                        {customer.tour_option} &gt;&gt; {customer.area}
                    </div>
                    <div>
                        <div style={{ overflow: "hidden", transition: "height ease-in-out", borderRadius: 10, marginTop: 5 }}>
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", flexDirection: "column", width: "47%" }}>
                                        <span style={{ fontSize: 16, fontWeight: "bold" }}>Title</span>
                                        <input type="text"
                                            style={{ height: 30, border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}

                                        />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", width: "47%" }}>
                                        <span style={{ fontSize: 16, fontWeight: "bold" }}>Slot</span>
                                        <input type="number" style={{ height: 30, border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
                                    <div style={{ display: "flex", flexDirection: "column", width: "47%" }}>
                                        <span style={{ fontSize: 16, fontWeight: "bold" }}>Điểm Đi</span>
                                        <input type="text" style={{ height: 30, border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", width: "47%" }}>
                                        <span style={{ fontSize: 16, fontWeight: "bold" }}>Điểm Đến</span>
                                        <input type="text" style={{ height: 30, border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
                                    <div style={{ display: "flex", flexDirection: "column", width: "47%" }}>
                                        <span style={{ fontSize: 16, fontWeight: "bold" }}>Ngày Đi</span>
                                        <input type="date" style={{ height: 30, border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", width: "47%" }}>
                                        <span style={{ fontSize: 16, fontWeight: "bold" }}>Ngày Về</span>
                                        <input type="date" style={{ height: 30, border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}
                                        />
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                        <Button
                            variant="contained"


                        >
                            Xác nhận
                        </Button>
                        <Button variant="contained">Đóng</Button>
                    </div>
                </div>
            </Box >

        </Modal >
    )
};
export default ViewGT;