import { useAppDispatch } from "@/app/redux-store/hook";
import { getUserAsync, updateUserAsync } from "@/app/redux-store/users/slice";
import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChangePassword from "./password";


interface LooseObject {
    [key: string]: any;
}

const ViewAccount = ({
    open,
    closeForm,
    account,
}: {
    open: boolean;
    closeForm: any;
    account: any
}
) => {
    const dispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState(false);

    const openInput = () => {
        setIsOpen(true);
    };
    const closeInput = () => {
        setIsOpen(false);
    };

    const [data, setData] = useState<LooseObject>({
        id: "",
        username: "",
        password: "",
        name: "",
        phone: "",
        email: ""
    });
    useEffect(() => {
        if (!open) {
            setData({
                username: "",
                password: "",
                name: "",
                phone: "",
                email: ""
            });
        } else {
            setData({
                ...data,
                id: account.id,
                username: account.username,
                password: account.password,
                name: account.name,
                phone: account.phone,
                email: account.email
            });
        }
    }, [open, account]);

    const handleUpdate = async () => {
        await dispatch(updateUserAsync(data));
        await dispatch(getUserAsync())
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
                    scrollbarColor: "#edeef0",
                    scrollbarWidth: "none",
                    maxHeight: 700,
                    fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                }}
            >
                <div style={{
                    borderBottom: "1px solid #edeef0", fontSize: 26, display: "flex",
                    justifyContent: "center", paddingTop: 10, backgroundColor: "#4287f5", fontWeight: "bold", color: "white",
                }}>Cập nhật tài khoản</div>
                <div style={{ padding: 20 }}>
                    <div>
                        <div style={{ marginTop: 20 }}>
                            <div>
                                <Typography variant="h5">Họ và tên:</Typography>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                style={{
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
                        <div style={{ marginTop: 20 }}>
                            <div>
                                <Typography variant="h5">Số điện thoại:</Typography>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your number phone"
                                style={{
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
                        <div style={{ marginTop: 20 }}>
                            <div>
                                <Typography variant="h5">Email:</Typography>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your email"
                                style={{
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
                        <div style={{ marginTop: 20 }}>
                            <div>
                                <Typography variant="h5">Username</Typography>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                style={{
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
                        <div style={{ marginTop: 20, display: "flex", flexDirection: "column" }}>
                            <Button
                                variant="contained" style={{ backgroundColor: "#f56c42" }}
                                onClick={openInput}
                            >
                                Thay đổi mật khẩu
                            </Button>
                        </div>
                        <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between" }}>
                            <Button
                                variant="contained" style={{ backgroundColor: "#4287f5", width: "30%" }}
                                onClick={() => { handleUpdate() }}
                            >
                                Cập nhật
                            </Button>
                            <Button variant="contained" style={{ backgroundColor: "#4287f5", width: "30%" }} onClick={closeForm}>Đóng</Button>
                        </div>
                    </div>
                </div>
                <ChangePassword open={isOpen} closeForm={closeInput} id={account.id} />
            </Box >

        </Modal >
    )
};
export default ViewAccount;