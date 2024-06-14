"use client";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';



const Account: React.FC = () => {
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
    return (
        <div style={{
            display: lgUp ? "flex" : "block", marginTop: 20, borderRadius: 20, boxShadow: " 2px 2px 4px rgba(0, 0, 0, 0.2)",
            minHeight: 600
        }}>
            <div style={{
                display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "white"

            }}>
                <span style={{ fontSize: 28, fontWeight: "bold", }}> Quản lý tài khoản</span>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", }}>
                    <div style={{ paddingLeft: 5, paddingRight: 5, display: "flex", flexDirection: "column", width: "50%" }}>
                        <div>
                            Họ và tên
                            <input type="text" style={{ height: 35, border: "1px solid #dedede", borderRadius: 5 }} />
                        </div>
                        <div>
                            Địa chỉ
                            <input type="text" style={{ height: 35, border: "1px solid #dedede", borderRadius: 5 }} />
                        </div>
                        <div>
                            Vị trí
                            <input type="text" style={{ height: 35, border: "1px solid #dedede", borderRadius: 5 }} />
                        </div>
                    </div>
                    <div style={{ paddingLeft: 5, paddingRight: 5, display: "flex", flexDirection: "column", width: "50%" }}>
                        <div>
                            Họ và tên
                            <input type="text" style={{ height: 35, border: "1px solid #dedede", borderRadius: 5 }} />
                        </div>
                        <div>
                            Địa chỉ
                            <input type="text" style={{ height: 35, border: "1px solid #dedede", borderRadius: 5 }} />
                        </div>
                        <div>
                            Vị trí
                            <input type="text" style={{ height: 35, border: "1px solid #dedede", borderRadius: 5 }} />
                        </div>
                    </div>

                </div>
                <Button style={{ width: "100%", marginTop: 10 }} variant='contained'>Xác nhận</Button>
            </div>

            <div style={{ backgroundColor: "white", minHeight: 600, width: lgUp ? "70%" : "100%", borderLeft: "1px solid #dedede" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <span style={{ fontSize: 28, fontWeight: "bold" }}>Danh sách tài khoản</span>
                </div>
                <TableContainer
                    sx={{
                        width: {
                            xs: "454px",
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

                        <TableBody>
                            <TableCell>
                                <Typography
                                    textAlign={"center"}
                                    fontSize="15px"
                                    fontWeight={500}
                                >
                                    1
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    textAlign={"center"}
                                    variant="h6"
                                    fontWeight={600}
                                >
                                    1
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    textAlign={"center"}
                                    variant="h6"
                                    fontWeight={600}
                                >
                                    1
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    textAlign={"center"}
                                    color="textSecondary"
                                    variant="h6"

                                >
                                    1
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    textAlign={"center"}
                                    color="textSecondary"
                                    variant="h6"
                                >
                                    1
                                </Typography>
                            </TableCell>
                        </TableBody>

                    </Table>

                </TableContainer>
            </div>
        </div >
    );
};

export default Account;
