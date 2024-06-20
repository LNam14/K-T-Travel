"use client";
import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';
import ChartBar from '../../components/chart/chart';
import { useAppDispatch, useAppSelector } from '@/app/redux-store/hook';
import { getTotalAsync, getTotalList } from '@/app/redux-store/total/slice';
import { getRatioAsync, getRatioList } from '@/app/redux-store/ratio/slice';
import moment from 'moment';

interface TotalItem {
    area: string;
    total: string
}
interface RatioItem {
    area: string;
    ratio: any
}
const DashBoard = () => {
    const dispatch = useAppDispatch();
    const totalList: TotalItem[] = useAppSelector(getTotalList);
    const [totalListState, setTotalListState] = useState<TotalItem[]>([]);

    const ratioList: RatioItem[] = useAppSelector(getRatioList);
    const [ratioListState, setRatioListState] = useState<RatioItem[]>([]);
    useEffect(() => {
        const asyncCall = async () => {
            await dispatch(getTotalAsync());
            await dispatch(getRatioAsync());
        };
        asyncCall();
    }, []);

    useEffect(() => {
        if (totalList) {
            setTotalListState(totalList);
        }
    }, [totalList]);
    useEffect(() => {
        if (ratioList) {
            setRatioListState(ratioList);
        }
    }, [ratioList]);
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

    const dataMB = totalListState.find(item => item.area === "Miền Bắc");
    const dataMT = totalListState.find(item => item.area === "Miền Trung");
    const dataMN = totalListState.find(item => item.area === "Miền Nam");
    const dataNN = totalListState.find(item => item.area === "Nước Ngoài");

    const currentMonth: any = moment().format('MM');
    const currentYear = moment().format('YYYY');

    const ratioMB = ratioListState.find(item => item.area === "Miền Bắc");
    const ratioMT = ratioListState.find(item => item.area === "Miền Trung");
    const ratioMN = ratioListState.find(item => item.area === "Miền Nam");
    const ratioNN = ratioListState.find(item => item.area === "Nước Ngoài");

    const signMB = ratioMB ? Math.sign(ratioMB.ratio) : undefined;
    const signMT = ratioMT ? Math.sign(ratioMT.ratio) : undefined;
    const signMN = ratioMN ? Math.sign(ratioMN.ratio) : undefined;
    const signNN = ratioNN ? Math.sign(ratioNN.ratio) : undefined;
    return (
        <Box sx={{
            overflowY: "auto",
            height: lgUp ? 650 : 600,
            scrollbarWidth: "none"
        }}>
            <Box style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                <Box style={{ marginTop: 20, background: "white", height: 150, width: lgUp ? 280 : "100%", border: "1px solid #008c2c", borderRadius: 10, padding: 10, paddingLeft: 20 }}>
                    <Typography variant='h4' sx={{ color: "#008c2c" }}>Tour miền bắc</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", height: 50, marginTop: 0.5 }}>
                        <Avatar
                            alt="Logo"
                            src="/images/logo/1.png"
                            sx={{ width: 50, height: 50 }}
                            variant="square"
                        />

                        <Box sx={{ marginLeft: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Box sx={{ fontSize: 22, fontWeight: "bold", lineHeight: '1' }}>{dataMB ? dataMB.total : 0}</Box>
                                <Box sx={{ marginLeft: 1, fontSize: 14, color: signMB == 1 ? 'green' : "red", lineHeight: '1', display: "flex" }}>
                                    <Avatar
                                        alt="Logo"
                                        src={signMB === 1 ? "/images/logo/Artboard 73.png" : "/images/logo/Artboard 74.png"}
                                        sx={{ width: 22, height: 15, marginRight: 1 }}
                                        variant="square"
                                    />

                                    {ratioMB ? ratioMB?.ratio : 0}%
                                </Box>
                            </Box>
                            <Box sx={{ fontSize: 12, lineHeight: '1' }}>So với tháng {currentMonth - 1} năm {currentYear}</Box>
                        </Box>

                    </Box>
                    <Avatar
                        alt="Logo"
                        src="/images/logo/ArtboardMB.png"
                        sx={{ width: "100%", height: 50 }}
                        variant="square"
                    />
                </Box>
                <Box style={{ marginTop: 20, background: "white", height: 150, width: lgUp ? 280 : "100%", border: "1px solid #eb4034", borderRadius: 10, padding: 10, paddingLeft: 20 }}>
                    <Typography variant='h4' sx={{ color: "#eb4034" }}>Tour miền trung</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", height: 50, marginTop: 0.5 }}>
                        <Avatar
                            alt="Logo"
                            src="/images/logo/3.png"
                            sx={{ width: 50, height: 50 }}
                            variant="square"
                        />

                        <Box sx={{ marginLeft: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Box sx={{ fontSize: 22, fontWeight: "bold", lineHeight: '1' }}>{dataMT ? dataMT.total : 0}</Box>
                                <Box sx={{ marginLeft: 1, fontSize: 14, color: signMT == 1 ? 'green' : "red", lineHeight: '1', display: "flex" }}>
                                    <Avatar
                                        alt="Logo"
                                        src={signMT === 1 ? "/images/logo/Artboard 73.png" : "/images/logo/Artboard 74.png"}
                                        sx={{ width: 22, height: 15, marginRight: 1 }}
                                        variant="square"
                                    />

                                    {ratioMT ? ratioMT?.ratio : 0}%
                                </Box>
                            </Box>
                            <Box sx={{ fontSize: 12, lineHeight: '1' }}>So với tháng {currentMonth - 1} năm {currentYear}</Box>
                        </Box>

                    </Box>
                    <Avatar
                        alt="Logo"
                        src="/images/logo/ArtboardMT.png"
                        sx={{ width: "100%", height: 50 }}
                        variant="square"
                    />
                </Box>
                <Box style={{ marginTop: 20, background: "white", height: 150, width: lgUp ? 280 : "100%", border: "1px solid #7134eb", borderRadius: 10, padding: 10, paddingLeft: 20 }}>
                    <Typography variant='h4' sx={{ color: "#7134eb" }}>Tour miền nam</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", height: 50, marginTop: 0.5 }}>
                        <Avatar
                            alt="Logo"
                            src="/images/logo/4.png"
                            sx={{ width: 50, height: 50 }}
                            variant="square"
                        />

                        <Box sx={{ marginLeft: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Box sx={{ fontSize: 22, fontWeight: "bold", lineHeight: '1' }}>{dataMN ? dataMN.total : 0}</Box>
                                <Box sx={{ marginLeft: 1, fontSize: 14, color: signMN == 1 ? 'green' : "red", lineHeight: '1', display: "flex" }}>
                                    <Avatar
                                        alt="Logo"
                                        src={signMN === 1 ? "/images/logo/Artboard 73.png" : "/images/logo/Artboard 74.png"}
                                        sx={{ width: 22, height: 15, marginRight: 1 }}
                                        variant="square"
                                    />

                                    {ratioMN ? ratioMN?.ratio : 0}%
                                </Box>
                            </Box>
                            <Box sx={{ fontSize: 12, lineHeight: '1' }}>So với tháng {currentMonth - 1} năm {currentYear}</Box>
                        </Box>

                    </Box>
                    <Avatar
                        alt="Logo"
                        src="/images/logo/ArtboardMN.png"
                        sx={{ width: "100%", height: 50 }}
                        variant="square"
                    />
                </Box>
                <Box style={{ marginTop: 20, background: "white", height: 150, width: lgUp ? 280 : "100%", border: "1px solid #eb9234", borderRadius: 10, padding: 10, paddingLeft: 20 }}>
                    <Typography variant='h4' sx={{ color: "#eb9234" }}>Tour nước ngoài</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", height: 50, marginTop: 0.5 }}>
                        <Avatar
                            alt="Logo"
                            src="/images/logo/2.png"
                            sx={{ width: 50, height: 50 }}
                            variant="square"
                        />

                        <Box sx={{ marginLeft: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Box sx={{ fontSize: 22, fontWeight: "bold", lineHeight: '1' }}>{dataNN ? dataNN.total : 0}</Box>
                                <Box sx={{ marginLeft: 1, fontSize: 14, color: signNN == 1 ? 'green' : "red", lineHeight: '1', display: "flex" }}>
                                    <Avatar
                                        alt="Logo"
                                        src={signNN === 1 ? "/images/logo/Artboard 73.png" : "/images/logo/Artboard 74.png"}
                                        sx={{ width: 22, height: 15, marginRight: 1 }}
                                        variant="square"
                                    />

                                    {ratioNN ? ratioNN?.ratio : 0}%
                                </Box>
                            </Box>
                            <Box sx={{ fontSize: 12, lineHeight: '1' }}>So với tháng {currentMonth - 1} năm {currentYear}</Box>
                        </Box>

                    </Box>
                    <Avatar
                        alt="Logo"
                        src="/images/logo/ArtboardNN.png"
                        sx={{ width: "100%", height: 50 }}
                        variant="square"
                    />
                </Box>
            </Box>
            <Box sx={{ backgroundColor: "white", maxWidth: "100%", marginTop: 3, borderRadius: 5, paddingBottom: 2, paddingTop: 2 }}>
                <ChartBar />
            </Box>
        </Box >
    );
};

export default DashBoard;
