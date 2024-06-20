"use client";

import Footer from "@/app/footer/footer";
import Header from "@/app/header/header";
import { Button } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowRightAlt';
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/redux-store/hook";
import { createBookingAsync } from "@/app/redux-store/booking/slice";
import { createSupportAsync } from "@/app/redux-store/support/slice";
interface LooseObject {
    [key: string]: any;
}
const Booking = () => {
    const dispatch = useAppDispatch()

    const [tour, setTour] = useState<any>(null);
    useEffect(() => {
        const storedNewsItem = localStorage.getItem("booking");
        if (storedNewsItem) {
            setTour(JSON.parse(storedNewsItem));
            setData({
                ...data,
                id_tour: JSON.parse(storedNewsItem).id
            })
            setDataSP({
                ...dataSP,
                title_tour: JSON.parse(storedNewsItem).title
            })
        }
    }, []);

    const [data, setData] = useState<LooseObject>({
        name: "",
        email: "",
        phone: "",
        address: "",
        adult: "",
        children: "",
        baby: "",
        newborn: "",
        note: "",
        id_tour: 0
    });

    console.log(data);


    const [dataSP, setDataSP] = useState<LooseObject>({
        phone: "",
        title_tour: "",
    });
    const handleSave = async () => {
        const isConfirm = window.confirm("Xác nhận đặt Tour này")
        if (isConfirm) {
            await dispatch(createBookingAsync({ data }))
            alert("Đặt Tour thành công")
            setData({
                ...data,
                name: "",
                email: "",
                phone: "",
                address: "",
                adult: "",
                children: "",
                baby: "",
                newborn: "",
                note: "",
            })
        }
    }

    const handleSupport = async () => {
        await dispatch(createSupportAsync({ dataSP }))
        alert("Gửi hỗ trợ thành công")
        setDataSP({
            ...dataSP,
            phone: "",
            title_tour: "",
            status: "",
        })
    }

    return (
        <body>
            <Header />
            <section className="contenttop-wrapper">
                <div className="region region-content-top">
                    <div className="views-element-container block block-views block-views-blocklich-block-2"
                        id="block-views-block-lich-block-2">
                        <div>
                            <div
                                className="lichkhoihanh-tour container view view-lich view-id-lich view-display-id-block_2 js-view-dom-id-93c681209c90e5637f54941c6802ed4612a7949b78ca56d2e138bba650bfdd8a">
                                <div className="view-content">
                                    <div className="views-row">
                                        <div className="views-field views-field-nothing">
                                            <span className="field-content">
                                                <div className="block-khoi-hanh-book-tour tour-item p-3">
                                                    <div className="row">
                                                        <div className="col-12 col-lg-3">
                                                            <div className="tour-image">
                                                                {tour && tour.image && tour.image.length > 0 && (
                                                                    <img
                                                                        style={{ height: 200, width: 1000, marginLeft: 20 }}
                                                                        loading="lazy"
                                                                        src={tour.image[0].image_url}
                                                                        alt=""
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-9">
                                                            <div className="tour-title">
                                                                <h3 className="mb-0"><a
                                                                    href="https://hanoitourist.vn/tour-da-lat-nha-trang"
                                                                >{tour ? tour.title : ""}</a></h3>
                                                            </div>
                                                            <div className="tour-id py-2">
                                                                <strong>Mã tour:
                                                                    <span className="c-pinkred"> {tour ? tour.id : ""}</span>
                                                                </strong>
                                                            </div>
                                                            <div className="row tour-information row">
                                                                <div className="col-6">
                                                                    <div className="tour-detail-item d-flex">
                                                                        <div className="detail-item-icon"><i
                                                                            className="fa fa-calendar"
                                                                            aria-hidden="true"></i></div>
                                                                        <div className="detail-item-value">Ngày đi:
                                                                            <strong>{tour ? tour.start_date : ""}</strong></div>
                                                                    </div>
                                                                    <div className="tour-detail-item d-flex">
                                                                        <div className="detail-item-icon"><i
                                                                            className="fa fa-calendar"
                                                                            aria-hidden="true"></i></div>
                                                                        <div className="detail-item-value">Ngày về:
                                                                            <strong>{tour ? tour.end_date : ""}</strong></div>
                                                                    </div>
                                                                    <div className="tour-detail-item d-flex py-1">
                                                                        <div className="detail-item-icon"><i
                                                                            className="fa fa-map-marker"
                                                                            aria-hidden="true"></i></div>
                                                                        <div className="detail-item-value">Từ: <strong>{tour ? tour.start_location : ""}</strong></div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-6">
                                                                    <div className="tour-detail-item d-flex">
                                                                        <div className="detail-item-icon"><i
                                                                            className="fa fa-street-view"
                                                                            aria-hidden="true"></i></div>
                                                                        <div className="detail-item-value">Số chỗ còn nhận:
                                                                            <strong>{tour ? tour.slot : ""}</strong></div>
                                                                    </div>
                                                                    <div className="tour-detail-item d-flex detail-ghichu py-1">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <main className="container page-content clearfix" role="main">
                <div className="visually-hidden"><a id="main-content"></a></div>
                <div className="row g-0">
                    <div className="order-2 order-lg-2 col-12 col-lg-9">
                        <div className="layout-container">
                            <div className="region region-highlighted">
                                <div data-drupal-messages-fallback className="hidden"></div>
                            </div>
                            <div className="region region-content">
                                <div id="block-hanoitourist-content" className="block block-system block-system-main-block">
                                    <div className="form-get-booking">
                                        <div className="fieldset fieldset-thongtinlienlac my-3 pb-3">
                                            <div className="fieldset-header py-2 px-3 c-white">Thông tin liên lạc</div>
                                            <div className="fieldset-form-content py-2 px-3">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="py-2">
                                                            <input className="form-control form-infor-user"
                                                                type="text" placeholder="Họ &amp; tên"
                                                                value={data.name}
                                                                onChange={(e) => {
                                                                    setData({
                                                                        ...data,
                                                                        name: e.target.value
                                                                    })
                                                                }} />

                                                        </div>

                                                        <div className="py-2">
                                                            <input className="form-control form-infor-user"
                                                                type="text" placeholder="Số điện thoại"
                                                                value={data.phone}
                                                                onChange={(e) => {
                                                                    setData({
                                                                        ...data,
                                                                        phone: e.target.value
                                                                    })
                                                                }} />
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="py-2">
                                                            <input className="form-control form-infor-user"
                                                                type="text" placeholder="Email"
                                                                value={data.email}
                                                                onChange={(e) => {
                                                                    setData({
                                                                        ...data,
                                                                        email: e.target.value
                                                                    })
                                                                }} />

                                                        </div>
                                                        <div className="py-2">
                                                            <input className="form-control form-infor-user"
                                                                type="text" placeholder="Địa chỉ"
                                                                value={data.address}
                                                                onChange={(e) => {
                                                                    setData({
                                                                        ...data,
                                                                        address: e.target.value
                                                                    })
                                                                }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="fieldset fieldset-sohanhkhach my-3  pb-3">
                                            <div className="fieldset-header py-2 px-3 c-white">Số hành khách</div>
                                            <div className="fieldset-form-content pt-4 pb-2 px-3">
                                                <div className="row">
                                                    <div className="col-12 col-lg-3 count-item">
                                                        <div className="label fw-bold">Người lớn</div>
                                                        <div className="desription">Từ 12 tuổi trở lên</div>
                                                        <div className="input-box mt-2">
                                                            <input type="number" placeholder="0"
                                                                value={data.adult}
                                                                onChange={(e) => {
                                                                    setData({
                                                                        ...data,
                                                                        adult: e.target.value
                                                                    })
                                                                }} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-3 count-item">
                                                        <div className="label fw-bold">Trẻ em</div>
                                                        <div className="desription">Từ 5 đến 11 tuổi</div>
                                                        <div className="input-box mt-2">
                                                            <input type="number" placeholder="0"
                                                                value={data.children}
                                                                onChange={(e) => {
                                                                    setData({
                                                                        ...data,
                                                                        children: e.target.value
                                                                    })
                                                                }} />

                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-3 count-item">
                                                        <div className="label fw-bold">Trẻ nhỏ</div>
                                                        <div className="desription">Từ 2 đến 5 tuổi</div>
                                                        <div className="input-box mt-2">
                                                            <input type="number" placeholder="0"
                                                                value={data.baby}
                                                                onChange={(e) => {
                                                                    setData({
                                                                        ...data,
                                                                        baby: e.target.value
                                                                    })
                                                                }} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-3 count-item">
                                                        <div className="label fw-bold">Trẻ sơ sinh</div>
                                                        <div className="desription">Dưới 2 tuổi</div>
                                                        <div className="input-box mt-2">
                                                            <input type="number" placeholder="0"
                                                                value={data.newborn}
                                                                onChange={(e) => {
                                                                    setData({
                                                                        ...data,
                                                                        newborn: e.target.value
                                                                    })
                                                                }} />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ttkh-ghichu">
                                            <div className="label c-blue fw-bold">Quý khách có ghi chú, lưu ý gì, hãy nói với
                                                chúng tôi</div>
                                            <div className="mt-2 mb-4">
                                                <textarea
                                                    value={data.note}
                                                    onChange={(e) => {
                                                        setData({
                                                            ...data,
                                                            note: e.target.value
                                                        })
                                                    }}
                                                    className="form-control"
                                                    placeholder="Để lại ghi chú cho chúng tôi"
                                                ></textarea></div>
                                        </div>
                                    </div>
                                </div>
                                <div id="block-chatzalo"
                                    className="block block-block-content block-block-content28f0d598-e48d-4f00-a6c4-b77ee2d47486">
                                    <div
                                        className="clearfix text-formatted field field--name-body field--type-text-with-summary field--label-hidden field__item">
                                        <div className="zalo-chat-widget" data-oaid="4418198967209086945"
                                            data-welcome-message="Hanoitourist kính chào quý khách!" data-autopopup="0"
                                            data-width="" data-height=""></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-3 full-sidebar-second col-12 col-lg-3">
                        <div className="region region-sidebar-second">
                            <div id="block-blocksidebartrangbooking"
                                className="block block-block-content block-block-content552ed9a9-e0c0-4f88-9ceb-712fbd85da12">
                                <div
                                    className="clearfix text-formatted field field--name-body field--type-text-with-summary field--label-hidden field__item">
                                    <div className="block-tinh-gia-ve ms-lg-2">
                                        <div id="block-blocktinhgiave" className="block block-vinno-webdulich block-tinhgiave">
                                            <div className="d-flex justify-content-between p-3 block-giave-header">
                                                <div className="">Số hành khách</div>
                                                <div id="so-nguoi" className="fw-bolder"></div>
                                            </div>
                                            <div className="row px-3 py-2">
                                                <div className="col-6">
                                                    <div>Người lớn</div>
                                                    <div>Trẻ em</div>
                                                    <div>Trẻ nhỏ</div>
                                                    <div>Sơ sinh</div>
                                                </div>
                                                <div className="col-2">
                                                    <div>x{data.adult ? data.adult : 0}</div>
                                                    <div>x{data.children ? data.children : 0}</div>
                                                    <div>x{data.baby ? data.baby : 0}</div>
                                                    <div>x{data.newborn ? data.newborn : 0}</div>
                                                </div>
                                            </div>
                                            <div className="datcho-btn px-3 py-2" onClick={handleSave}>
                                                <div className="btn py-2" >Đặt giữ chỗ ngay</div>
                                            </div>
                                            <div className="form-delaisdt px-3 py-2">
                                                <div className="row">
                                                    <div className="col-3">
                                                        <img
                                                            src="https://hanoitourist.vn/images/delaisdt.svg" />
                                                    </div>
                                                    <div className="col-9">
                                                        <div className="fw-bolder">Để lại số điện thoại</div>
                                                        <div>Chúng tôi sẽ gọi tư vấn</div>
                                                    </div>

                                                    <div style={{ marginTop: 10, display: "flex" }}>
                                                        <input placeholder="Số điện thoại"
                                                            style={{ height: 30, border: "1px solid #e8e8e8", borderRadius: 5 }} type="text"
                                                            value={dataSP.phone}
                                                            onChange={(e) => {
                                                                setDataSP({
                                                                    ...dataSP,
                                                                    phone: e.target.value
                                                                })
                                                            }} />
                                                        <Button
                                                            sx={{ backgroundColor: "#291868", height: 30, marginLeft: 1 }} variant="contained"
                                                            onClick={() => {
                                                                handleSupport()
                                                            }}>
                                                            <ArrowForwardIcon />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </body >
    )
}
export default Booking;
