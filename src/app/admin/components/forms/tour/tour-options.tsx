import React, { useEffect, useState } from "react";
import {
    Modal,
    Box,
    Button,
    IconButton,
} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CreateTour from "./create-tour";
import { useAppDispatch, useAppSelector } from "@/app/redux-store/hook";
interface LooseObject {
    [key: string]: any;
}
interface LocationItem {
    id: number;
    name: string;
}
const TourOption = ({
    open,
    closeForm,
}: {
    open: boolean;
    closeForm: any
}

) => {

    const [isOpen, setIsOpen] = useState(false);

    const openCreate = () => {
        setIsOpen(true);
    };
    const closeCreate = () => {
        setIsOpen(false);
    };

    const [option, setOption] = useState("")
    const [area, setArea] = useState("")

    const [isShow, setIsShow] = useState(false)
    const [isOption, setIsOption] = useState(true)
    const [isDomestic, setIsDomestic] = useState(false)
    const [isMB, setIsMB] = useState(false)
    const [isInternational, setIsInternational] = useState(false)

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
                    p: 1,
                    fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                }}
            >
                <div style={{ borderBottom: "1px solid #edeef0", display: "flex", }}>
                    {isShow && (<IconButton sx={{ marginTop: 1.2, position: "absolute", zIndex: 999 }}
                        onClick={() => {
                            setIsDomestic(false)
                            setIsOption(true)
                            setIsShow(false)
                            setIsInternational(false)
                        }}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>)}
                    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <span style={{ fontSize: 20, fontWeight: "bold", marginTop: 20, }}>
                            {isShow ? "Chọn khu vực" : "Lựa chọn Tour"}
                        </span>
                    </div>

                </div>

                <div >
                    {isOption && (
                        <div style={{ display: "flex", justifyContent: "space-evenly", margin: 10 }}>
                            <Button variant="contained" onClick={() => {
                                setIsDomestic(true)
                                setIsOption(false)
                                setIsShow(true)
                            }}>
                                Du lịch Trong Nước
                            </Button>
                            <Button variant="contained" onClick={() => {
                                setIsInternational(true)
                                setIsOption(false)
                                setIsShow(true)
                            }}>
                                Du lịch Nước Ngoài
                            </Button>
                        </div>
                    )}
                    {isDomestic && (
                        <div style={{ display: "flex", justifyContent: "space-evenly", margin: 10 }}>
                            <Button variant="contained"
                                onClick={() => {
                                    setOption("Trong Nước")
                                    setArea("Miền Bắc")
                                    openCreate();
                                }}>
                                Du lịch Miền Bắc
                            </Button>
                            <Button variant="contained"
                                onClick={() => {
                                    setOption("Trong Nước")
                                    setArea("Miền Trung")
                                    openCreate();
                                }}>
                                Du lịch Miền Trung
                            </Button>
                            <Button variant="contained"
                                onClick={() => {
                                    setOption("Trong Nước")
                                    setArea("Miền Nam")
                                    openCreate();
                                }}>
                                Du lịch Miền Nam
                            </Button>
                        </div>
                    )}

                    {isInternational && (
                        <div style={{ display: "flex", justifyContent: "space-evenly", margin: 10 }}>
                            <Button variant="contained"
                                onClick={() => {
                                    setOption("Nước Ngoài")
                                    setArea("Châu Á")
                                    openCreate()
                                }}>
                                Du lịch Châu Á
                            </Button>
                        </div>
                    )}
                </div>
                <CreateTour tour_option={option} area={area} open={isOpen} closeForm={closeCreate} />
            </Box>
        </Modal>)
};
export default TourOption;