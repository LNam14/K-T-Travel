"use client";

import Footer from "@/app/footer/footer";
import Header from "@/app/header/header";
import { createGroupTourAsync } from "@/app/redux-store/group_tour/slice";
import { useAppDispatch } from "@/app/redux-store/hook";
import { Button, useMediaQuery } from "@mui/material";
import { useState } from "react";
interface LooseObject {
    [key: string]: any;
}
const GroupTour = () => {
    const dispatch = useAppDispatch()
    const [data, setData] = useState<LooseObject>({
        name: "",
        email: "",
        phone: "",
        address: "",
        company: "",
        number_of_people: "",
        start_date: "",
        location: "",
        note: ""
    });
    const handleSave = () => {
        dispatch(createGroupTourAsync({ data }))
    }
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
    return (
        <body>
            <Header />
            <section className="breadcrumb-main" style={{ paddingTop: 160, paddingBottom: 160, backgroundImage: "url(/images/banner/image.jpg)" }}>
                <div className="section-shape section-shape1 top-inherit bottom-0" style={{ backgroundImage: "url(https://htmldesigntemplates.com/html/travelin/images/shape8.png)" }}></div>
                <div className="breadcrumb-outer">
                    <div className="container">
                        <div className="breadcrumb-content text-center">
                            <h1 style={{ fontSize: 40, fontWeight: "bold" }} className="mb-3">DU LỊCH ĐOÀN</h1>
                        </div>
                    </div>
                </div>
                <div className="dot-overlay"></div>
            </section>
            <section style={{ width: "95%", display: "flex", justifyContent: "center", margin: 10 }}>
                <div style={{ width: lgUp ? "80%" : "100%", display: "flex", justifyContent: "center" }}>
                    <div style={{ backgroundColor: "white", width: lgUp ? "70%" : "100%", }}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div style={{ fontSize: 30, color: "#291868", fontWeight: "bold" }}>Thông Tin Khách Hàng</div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", flexDirection: lgUp ? "row" : "column" }}>
                            <div style={{ width: lgUp ? "48%" : "100%", }}>
                                <div style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
                                    <span style={{ fontSize: 16, fontWeight: "bold" }}>Họ và tên <span style={{ color: "red" }}>*</span></span>
                                    <input type="text"
                                        value={data.name}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                name: e.target.value
                                            })
                                        }} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
                                    <span style={{ fontSize: 16, fontWeight: "bold" }}>Email <span style={{ color: "red" }}>*</span></span>
                                    <input type="text"
                                        value={data.email}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                email: e.target.value
                                            })
                                        }} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
                                    <span style={{ fontSize: 16, fontWeight: "bold" }}>Công ty <span style={{ color: "red" }}>*</span></span>
                                    <input type="text"
                                        value={data.company}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                company: e.target.value
                                            })
                                        }} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
                                    <span style={{ fontSize: 16, fontWeight: "bold" }}>Ngày đi <span style={{ color: "red" }}>*</span></span>
                                    <input type="text"
                                        value={data.start_date}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                start_date: e.target.value
                                            })
                                        }} />
                                </div>
                            </div>
                            <div style={{ width: lgUp ? "48%" : "100%" }}>
                                <div style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
                                    <span style={{ fontSize: 16, fontWeight: "bold" }}>Số điện thoại <span style={{ color: "red" }}>*</span></span>
                                    <input type="text"
                                        value={data.phone}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                phone: e.target.value
                                            })
                                        }} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
                                    <span style={{ fontSize: 16, fontWeight: "bold" }}>Địa chỉ <span style={{ color: "red" }}>*</span></span>
                                    <input type="text"
                                        value={data.address}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                address: e.target.value
                                            })
                                        }} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
                                    <span style={{ fontSize: 16, fontWeight: "bold" }}>Số người <span style={{ color: "red" }}>*</span></span>
                                    <input type="text"
                                        value={data.number_of_people}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                number_of_people: e.target.value
                                            })
                                        }} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
                                    <span style={{ fontSize: 16, fontWeight: "bold" }}>Điểm đến mong muốn <span style={{ color: "red" }}>*</span></span>
                                    <input type="text"
                                        value={data.locaion}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                locaion: e.target.value
                                            })
                                        }} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <span style={{ fontSize: 16, fontWeight: "bold", marginTop: 20 }}>Ghi chú</span>
                            <textarea
                                value={data.note}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        note: e.target.value
                                    })
                                }}></textarea>
                        </div>
                        <div style={{ flexDirection: "column", display: "flex" }}>
                            <Button variant="contained" onClick={handleSave}>Đăng ký</Button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </body >
    )
}
export default GroupTour;
