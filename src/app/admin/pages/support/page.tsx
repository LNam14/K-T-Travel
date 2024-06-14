'use client'
import React, { useEffect, useState } from "react";
import {
    Modal,
    Box,
    IconButton,
    Typography,
    Button,
    TableHead,
    TableCell,
    TableContainer,
    TableBody,
    Table,
    TableRow,
    Pagination,
} from "@mui/material";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useAppDispatch, useAppSelector } from "@/app/redux-store/hook";
import { createDTTourAsync, deleteDTTourAsync, getTourAsync, updateTourAsync } from "@/app/redux-store/tour/slice";
import { deleteBookingAsync, getBookingAsync, getBookingList, updateBookingAsync } from "@/app/redux-store/booking/slice";
import ClearIcon from '@mui/icons-material/Clear';
import Delete from "@mui/icons-material/Delete";
import CheckIcon from '@mui/icons-material/Check';
import { getSupportAsync, getSupportList } from "@/app/redux-store/support/slice";
interface LooseObject {
    [key: string]: any;
}

interface SupportItem {
    id: number;
    title_tour: string;
    status: string;
    phone: number;
}
const Support = () => {
    const dispatch = useAppDispatch()
    const supportList: SupportItem[] = useAppSelector(getSupportList);
    const [supportListState, setSupportListState] = useState<SupportItem[]>([]);


    useEffect(() => {
        const asyncCall = async () => {
            await dispatch(getSupportAsync())
        }
        asyncCall()
    }, [])
    useEffect(() => {
        if (supportList) {
            setSupportListState(supportList);
        }
    }, [supportList]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const newsListArray = Array.isArray(supportListState) ? supportListState : [];
    const totalPageCount = Math.ceil(newsListArray.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentNewsList = newsListArray.slice(startIndex, endIndex);
    const getBackgroundColor = (status: any) => {
        switch (status) {
            case "Đã tư vấn":
                return "#befacd";
            case "Đã từ chối":
                return "#fce6d2";
            default:
                return "#fcd4d4";
        }
    }
    const getBorderColor = (status: any) => {
        switch (status) {
            case "Đã tư vấn":
                return "green";
            case "Đã từ chối":
                return "orange";
            default:
                return "red";
        }
    }

    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };
    return (

        <Box
            sx={{
                mt: 2,
                fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                backgroundColor: "white"
            }}
        >
            <div style={{
                borderBottom: "1px solid #edeef0", fontSize: 30, display: "flex",
                justifyContent: "center", paddingTop: 40, backgroundColor: "#4287f5", fontWeight: "bold", color: "white",
            }}>Danh sách khách hàng</div>
            <div>
                <TableContainer
                    sx={{
                        width: {
                            xs: "274px",
                            sm: "100%",
                        },
                    }}
                >
                    <Table
                        aria-label="simple table"
                        sx={{
                            whiteSpace: "nowrap",
                            mt: 2,
                        }}
                    >
                        <TableHead sx={{ background: "#dedede" }}>
                            <TableRow>
                                <TableCell>
                                    <Typography
                                        textAlign={"center"}
                                        color="textSecondary"
                                        variant="h6"
                                    >
                                        ID
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        textAlign={"center"}
                                        color="textSecondary"
                                        variant="h6"
                                    >
                                        Số điện thoại
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        textAlign={"center"}
                                        color="textSecondary"
                                        variant="h6"
                                    >
                                        Title Tour
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        textAlign={"center"}
                                        color="textSecondary"
                                        variant="h6"
                                    >
                                        Status
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        textAlign={"center"}
                                        color="textSecondary"
                                        variant="h6"
                                    >
                                        Hành động
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {currentNewsList
                            ? currentNewsList.map((item: SupportItem, i: number) => (
                                <TableBody key={i}>
                                    <TableCell>
                                        <Typography
                                            textAlign={"center"}
                                            fontSize="15px"
                                            fontWeight={500}
                                        >
                                            {item.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            textAlign={"center"}
                                            variant="h6"
                                            fontWeight={600}
                                        >
                                            {item.phone}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            textAlign={"center"}
                                            variant="h6"
                                            fontWeight={600}
                                        >
                                            {truncateText(item.title_tour, 50)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            textAlign={"center"}
                                            color="textSecondary"
                                            variant="h6"
                                            sx={{
                                                background: getBackgroundColor(item.status),
                                                border: `1px solid ${getBorderColor(item.status)}`, padding: 0.2, borderRadius: 2, fontSize: 12
                                            }}
                                        >
                                            {item.status}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            textAlign={"center"}
                                            color="textSecondary"
                                            variant="h6"
                                        >
                                            <Box display={"flex"} justifyContent={"space-around"}>
                                                <IconButton
                                                    onClick={() => {
                                                        //  handleUpdate(item.id, "Đã xử lý")
                                                    }}>
                                                    <CheckIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => {
                                                        //  handleUpdate(item.id, "Đã từ chối")
                                                    }}>
                                                    <ClearIcon />
                                                </IconButton>
                                            </Box>
                                        </Typography>
                                    </TableCell>
                                </TableBody>
                            ))
                            : null}
                    </Table>

                </TableContainer>
            </div>

        </Box >

    )
};
export default Support;