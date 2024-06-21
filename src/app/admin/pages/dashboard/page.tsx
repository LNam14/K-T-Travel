"use client"
import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/redux-store/hook';
import { getTotalAsync, getTotalList } from '@/app/redux-store/total/slice';
import { getRatioAsync, getRatioList } from '@/app/redux-store/ratio/slice';
import moment from 'moment';
import ChartBar from '../../components/chart/chart';

interface TotalItem {
    area: string;
    total: string;
}

interface RatioItem {
    area: string;
    ratio: any;
}

const DashBoard = () => {
    const dispatch = useAppDispatch();

    const totalList: TotalItem[] = useAppSelector(getTotalList);
    const ratioList: RatioItem[] = useAppSelector(getRatioList);

    const [totalListState, setTotalListState] = useState<TotalItem[]>([]);
    const [ratioListState, setRatioListState] = useState<RatioItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getTotalAsync());
            await dispatch(getRatioAsync());
        };

        fetchData();
    }, [dispatch]);

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

    const currentMonth: any = moment().format('MM');
    const currentYear = moment().format('YYYY');

    const renderTourBox = (area: string, backgroundColor: string, logoSrc: string, imageSrc: string) => {
        const totalData = Array.isArray(totalListState)
            ? totalListState.find(item => item.area === area)
            : undefined;

        const ratioData = Array.isArray(ratioListState)
            ? ratioListState.find(item => item.area === area)
            : undefined;

        const sign = ratioData ? Math.sign(ratioData.ratio) : undefined;

        return (
            <Box key={area} style={{ marginTop: 20, background: "white", height: 150, width: lgUp ? 280 : "100%", border: `1px solid ${backgroundColor}`, borderRadius: 10, padding: 10, paddingLeft: 20 }}>
                <Typography variant='h4' sx={{ color: backgroundColor }}>{`Tour ${area.toLowerCase()}`}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", height: 50, marginTop: 0.5 }}>
                    <Avatar
                        alt="Logo"
                        src={logoSrc}
                        sx={{ width: 50, height: 50 }}
                        variant="square"
                    />

                    <Box sx={{ marginLeft: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Box sx={{ display: "flex", alignItems: 'center' }}>
                            <Box sx={{ fontSize: 22, fontWeight: "bold", lineHeight: '1' }}>{totalData ? totalData.total : 0}</Box>
                            <Box sx={{ marginLeft: 1, fontSize: 14, color: sign === 1 ? 'green' : "red", lineHeight: '1', display: "flex" }}>
                                <Avatar
                                    alt="Logo"
                                    src={sign === 1 ? "/images/logo/Artboard 73.png" : "/images/logo/Artboard 74.png"}
                                    sx={{ width: 22, height: 15, marginRight: 1 }}
                                    variant="square"
                                />

                                {ratioData ? `${ratioData.ratio}%` : '0%'}
                            </Box>
                        </Box>
                        <Box sx={{ fontSize: 12, lineHeight: '1' }}>{`So với tháng ${currentMonth - 1} năm ${currentYear}`}</Box>
                    </Box>

                </Box>
                <Avatar
                    alt="Logo"
                    src={imageSrc}
                    sx={{ width: "100%", height: 50 }}
                    variant="square"
                />
            </Box>
        );
    };

    return (
        <Box sx={{
            overflowY: "auto",
            height: lgUp ? 650 : 600,
            scrollbarWidth: "none"
        }}>
            <Box style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                {renderTourBox("Miền Bắc", "#008c2c", "/images/logo/1.png", "/images/logo/ArtboardMB.png")}
                {renderTourBox("Miền Trung", "#eb4034", "/images/logo/3.png", "/images/logo/ArtboardMT.png")}
                {renderTourBox("Miền Nam", "#7134eb", "/images/logo/4.png", "/images/logo/ArtboardMN.png")}
                {renderTourBox("Nước Ngoài", "#eb9234", "/images/logo/2.png", "/images/logo/ArtboardNN.png")}
            </Box>
            <Box sx={{ backgroundColor: "white", maxWidth: "100%", marginTop: 3, borderRadius: 5, paddingBottom: 2, paddingTop: 2 }}>
                <ChartBar />
            </Box>
        </Box >
    );
};

export default DashBoard;
