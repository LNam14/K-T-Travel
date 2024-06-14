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
interface LooseObject {
    [key: string]: any;
}

interface BookingItem {
    id: number;
    name: string;
    email: string;
    phone: number;
    address: string;
    adult: number;
    children: number;
    baby: number;
    newborn: number;
    id_tour: number;
    status: string;
}
const ViewBooking = ({
    open,
    closeForm,
    id_tour
}: {
    open: boolean;
    closeForm: any;
    id_tour: any
}

) => {
    const dispatch = useAppDispatch()
    const bookingList: BookingItem[] = useAppSelector(getBookingList);
    const [bookingListState, setBookingListState] = useState<BookingItem[]>([]);


    useEffect(() => {
        const asyncCall = async () => {
            await dispatch(getBookingAsync());
        };
        asyncCall();
    }, []);

    useEffect(() => {
        if (bookingList && bookingList.length > 0 && id_tour) {
            const bookingInIdTour: any = bookingList.filter(item => item.id_tour === id_tour)
            setBookingListState(bookingInIdTour);
        }
    }, [bookingList, id_tour]);



    const handleUpdate = async (id: number, status: string) => {
        const isConfirm = window.confirm("Xác nhận đã xử lý xong");
        if (isConfirm) {
            await dispatch(updateBookingAsync({ id, status }));
            await dispatch(getBookingAsync());
        }
    }

    const getBackgroundColor = (status: any) => {
        switch (status) {
            case "Đã xử lý":
                return "#befacd";
            case "Đã từ chối":
                return "#fce6d2";
            default:
                return "#fcd4d4";
        }
    }
    const getBorderColor = (status: any) => {
        switch (status) {
            case "Đã xử lý":
                return "green";
            case "Đã từ chối":
                return "orange";
            default:
                return "red";
        }
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const newsListArray = Array.isArray(bookingListState) ? bookingListState : [];
    const totalPageCount = Math.ceil(newsListArray.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentNewsList = newsListArray.slice(startIndex, endIndex);

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        setCurrentPage(page);
    };
    return (
        <Modal open={open} onClose={closeForm}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "60%",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: 2,
                    overflowY: "auto",
                    scrollbarColor: "#edeef0",
                    scrollbarWidth: "none",
                    maxHeight: 800,
                    fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",

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
                                            Email
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            textAlign={"center"}
                                            color="textSecondary"
                                            variant="h6"
                                        >
                                            Địa chỉ
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            textAlign={"center"}
                                            color="textSecondary"
                                            variant="h6"
                                        >
                                            Người lớn
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            textAlign={"center"}
                                            color="textSecondary"
                                            variant="h6"
                                        >
                                            Trẻ em
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            textAlign={"center"}
                                            color="textSecondary"
                                            variant="h6"
                                        >
                                            Trẻ nhỏ
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            textAlign={"center"}
                                            color="textSecondary"
                                            variant="h6"
                                        >
                                            Sơ sinh
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
                                ? currentNewsList.map((item: BookingItem, i: number) => (
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
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                textAlign={"center"}
                                                color="textSecondary"
                                                variant="h6"
                                            >
                                                {item.email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                textAlign={"center"}
                                                color="textSecondary"
                                                variant="h6"
                                            >
                                                {item.address}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                textAlign={"center"}
                                                fontSize="15px"
                                                fontWeight={500}
                                            >  {item.adult}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                textAlign={"center"}
                                                variant="h6"
                                                fontWeight={600}
                                            >
                                                {item.children}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                textAlign={"center"}
                                                variant="h6"
                                                fontWeight={600}
                                            >
                                                {item.baby}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                textAlign={"center"}
                                                color="textSecondary"
                                                variant="h6"
                                            >
                                                {item.newborn}
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
                                                            handleUpdate(item.id, "Đã xử lý")
                                                        }}>
                                                        <CheckIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => {
                                                            handleUpdate(item.id, "Đã từ chối")
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
                        <Box display="flex" justifyContent="center" mt={3}>
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
                <div style={{ display: "flex", flexDirection: "column", margin: 20 }}>
                    <Button variant="contained" onClick={closeForm}>Đóng</Button>
                </div>
            </Box >

        </Modal >
    )
};
export default ViewBooking;