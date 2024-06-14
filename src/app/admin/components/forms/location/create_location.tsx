import React, { useEffect, useState } from "react";
import {
    Modal,
    Box,
    IconButton,
    Button,
} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useAppDispatch, useAppSelector } from "@/app/redux-store/hook";
import { createLocationAsync, getLocationAsync } from "@/app/redux-store/location/slice";

interface LooseObject {
    [key: string]: any;
}

const CreateLocation = ({
    open,
    closeForm,
    tour_option,
    area
}: {
    open: boolean;
    closeForm: any;
    tour_option: any;
    area: any
}

) => {
    const dispatch = useAppDispatch();
    const [data, setData] = useState<LooseObject>({
        tour_option: "",
        area: "",
        name: "",
    });
    useEffect(() => {
        if (tour_option && area) {
            setData({
                ...data,
                tour_option: tour_option,
                area: area
            })
        }
    }, [tour_option, area])
    const handleSave = async () => {
        await dispatch(createLocationAsync({ data }));
        await dispatch(getLocationAsync());
        closeForm()
    }

    return (
        <Modal open={open} onClose={closeForm}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "30%",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: 2,
                    overflowY: "auto",
                    maxHeight: 700,
                    fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                }}
            >
                <div style={{ display: "flex", backgroundColor: "#4287f5" }}>
                    <IconButton sx={{ position: "absolute", zIndex: 999, top: 30, marginLeft: 2, color: "white", }}
                        onClick={() => {
                            closeForm()
                        }}
                    >
                        <ArrowBackIosIcon sx={{ fontSize: 26, fontWeight: "bold" }} />
                    </IconButton>
                    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <span style={{ fontSize: 30, fontWeight: "bold", marginTop: 35, color: "white" }}>
                            Thêm Mới
                        </span>
                    </div>
                </div>
                <div style={{ marginBottom: 10, color: "black", fontWeight: "bold", margin: 10 }}>
                    {tour_option} &gt;&gt; {area}
                </div>
                <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 50, paddingTop: 10 }}>
                    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                        <span style={{ fontSize: 16, fontWeight: "bold" }}>Địa điểm</span>
                        <input type="text" style={{ height: 30, border: "1px solid #a1a1a1", paddingLeft: 10, borderRadius: 5 }}
                            value={data.name}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    name: e.target.value
                                })
                            }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                        <Button variant="contained" onClick={handleSave}>Xác nhận</Button>
                        <Button variant="contained" onClick={closeForm}>Đóng</Button>
                    </div>
                </div>
            </Box >
        </Modal >)
};
export default CreateLocation;