import React, { useEffect, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import {
    Modal,
    Box,
    Button,
} from "@mui/material";
import "react-quill/dist/quill.snow.css";
import { useAppDispatch } from "@/app/redux-store/hook";
import { getGroupTourAsync, updateGroupTourAsync } from "@/app/redux-store/group_tour/slice";

interface LooseObject {
    [key: string]: any;
}

const ViewGT = ({
    open,
    closeForm,
    travel
}: {
    open: boolean;
    closeForm: any;
    travel: any;
}
) => {
    const dispatch = useAppDispatch()
    const handleUpdate = async (id: number) => {
        await dispatch(updateGroupTourAsync({ id }))
        await dispatch(getGroupTourAsync())
    }
    return (
        <Modal open={open} onClose={closeForm}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "40%",
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
                    borderBottom: "1px solid #edeef0", fontSize: 26, display: "flex",
                    justifyContent: "center", paddingTop: 10, backgroundColor: "#4287f5", fontWeight: "bold", color: "white",
                }}>Du Lịch Đoàn</div>
                <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 50, paddingTop: 20 }}>
                    <div style={{ fontSize: 16, display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <div>
                                <span style={{ fontWeight: "bold", }}>Tên khách hàng:</span> {travel.name}
                            </div>
                            <div>
                                <span style={{ fontWeight: "bold", }}>Email:</span> {travel.email}
                            </div>
                            <div>
                                <span style={{ fontWeight: "bold", }}>Công ty:</span> {travel.company}
                            </div>
                            <div>
                                <span style={{ fontWeight: "bold", }}>Ngày đi:</span> {travel.start_date}
                            </div>
                            <div>
                                <span style={{ fontSize: 16, fontWeight: "bold" }}>Ghi chú:</span> {travel.note}
                            </div>
                        </div>
                        <div>
                            <div>
                                <span style={{ fontWeight: "bold", }}>Số điện thoại:</span> {travel.phone}
                            </div>
                            <div>
                                <span style={{ fontWeight: "bold", }}>Địa chỉ:</span> {travel.address}
                            </div>
                            <div>
                                <span style={{ fontWeight: "bold", }}>Số người:</span> {travel.number_of_people}
                            </div>
                            <div>
                                <span style={{ fontWeight: "bold", }}>Điểm đến mong muốn:</span> {travel.location}
                            </div>
                        </div>
                    </div>


                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
                        <Button
                            variant="contained" style={{ backgroundColor: "#4287f5", width: "30%" }}
                            onClick={() => {
                                handleUpdate(travel.id)
                            }}
                        >
                            Đã tư vấn
                        </Button>
                        <Button variant="contained" style={{ backgroundColor: "#4287f5", width: "30%" }} onClick={closeForm}>Đóng</Button>
                    </div>
                </div>
            </Box >

        </Modal >
    )
};
export default ViewGT;