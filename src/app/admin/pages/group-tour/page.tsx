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
import "react-quill/dist/quill.snow.css";
import { useAppDispatch, useAppSelector } from "@/app/redux-store/hook";
import { createDTTourAsync, deleteDTTourAsync, getTourAsync, updateTourAsync } from "@/app/redux-store/tour/slice";
import { deleteBookingAsync, getBookingAsync, getBookingList, updateBookingAsync } from "@/app/redux-store/booking/slice";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getGroupTourAsync, getGroupTourList } from "@/app/redux-store/group_tour/slice";
import ViewGT from "../../components/forms/group-tour/view-detail";
interface LooseObject {
    [key: string]: any;
}

interface GroupTourItem {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    company: string;
    number_of_people: string;
    start_date: string;
    location: string;
    note: string;
    status: string;
}
const GroupTour = () => {
    const dispatch = useAppDispatch()
    const groupTourList: GroupTourItem[] = useAppSelector(getGroupTourList);
    const [groupTourListState, setGroupTourListState] = useState<GroupTourItem[]>([]);


    useEffect(() => {
        const asyncCall = async () => {
            await dispatch(getGroupTourAsync())
        }
        asyncCall()
    }, [])
    useEffect(() => {
        if (groupTourList) {
            setGroupTourListState(groupTourList);
        }
    }, [groupTourList]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const newsListArray = Array.isArray(groupTourListState) ? groupTourListState : [];
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
    const [isOpen, setIsOpen] = useState(false);
    const [travel, setTravel] = useState("");

    const openForm = (travel: any) => {
        setIsOpen(true);
        setTravel(travel)
    };
    const closeForm = () => {
        setIsOpen(false);
    };
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        setCurrentPage(page);
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
                                        Họ và tên
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
                                        Ngày đi
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        textAlign={"center"}
                                        color="textSecondary"
                                        variant="h6"
                                    >
                                        Điểm đến mong muốn
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        textAlign={"center"}
                                        color="textSecondary"
                                        variant="h6"
                                    >
                                        Trạng thái
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
                            ? currentNewsList.map((item: GroupTourItem, i: number) => (
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
                                            {item.name}
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
                                    </TableCell><TableCell>
                                        <Typography
                                            textAlign={"center"}
                                            variant="h6"
                                            fontWeight={600}
                                        >
                                            {item.start_date}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            textAlign={"center"}
                                            variant="h6"
                                            fontWeight={600}
                                        >
                                            {item.location}
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
                                                        openForm(item)
                                                    }}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Box>
                                        </Typography>
                                    </TableCell>
                                </TableBody>

                            ))
                            : null}

                    </Table>
                    <ViewGT open={isOpen} closeForm={closeForm} travel={travel} />
                    <Box display="flex" justifyContent="center" mt={3} mb={3}>
                        <Pagination
                            count={totalPageCount}
                            shape="rounded"
                            variant="outlined"
                            page={currentPage}
                            onChange={handlePageChange}
                        />
                    </Box>
                </TableContainer>
            </div>

        </Box >

    )
};
export default GroupTour;