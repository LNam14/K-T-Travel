import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAppDispatch } from "@/app/redux-store/hook";
import { changePasswordAsync } from "@/app/redux-store/users/slice";

interface LooseObject {
    [key: string]: any;
}

const ChangePassword = ({
    open,
    closeForm,
    id,
}: {
    open: boolean;
    closeForm: any;
    id: any
}
) => {
    const dispatch = useAppDispatch()
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState<LooseObject>({
        id: id,
        password: "",
        confirmPassword: "",
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleClose = () => {
        setData({ password: "", confirmPassword: "" });
        closeForm();
    };

    const handleChangePassword = async () => {
        await dispatch(changePasswordAsync(data))
        console.log("daa", data);
        closeForm()
    }

    return (
        <Modal open={open} onClose={handleClose}>
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
                    borderBottom: "1px solid #edeef0",
                    fontSize: 26,
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: 10,
                    backgroundColor: "#4287f5",
                    fontWeight: "bold",
                    color: "white",
                }}>Thay đổi mật khẩu</div>
                <div style={{ padding: 20 }}>
                    {id}
                    <div>
                        <div style={{ marginTop: 20 }}>
                            <div>
                                <Typography variant="h5">Mật khẩu mới:</Typography>
                            </div>
                            <div style={{ position: "relative" }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    style={{
                                        height: '40px',
                                        padding: '10px',
                                        border: '1px solid rgba(0, 0, 0, 0.23)',
                                        borderRadius: '4px',
                                        boxSizing: 'border-box',
                                        outline: 'none',
                                        fontSize: '1rem',
                                        paddingRight: '2.5rem',
                                    }}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            password: e.target.value,
                                        })
                                    }
                                />
                                {data.password && (
                                    <div
                                        className="showPassword"
                                        onClick={togglePasswordVisibility}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '8px',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <div>
                                <Typography variant="h5">Nhập lại mật khẩu:</Typography>
                            </div>
                            <div style={{ position: "relative" }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    style={{
                                        height: '40px',
                                        padding: '10px',
                                        border: '1px solid rgba(0, 0, 0, 0.23)',
                                        borderRadius: '4px',
                                        boxSizing: 'border-box',
                                        outline: 'none',
                                        fontSize: '1rem',
                                        paddingRight: '2.5rem',
                                    }}
                                    value={data.confirmPassword}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                />
                                {data.confirmPassword && (
                                    <div
                                        className="showPassword"
                                        onClick={togglePasswordVisibility}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '8px',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between" }}>
                            <Button
                                variant="contained"
                                style={{ backgroundColor: "#4287f5", }}
                                onClick={handleChangePassword}
                            >
                                Xác nhận
                            </Button>
                            <Button
                                variant="contained"
                                style={{ backgroundColor: "#4287f5", }}
                                onClick={handleClose}
                            >
                                Đóng
                            </Button>
                        </div>
                    </div>
                </div>
            </Box>

        </Modal>
    );
};

export default ChangePassword;
