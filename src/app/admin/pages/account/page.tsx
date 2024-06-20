// pages/account.tsx
"use client";

import {
    useMediaQuery,
    Container,
    TextField,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    Pagination,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import Switch from "react-switch";
import { useAppDispatch, useAppSelector } from "@/app/redux-store/hook";
import { createUserAsync, getUserAsync, getUserList, lockUserAsync, updateUserAsync } from "@/app/redux-store/users/slice";
import ViewAccount from "../../components/forms/account/update";

interface LooseObject {
    [key: string]: any;
}
interface UserItem {
    id: number;
    name: string;
    phone: string;
    status: string;
    username: string;
    email: string;
}
const AccountPage: React.FC = () => {
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
    const dispatch = useAppDispatch()
    const userList: UserItem[] = useAppSelector(getUserList);
    const [userListState, setUserListState] = useState<UserItem[]>([]);
    useEffect(() => {
        const asyncCall = async () => {
            await dispatch(getUserAsync())
        }
        asyncCall()
    }, [])
    useEffect(() => {
        if (userList) {
            setUserListState(userList);
        }
    }, [userList]);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = lgUp ? 3 : 5;
    const newsListArray = Array.isArray(userListState) ? userListState : [];
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

    const [showTravel, setShowTravel] = useState<boolean[]>(new Array(currentNewsList.length).fill(false));

    const toggleTravel = (index: number) => {
        const newShowTravel = [...showTravel];
        newShowTravel[index] = !newShowTravel[index];
        setShowTravel(newShowTravel);
    };

    const toggleSwitchState = async (status: string, id: number) => {
        let isConfirm;

        if (status === "active") {
            isConfirm = window.confirm("Bạn có muốn khóa tài khoản này không ?");
        } else {
            isConfirm = window.confirm("Bạn có muốn mở khóa tài khoản này không ?");
        }
        if (isConfirm) {
            await dispatch(lockUserAsync({ status, id }))
            await dispatch(getUserAsync())
        }

    };
    const [more, setMore] = useState(false);

    const [data, setData] = useState<LooseObject>({
        username: "",
        password: "",
        name: "",
        phone: "",
        email: ""
    });

    const handleSave = async () => {
        await dispatch(createUserAsync({ data }))
        await dispatch(getUserAsync())
    }

    const [isOpen, setIsOpen] = useState(false);
    const [account, setAccount] = useState('');
    const openForm = (account: any) => {
        setIsOpen(true);
        setAccount(account)
    };
    const closeForm = () => {
        setIsOpen(false);
    };
    return (
        <Container sx={{
            backgroundColor: "white",
            boxShadow: 2,
            mt: lgUp ? 4 : 1,
            height: lgUp ? 650 : 600,
            p: lgUp ? 5 : 3,
            fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
            overflow: lgUp ? "none" : "auto",
        }}>

            <Typography variant="h2">Quản lý tài khoản</Typography>
            {
                lgUp ? (
                    <Box>

                        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>

                            <div style={{ flexDirection: "column", display: "flex", }}>
                                <Typography variant="h5">Họ và tên</Typography>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    style={{
                                        width: 300,
                                        height: '40px',
                                        padding: '10px',
                                        border: '1px solid rgba(0, 0, 0, 0.23)',
                                        borderRadius: '4px',
                                        boxSizing: 'border-box',
                                        outline: 'none',
                                        fontSize: '1rem',
                                    }}
                                    value={data.name}
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            name: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div style={{ flexDirection: "column", display: "flex", }}>
                                <Typography variant="h5">Email</Typography>
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    style={{
                                        width: 300,
                                        height: '40px',
                                        padding: '10px',
                                        border: '1px solid rgba(0, 0, 0, 0.23)',
                                        borderRadius: '4px',
                                        boxSizing: 'border-box',
                                        outline: 'none',
                                        fontSize: '1rem',
                                    }}
                                    value={data.email}
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            email: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div style={{ flexDirection: "column", display: "flex", }}>
                                <Typography variant="h5">Số điện thoại</Typography>
                                <input
                                    type="text"
                                    placeholder="Enter your number phone"
                                    style={{
                                        width: 300,
                                        height: '40px',
                                        padding: '10px',
                                        border: '1px solid rgba(0, 0, 0, 0.23)',
                                        borderRadius: '4px',
                                        boxSizing: 'border-box',
                                        outline: 'none',
                                        fontSize: '1rem',
                                    }}
                                    value={data.phone}
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            phone: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div style={{ flexDirection: "column", display: "flex", }}>
                                <Typography variant="h5" sx={{ marginTop: 2 }}>Username</Typography>
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    style={{
                                        width: 300,
                                        height: '40px',
                                        padding: '10px',
                                        border: '1px solid rgba(0, 0, 0, 0.23)',
                                        borderRadius: '4px',
                                        boxSizing: 'border-box',
                                        outline: 'none',
                                        fontSize: '1rem',
                                    }}
                                    value={data.username}
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            username: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div style={{ flexDirection: "column", display: "flex", }}>
                                <Typography variant="h5" sx={{ marginTop: 2 }}>Password</Typography>
                                <input
                                    type="text"
                                    placeholder="Enter your password"
                                    style={{
                                        width: 300,
                                        height: '40px',
                                        padding: '10px',
                                        border: '1px solid rgba(0, 0, 0, 0.23)',
                                        borderRadius: '4px',
                                        boxSizing: 'border-box',
                                        outline: 'none',
                                        fontSize: '1rem',
                                    }}
                                    value={data.password}
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            password: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div style={{ width: 300, display: "flex", alignItems: "flex-end", marginTop: lgUp ? 0 : 20 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    style={{ alignSelf: "flex-end", backgroundColor: "#291868" }}
                                    onClick={handleSave}
                                >
                                    Tạo tài khoản
                                </Button>
                            </div>
                        </Box>
                    </Box>
                ) : (
                    <div>
                        {more &&
                            <Box>

                                <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>

                                    <div style={{ flexDirection: "column", display: "flex", }}>
                                        <Typography variant="h5">Họ và tên</Typography>
                                        <input
                                            type="text"
                                            placeholder="Enter your name"
                                            style={{
                                                width: 300,
                                                height: '40px',
                                                padding: '10px',
                                                border: '1px solid rgba(0, 0, 0, 0.23)',
                                                borderRadius: '4px',
                                                boxSizing: 'border-box',
                                                outline: 'none',
                                                fontSize: '1rem',
                                            }}
                                        />
                                    </div>
                                    <div style={{ flexDirection: "column", display: "flex", }}>
                                        <Typography variant="h5">Email</Typography>
                                        <input
                                            type="text"
                                            placeholder="Enter your email"
                                            style={{
                                                width: 300,
                                                height: '40px',
                                                padding: '10px',
                                                border: '1px solid rgba(0, 0, 0, 0.23)',
                                                borderRadius: '4px',
                                                boxSizing: 'border-box',
                                                outline: 'none',
                                                fontSize: '1rem',
                                            }}
                                        />
                                    </div>
                                    <div style={{ flexDirection: "column", display: "flex", }}>
                                        <Typography variant="h5">Số điện thoại</Typography>
                                        <input
                                            type="text"
                                            placeholder="Enter your number phone"
                                            style={{
                                                width: 300,
                                                height: '40px',
                                                padding: '10px',
                                                border: '1px solid rgba(0, 0, 0, 0.23)',
                                                borderRadius: '4px',
                                                boxSizing: 'border-box',
                                                outline: 'none',
                                                fontSize: '1rem',
                                            }}
                                        />
                                    </div>
                                    <div style={{ flexDirection: "column", display: "flex", }}>
                                        <Typography variant="h5" sx={{ marginTop: 2 }}>Username</Typography>
                                        <input
                                            type="text"
                                            placeholder="Enter your username"
                                            style={{
                                                width: 300,
                                                height: '40px',
                                                padding: '10px',
                                                border: '1px solid rgba(0, 0, 0, 0.23)',
                                                borderRadius: '4px',
                                                boxSizing: 'border-box',
                                                outline: 'none',
                                                fontSize: '1rem',
                                            }}
                                        />
                                    </div>
                                    <div style={{ flexDirection: "column", display: "flex", }}>
                                        <Typography variant="h5" sx={{ marginTop: 2 }}>Password</Typography>
                                        <input
                                            type="text"
                                            placeholder="Enter your password"
                                            style={{
                                                width: 300,
                                                height: '40px',
                                                padding: '10px',
                                                border: '1px solid rgba(0, 0, 0, 0.23)',
                                                borderRadius: '4px',
                                                boxSizing: 'border-box',
                                                outline: 'none',
                                                fontSize: '1rem',
                                            }}
                                        />
                                    </div>
                                    <div style={{ width: 300, display: "flex", alignItems: "flex-end", marginTop: lgUp ? 0 : 20 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            style={{ alignSelf: "flex-end", backgroundColor: "#291868" }}
                                        >
                                            Tạo tài khoản
                                        </Button>
                                    </div>
                                </Box>
                            </Box>
                        }
                    </div>
                )
            }

            {!lgUp &&
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ alignSelf: "flex-end", marginTop: 20 }}
                    onClick={() => {
                        setMore(!more)
                    }}
                >
                    {more ? " Rút Gọn" : "Thêm tài khoản"}
                </Button>}
            {lgUp ? (
                <TableContainer component={Paper} style={{ marginTop: 20, maxHeight: 400, scrollbarWidth: "none", }}>
                    <Typography variant="h3" sx={{ pt: 2, pl: 2 }}>Danh sách tài khoản</Typography>
                    <Table>

                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Typography variant="h6">ID</Typography>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Typography variant="h6">Username</Typography>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Typography variant="h6">Họ và tên</Typography>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Typography variant="h6">Số điện thoại</Typography>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Typography variant="h6">Email</Typography>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Typography variant="h6">Trạng thái</Typography>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Typography variant="h6">Hành động</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentNewsList.map((account, index) => (
                                <TableRow key={account.id}>
                                    <TableCell sx={{ textAlign: "center", color: "black" }}>{account.id}</TableCell>
                                    <TableCell sx={{ textAlign: "center", color: "black" }}>{account.username}</TableCell>
                                    <TableCell sx={{ textAlign: "center", color: "black" }}>{account.name}</TableCell>
                                    <TableCell sx={{ textAlign: "center", color: "black" }}>{account.phone}</TableCell>
                                    <TableCell sx={{ textAlign: "center", color: "black" }}>{account.email}</TableCell>
                                    <TableCell sx={{ textAlign: "center", color: "black" }}>
                                        <Switch
                                            onChange={() => toggleSwitchState(account.status, account.id)}
                                            checked={account.status === 'active'}
                                            uncheckedIcon={false}
                                            checkedIcon={false}
                                            height={20}
                                            width={40}
                                            handleDiameter={20}
                                            onColor="#291868"
                                            value={account.status}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => {
                                            openForm(account)
                                        }}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="secondary">
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box display="flex" justifyContent="center" mt={2} mb={1}>
                        <Pagination
                            count={totalPageCount}
                            shape="rounded"
                            variant="outlined"
                            page={currentPage}
                            onChange={handlePageChange}
                        />
                    </Box>
                </TableContainer>) : (
                <Box>
                    <Typography variant="h3" sx={{ pt: 2, pl: 2 }}>Danh sách tài khoản</Typography>
                    <div>
                        {currentNewsList.map((account, index) => (
                            <div key={index}>
                                <div
                                    style={{
                                        backgroundColor: "white",
                                        height: 50,
                                        border: "1px solid #F6F9FC",
                                        marginLeft: 10,
                                        marginRight: 10,
                                        marginTop: 10,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => toggleTravel(index)}
                                >
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                                        <div style={{ marginRight: 10, marginLeft: 10, fontWeight: "bold" }}>
                                            Họ và tên: {account.name}
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <ArrowDropDownRoundedIcon />
                                        </div>
                                    </div>
                                </div>
                                {showTravel[index] && (
                                    <div
                                        style={{
                                            marginLeft: 10,
                                            marginRight: 10,
                                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                                            padding: 5,
                                            marginTop: 5,
                                            marginBottom: 10,
                                            borderRadius: 10,
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <div style={{ width: "50%" }}>
                                            <Typography fontWeight="bold">ID</Typography>
                                            <Typography fontWeight="bold">Họ và tên</Typography>
                                            <Typography fontWeight="bold">Số điện thoại</Typography>
                                            <Typography fontWeight="bold">Email</Typography>
                                            <Typography fontWeight="bold">Trạng Thái</Typography>
                                            <Typography fontWeight="bold">Hành Động</Typography>
                                        </div>
                                        <div style={{ width: "50%" }}>
                                            <Typography>{account.id}</Typography>
                                            <Typography>{account.name}</Typography>
                                            <Typography>{account.phone}</Typography>
                                            <Typography>{account.email}</Typography>
                                            <Switch
                                                checked={account.status === 'active'}
                                                uncheckedIcon={false}
                                                checkedIcon={false}
                                                onChange={() => toggleSwitchState(account.status, account.id)}
                                                onColor="#291868"
                                                value={account.status}
                                                width={45}
                                                height={23}
                                                handleDiameter={22}
                                            />
                                            <Box>
                                                <IconButton color="primary">
                                                    <Edit />
                                                </IconButton>
                                                <IconButton color="secondary">
                                                    <Delete />
                                                </IconButton>
                                            </Box>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <Box display="flex" justifyContent="center" mt={2} mb={1}>
                            <Pagination
                                count={totalPageCount}
                                shape="rounded"
                                variant="outlined"
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </Box>
                    </div>
                </Box>
            )}
            <ViewAccount open={isOpen} closeForm={closeForm} account={account} />
        </Container>
    );
};

export default AccountPage;
