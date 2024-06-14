import { useAppDispatch } from "@/app/redux-store/hook";
import { loginAsync } from "@/app/redux-store/login/slice";
import { Box, Button, Modal, Typography } from "@mui/material";
import { getCookie, setCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import "./login.css"

interface LooseObject {
    [key: string]: any;
}

const FormLogin = ({ open, closeForm }: { open: boolean; closeForm: any }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const showForgotPasswordForm = () => {
        setIsShow(true);
    };
    const closeFormForgot = () => {
        setIsShow(false);
    };

    const [isPin, setIsPin] = useState(false);
    const closeIsPin = () => {
        setIsPin(false);
    };

    const dispatch = useAppDispatch();
    const token: any = getCookie("token");
    const [data, setData] = useState<LooseObject>({
        username: "",
        password: "",
    });
    const [loginFailed, setLoginFailed] = useState(false);

    const handleLogin = async () => {
        const res = await dispatch(loginAsync({ data: data }));
        if (res.meta.requestStatus === "rejected") {
            setLoginFailed(true);
            alert("Vui lòng kiểm tra lại thông tin đăng nhập!");
        }
        if (res.meta.requestStatus === "fulfilled") {
            setCookie("username", data.username);
            window.location.replace("/admin/pages/dashboard");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <Modal open={open} onClose={closeForm}>
            <Box className="form-container" onKeyPress={handleKeyPress}>
                <Box display={"flex"} justifyContent={"center"}>
                    <Typography className="title">Đăng nhập</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"center"}>
                    <Typography className="subtitle">Vui lòng nhập tên đăng nhập và mật khẩu của bạn để đăng nhập</Typography>
                </Box>
                <Box display={"flex"} flexDirection="column">
                    <label className="input-label">
                        Username
                        <input className={`input-field ${loginFailed ? "input-failed" : ""}`} placeholder="Enter your username"
                            value={data.username}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    username: e.target.value,
                                })}
                            type="text"
                            onSelect={() => setLoginFailed(false)} />
                    </label>
                    <label className="input-label">
                        Password
                        <input
                            className={`input-field ${loginFailed ? "input-failed" : ""}`}
                            placeholder="Enter your password"
                            value={data.password}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    password: e.target.value,
                                })}
                            type={showPassword ? "text" : "password"}
                            onSelect={() => setLoginFailed(false)}
                        />
                        {data.password && (
                            <div className="showPassword" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </div>
                        )}
                    </label>
                    <Box display={"flex"} justifyContent="end">
                        <Button className="forgot-password" variant="text" onClick={showForgotPasswordForm}>Forgot password ?</Button>
                    </Box>
                </Box>
                <Box display={"flex"} justifyContent={"center"} marginTop={3}>
                    <Button className="button" variant="contained" onClick={handleLogin}>Đăng nhập</Button>
                </Box>
                <Modal open={isShow} onClose={closeFormForgot}>
                    <Box className="form-container">
                        <Box display={"flex"} justifyContent={"center"}>
                            <Typography className="title">Quên mật khẩu</Typography>
                        </Box>
                        <Box display={"flex"} justifyContent={"center"}>
                            <Typography className="subtitle">Vui lòng nhập vào email của bạn để lấy lại mật khẩu</Typography>
                        </Box>
                        <Box display={"flex"} flexDirection="column">
                            <label className="input-label">
                                Email
                                <input className="input-field" placeholder="Enter your email" />
                            </label>
                        </Box>
                        <Box display={"flex"} justifyContent={"center"} marginTop={3}>
                            <Button className="button" variant="contained" onClick={() => { setIsPin(true) }}>Gửi</Button>
                        </Box>
                    </Box>
                </Modal>
                <Modal open={isPin} onClose={closeIsPin}>
                    <Box className="form-container">
                        <Box display={"flex"} justifyContent={"center"}>
                            <Typography className="title">Nhập mã xác nhận</Typography>
                        </Box>
                        <Box display={"flex"} justifyContent={"center"}>
                            <Typography className="subtitle">Mã xác nhận được gửi về email</Typography>
                        </Box>
                        <Box display={"flex"} justifyContent="center">
                            <Typography className="subtitle-red">lehoainam2506@gmail.com</Typography>
                        </Box>
                        <Box display={"flex"} flexDirection="column">
                            <label className="input-label">
                                Mã OTP
                                <input className="input-field" placeholder="Nhập mã OTP" />
                            </label>
                            <Typography className="gray-text">Mã OTP hết hạn sau <span className="red-text">59s</span></Typography>
                        </Box>
                        <Box display={"flex"} justifyContent={"center"} marginTop={3}>
                            <Button className="button" variant="contained">Xác nhận</Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </Modal>
    );
};

export default FormLogin;
