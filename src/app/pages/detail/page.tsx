"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button, Typography, useMediaQuery } from "@mui/material";
import Header from "@/app/header/header";
import Footer from "@/app/footer/footer";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HailIcon from '@mui/icons-material/Hail';
import ArrowForwardIcon from '@mui/icons-material/ArrowRightAlt';
import { useAppDispatch } from "@/app/redux-store/hook";
import { createSupportAsync } from "@/app/redux-store/support/slice";
interface LooseObject {
    [key: string]: any;
}
const Detail = () => {
    const dispatch = useAppDispatch()
    const [tourTN, setTourTN] = useState<any>(null);
    useEffect(() => {
        const storedNewsItem = localStorage.getItem("tour");
        if (storedNewsItem) {
            setTourTN(JSON.parse(storedNewsItem));
            setDataSP({
                ...dataSP,
                title_tour: JSON.parse(storedNewsItem).title
            })
        }
    }, []);
    const settingsMain = {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
    const [dataSP, setDataSP] = useState<LooseObject>({
        phone: "",
        title_tour: "",
    });
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
            <div className="layout-container breadcrumb-zone">
                <div className="region region-breadcrumb">
                    <div id="block-configbreadcumb"
                        className="block block-block-content block-block-contentdf6dd095-56c9-41d8-9b7d-ecbd678f625b">
                        <div
                            className="clearfix text-formatted field field--name-body field--type-text-with-summary field--label-hidden field__item">
                            <div className="container">
                                <div id="block-hanoitourist-breadcrumbs"
                                    className="block block-system block-system-breadcrumb-block">
                                    <nav className="breadcrumb" role="navigation" aria-labelledby="system-breadcrumb">
                                        <ul>
                                            <li> <a href="#">Home</a></li>
                                            <li> <a href="#">{tourTN ? tourTN.tour_option : ""}</a></li>
                                            <li> <a href="#">{tourTN ? tourTN.area : ""}</a></li>
                                            <li> <a href="#">{tourTN ? tourTN.end_location : ""}</a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="trending pt-6 pb-0 bg-lgrey">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="single-content">
                                <div id="highlight">
                                    <div className="single-full-title border-b mb-2 pb-2">
                                        <div className="single-title">
                                            <h2 className="mb-1">{tourTN ? tourTN.title : ""}</h2>
                                            <div className="rating-main d-md-flex align-items-center">
                                                <p className="mb-0 me-2"><LocationOnIcon /> Du lịch {tourTN ? tourTN.end_location : ""}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {tourTN ? (
                                        tourTN.image.length === 1 ? (
                                            <div>
                                                <a href={tourTN.image[0].image_url}>
                                                    <img
                                                        src={tourTN.image[0].image_url}
                                                        width="1800"
                                                        height="960"
                                                        alt={`Image ${tourTN.image[0].id}`}
                                                        className="img-fluid"
                                                    />
                                                </a>
                                            </div>
                                        ) : (
                                            <Slider {...settingsMain}>
                                                {tourTN.image.map((item: any, index: any) => (
                                                    <div key={index}>
                                                        <a href={item.image_url}>
                                                            <img
                                                                src={item.image_url}
                                                                width="1800"
                                                                height="960"
                                                                alt={`Image ${item.id}`}
                                                                className="img-fluid"
                                                            />
                                                        </a>
                                                    </div>
                                                ))}
                                            </Slider>
                                        )
                                    ) : null}

                                    <div
                                        className="field field--name-field-tour-menu-markup field--type-markup field--label-hidden field__item">
                                        <div className="menu-tour d-none d-lg-block" id="menu-tour">
                                            <nav role="navigation" aria-labelledby="block-menuthongtintour-menu"
                                                id="block-menuthongtintour"
                                                className="block block-menu navigation menu--menu-thong-tin-tour">
                                                <h2 className="visually-hidden" id="block-menuthongtintour-menu">Menu
                                                    Thông tin Tour</h2>
                                                <ul className="menu">
                                                    <li className="menu-item"> <a href="#block-blocktourtitle">Điểm nổi
                                                        bật</a></li>
                                                    <li className="menu-item"> <a href="#lichtrinh">Lịch trình</a></li>
                                                    <li className="menu-item"> <a href="#baogom">Dịch vụ bao gồm</a>
                                                    </li>
                                                    <li className="menu-item"> <a href="#khongbaogom">Dịch vụ không bao gồm</a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>

                                    <div
                                        className="field field--name-field-tour-content-markup field--type-markup field--label-hidden field__item">
                                        <div id="diemnoibat" className="tour-diemnoibat">
                                            <div className="views-element-container block block-views block-views-blocktour-block-4"
                                                id="block-views-block-tour-block-4">
                                                <div>
                                                    <div
                                                        className="diemnoibat view view-tour view-id-tour view-display-id-block_4 js-view-dom-id-650b872c8b5dc8b45a02a2683bf901f26e8809a495e5912cbc0342158e9da7b6">
                                                        <div className="view-header">
                                                            <div className="header-tour">
                                                                <h3>Điểm nổi bật</h3>
                                                            </div>
                                                        </div>
                                                        {tourTN ? tourTN.highlights.map((item: any, index: any) => (
                                                            <div className="views-row" key={index}>
                                                                <div className="views-field views-field-field-tour-noibat">
                                                                    <div className="field-content">
                                                                        <div className="noibat-item">
                                                                            <i className="fa fa-check-circle-o c-green" aria-hidden="true"></i>
                                                                            <span className="ms-2">{item.content}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="lichtrinh" className="tour-lichtrinh">
                                            <div className="views-element-container block block-views block-views-blocktour-block-5"
                                                id="block-views-block-tour-block-5">
                                                <div>
                                                    <div
                                                        className="lichtrinh view view-tour view-id-tour view-display-id-block_5 js-view-dom-id-3f40407f0113aea3c23cec599e608c919999d0104a1216fc26a47db3f55485b2">
                                                        <div className="view-header">
                                                            <div className="header-tour">
                                                                <h3>Lịch trình</h3>
                                                            </div>
                                                        </div>
                                                        <Typography
                                                            sx={{
                                                                color: "#333",
                                                                fontSize: 14,
                                                                marginTop: 2,
                                                            }}
                                                            dangerouslySetInnerHTML={{
                                                                __html: tourTN ? tourTN.itinerary : "",
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="baogom" className="tour-baogom">
                                            <div className="views-element-container block block-views block-views-blocktour-block-6"
                                                id="block-views-block-tour-block-6">
                                                <div>
                                                    <div
                                                        className="baogom view view-tour view-id-tour view-display-id-block_6 js-view-dom-id-990b6810fcd1fc4822fb5d9546a7b7d92b6d6b3bc392eafb11f6ee27bc278bd9">
                                                        <div className="view-header">
                                                            <div className="header-tour">
                                                                <h3>Dịch vụ bao gồm</h3>
                                                            </div>
                                                        </div>
                                                        {tourTN ? tourTN.services_included.map((item: any, index: any) => (
                                                            <div className="views-row" key={index}>
                                                                <div
                                                                    className="views-field views-field-field-tour-dvbaogom">
                                                                    <div className="field-content">
                                                                        <div className="baogom-item d-flex"
                                                                            style={{ display: "block", flexDirection: "column" }}>

                                                                            <p style={{ marginLeft: 20 }}>
                                                                                <span>{item.content}</span></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="khongbaogom" className="tour-khongbaogom">
                                            <div className="views-element-container block block-views block-views-blocktour-block-7"
                                                id="block-views-block-tour-block-7">
                                                <div>
                                                    <div
                                                        className="khongbaogom view view-tour view-id-tour view-display-id-block_7 js-view-dom-id-f226f236226253a3802f16089dc00c381f9c470b0edac6ca9b5429f3514199ff">
                                                        <div className="view-header">
                                                            <div className="header-tour">
                                                                <h3>Dịch vụ không bao gồm</h3>
                                                            </div>
                                                        </div>
                                                        {tourTN ? tourTN.services_exclusions.map((item: any, index: any) => (
                                                            <div className="views-row" key={index}>
                                                                <div
                                                                    className="views-field views-field-field-tour-dvbaogom">
                                                                    <div className="field-content">
                                                                        <div className="baogom-item d-flex"
                                                                            style={{ display: "block", flexDirection: "column" }}>

                                                                            <p style={{ marginLeft: 20 }}>
                                                                                <span>{item.content}</span></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="dieukien" className="tour-dieukien">
                                            <div className="views-element-container block block-views block-views-blocktour-block-11"
                                                id="block-views-block-tour-block-11">
                                                <div>
                                                    <div
                                                        className="ghichu view view-tour view-id-tour view-display-id-block_11 js-view-dom-id-5ca859bca0109c84f7fb62aa6551d83073906a652c3185d218174e533e60d902">
                                                        <div className="view-header">
                                                            <div className="header-tour">
                                                                <h3>Điều kiện</h3>
                                                            </div>
                                                        </div>
                                                        <div className="views-row">
                                                            <div
                                                                className="views-field views-field-field-tour-dieukien">
                                                                <div className="field-content">
                                                                    <div className="baogom-item d-flex"><i
                                                                        className="fa fa-check-circle-o c-green mt-1"
                                                                        aria-hidden="true"></i><span
                                                                            className="ms-2">
                                                                            <p><span><b>ĐIỀU KIỆN HỦY
                                                                                TOUR</b></span>
                                                                            </p>
                                                                            <p><span>- Sau khi đăng ký, quý
                                                                                khách huỷ sẽ bị mất phần
                                                                                tiền cọc.</span>
                                                                            </p>
                                                                            <p><span>- Từ sau 15 ngày đến trước
                                                                                10 ngày, phí hoàn là 50% giá
                                                                                tour trọn gói. Không hoàn vé
                                                                                máy bay</span></p>
                                                                            <p><span>- Từ sau 10 ngày đến trước
                                                                                7 ngày, phí hoàn là 70% giá
                                                                                tour trọn gói. Không hoàn vé
                                                                                máy bay</span></p>
                                                                            <p><span>- Trong khoảng 7 ngày trước
                                                                                ngày khởi hành, phí hoàn là
                                                                                100% giá tour trọn gói.
                                                                                Không hoàn vé máy bay</span>
                                                                            </p>
                                                                            <p><span>- Xin lưu ý: Các ngày nêu
                                                                                trên chỉ tính theo ngày làm
                                                                                việc.</span></p>
                                                                        </span></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="ghichu" className="tour-ghichu">
                                            <div className="views-element-container block block-views block-views-blocktour-block-8"
                                                id="block-views-block-tour-block-8">
                                                <div>
                                                    <div
                                                        className="ghichu view view-tour view-id-tour view-display-id-block_8 js-view-dom-id-7e9ce8607383aa17ec113d9196f758e6b4d6a56cd0d758fedd0af0fa4c162430">
                                                        <div className="view-header">
                                                            <div className="header-tour">
                                                                <h3 >Ghi chú</h3>
                                                            </div>
                                                        </div>
                                                        <div className="view-content">
                                                            <div className="views-row">
                                                                <div
                                                                    className="views-field views-field-field-tour-note">
                                                                    <div className="field-content">
                                                                        <div className="ghichu-item d-flex"><i
                                                                            className="fa fa-check-circle-o c-green pt-1"
                                                                            aria-hidden="true"></i><span
                                                                                className="ms-2">

                                                                                <p><span>Lưu ý:</span></p>
                                                                                <p><span>  ● Thứ tự các điểm
                                                                                    thăm quan có thể thay đổi
                                                                                    để phù hợp với chương
                                                                                    trình thực tế của đoàn
                                                                                    song vẫn đảm bảo đầy đủ
                                                                                    các điểm thăm quan.</span>
                                                                                </p>
                                                                                <p><span><strong><u>Giá vé dành
                                                                                    cho trẻ
                                                                                    em:</u></strong></span>
                                                                                </p>
                                                                                <p><span>- Trường hợp du khách
                                                                                </span>Trẻ em dưới 02 tuổi: miễn
                                                                                    phí. Cha, Mẹ hoặc người thân đi
                                                                                    kèm tự lo các chi phí ăn, ngủ,
                                                                                    tham quan (nếu có) cho bé.</p>
                                                                                <p><span>Trường hợp du khách
                                                                                </span>không đạt visa do Đại Sứ
                                                                                    Quán từ chối:</p>
                                                                                <ul>
                                                                                    <li><span>- Trẻ em từ 02 – dưới
                                                                                        05 tuổi: 100% giá vé máy
                                                                                        bay; miễn giá tour. Cha,
                                                                                        Mẹ hoặc người thân đi
                                                                                        kèm tự lo các chi phí
                                                                                        ăn, ngủ, tham quan (nếu
                                                                                        có) cho bé. Hai người
                                                                                        lớn chỉ kèm 1 trẻ em
                                                                                        dưới 5 tuổi, trẻ em thứ
                                                                                        2 trở lên phải mua ½ vé
                                                                                        tour.</span>
                                                                                    </li>
                                                                                    <li><span>- Trẻ em từ 05 – dưới
                                                                                        11 tuổi: 100% giá vé máy
                                                                                        bay, 80% giá tour. Bao
                                                                                        gồm các dịch vụ ăn uống,
                                                                                        ghế ngồi trên xe và ngủ
                                                                                        chung với gia đình. Hai
                                                                                        người lớn chỉ được kèm 1
                                                                                        trẻ em từ 5 đến dưới 11
                                                                                        tuổi, trẻ em thứ 2 trở
                                                                                        lên Cha, Mẹ phải mua
                                                                                        thêm 1 suất giường đơn
                                                                                        hoặc 1 vé người
                                                                                        lớn.</span></li>
                                                                                    <li><span>- Trẻ em từ 11 tuổi
                                                                                        trở lên: 100% giá tour
                                                                                        và tiêu chuẩn như người
                                                                                        lớn.</span></li>
                                                                                </ul>
                                                                            </span></div>
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

                                <div
                                    className="field field--name-field-tour-title-comment-markup field--type-markup field--label-hidden field__item">
                                    <div id="block-tourcommenttitle"
                                        className="block block-vinno-webdulich block-tourcommenttitle">
                                        <div className="tour-comment-title py-3">
                                            <div
                                                className="d-flex align-items-center justify-content-between header-bl py-2">
                                                <div className="header-tour">
                                                    <h3>Khách hàng đánh giá/Review</h3>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div
                                                    className="col-12 col-lg-9 d-flex align-items-center rate-description">
                                                    Hãy cho chúng tôi biết cảm nhận của bạn, nó sẽ giúp chúng
                                                    tôi cải thiện tốt hơn trong những cuộc hành trình tiếp theo
                                                </div>
                                                <div className="col-12 col-lg-3 d-flex justify-content-end">
                                                    <div>
                                                        <div className="avg-tour-rate d-flex align-items-center">
                                                            <span className="me-2">0</span> <i
                                                                className="c-yellow fa fa-star"
                                                                aria-hidden="true"></i>
                                                        </div>
                                                        <div className="sum-tour-comment"><a className="use-ajax"
                                                            data-dialog-options='{"width":"70%","title":"Bình luận"}'
                                                            data-dialog-type="dialog"
                                                            href="">0
                                                            Bình luận <i className="fa fa-chevron-right"
                                                                aria-hidden="true"></i></a></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <section
                                    className="field field--name-field-tour-binhluan field--type-comment field--label-hidden comment-wrapper">
                                    <h2 className="title comment-form__title">Viết bình luận</h2>
                                    <form className="comment-comment-form comment-form"
                                        data-drupal-selector="comment-form"
                                        method="post" id="comment-form" accept-charset="UTF-8">
                                        <div className="required-fields field-group-html-element comment-tour"
                                            data-drupal-selector="edit-group-div">
                                            <div className="required-fields field-group-html-element d-flex tour-rate"
                                                data-drupal-selector="edit-group-row">
                                                <div className="field--type-markup field--name-field-comment-title-markup field--widget-markup js-form-wrapper form-wrapper"
                                                    data-drupal-selector="edit-field-comment-title-markup-wrapper"
                                                    id="edit-field-comment-title-markup-wrapper">
                                                    <div className="comment-block-header">Đánh giá của bạn</div>
                                                </div>
                                                <div className="field--type-fivestar field--name-field-comment-rate field--widget-fivestar-stars js-form-wrapper form-wrapper"
                                                    data-drupal-selector="edit-field-comment-rate-wrapper"
                                                    id="edit-field-comment-rate-wrapper">
                                                    <div
                                                        className="clearfix fivestar-none-text fivestar-average-stars fivestar-form-item fivestar-basic">
                                                        <div
                                                            className="js-form-item form-item js-form-type-fivestar form-type-fivestar js-form-item-field-comment-rate-0-rating form-item-field-comment-rate-0-rating">
                                                            <label >Đánh
                                                                giá</label>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div><input
                                            data-drupal-selector="form-fib1dx7wcvkghtvqhxbddegheuhxmrumpy8rdyhinj0"
                                            type="hidden" name="form_build_id"
                                            value="form-fiB1Dx7WCVKGHTVqHXbddeGHeUhXmRUMpy8rdyHinj0" /><input
                                            data-drupal-selector="edit-comment-comment-form" type="hidden"
                                            name="form_id" value="comment_comment_form" /><input
                                            data-drupal-selector="edit-value" type="hidden" name="value"
                                            value="%AutoEntityLabel%" />
                                        <div
                                            className="js-form-item form-item js-form-type-textfield form-type-textfield js-form-item-name form-item-name">
                                            <label >Tên của bạn</label> <input
                                                data-drupal-default-value="Ẩn danh" placeholder="Họ &amp; tên"
                                                data-drupal-selector="edit-name" type="text" id="edit-name"
                                                name="name" value=""
                                                className="form-text form-control" />
                                        </div>
                                        <div className="field--type-text-long field--name-comment-body field--widget-text-textarea js-form-wrapper form-wrapper"
                                            data-drupal-selector="edit-comment-body-wrapper"
                                            id="edit-comment-body-wrapper">
                                            <div
                                                className="js-text-format-wrapper text-format-wrapper js-form-item form-item">
                                                <div
                                                    className="js-form-item form-item js-form-type-textarea form-type-textarea js-form-item-comment-body-0-value form-item-comment-body-0-value">
                                                    <label
                                                        className="js-form-required form-required">Bài bình
                                                        luận</label>
                                                    <div className="form-textarea-wrapper"><textarea
                                                        className="js-text-full text-full form-textarea required form-control resize-vertical"
                                                        data-drupal-selector="edit-comment-body-0-value"
                                                        id="edit-comment-body-0-value"
                                                        name="comment_body[0][value]"
                                                        placeholder="Nội dung phản hồi"
                                                        aria-required="true"></textarea></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div data-drupal-selector="edit-actions"
                                            className="form-actions js-form-wrapper form-wrapper" id="edit-actions">
                                            <input data-drupal-selector="edit-submit" type="submit"
                                                id="edit-submit" name="op" value="Gửi bình luận"
                                                className="button button--primary js-form-submit form-submit btn btn-primary" />
                                        </div>
                                    </form>
                                </section>
                            </div>
                        </div>
                        <div className="col-lg-4 ps-lg-4">
                            <div className="sidebar-sticky sticky1">
                                <div className="tabs-navbar bg-lgrey mb-4 bordernone rounded overflow-hidden">
                                    <div className="row"
                                        style={{
                                            width: "100%",
                                            paddingBottom: 20, borderRadius: 5,
                                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                            color: "black",
                                            border: "1px solid #e8e8e8", marginLeft: lgUp ? 20 : 0
                                        }}>
                                        <div style={{ borderBottom: "1px dashed black", minHeight: 100, display: "flex", flexWrap: "wrap" }}>
                                            <div style={{ fontSize: 18, fontWeight: "bold", padding: 40, }}>{tourTN ? tourTN.title : ""}</div>
                                        </div>
                                        <div style={{ paddingLeft: 40, paddingTop: 10, paddingRight: 25 }}>
                                            <div style={{ fontSize: 16, marginTop: 8 }}><CalendarMonthIcon style={{ fontSize: 22 }} />  Ngày đi: <strong>{tourTN ? tourTN.start_date : ""}</strong></div>
                                            <div style={{ fontSize: 16, marginTop: 8 }}><CalendarMonthIcon style={{ fontSize: 22 }} />  Ngày về: <strong>{tourTN ? tourTN.end_date : ""}</strong></div>
                                            <div style={{ fontSize: 16, marginTop: 8 }}><LocationOnIcon style={{ fontSize: 22 }} />  Từ: <strong>{tourTN ? tourTN.start_location : ""}</strong></div>
                                            <div style={{ fontSize: 16, marginTop: 8 }}><HailIcon style={{ fontSize: 22 }} />  Số chỗ còn nhận: <strong>{tourTN ? tourTN.slot : ""}</strong></div>
                                            <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>

                                                <Button style={{ backgroundColor: "#291868", display: "flex", flexDirection: "column", width: "100%" }}
                                                    variant="contained"
                                                    onClick={() => {
                                                        window.location.href = "/pages/booking",
                                                            localStorage.setItem('booking', JSON.stringify(tourTN));
                                                    }}>

                                                    <Typography variant="button" display="block" style={{ fontSize: 16, fontWeight: "bold" }}>
                                                        ĐẶT GIỮ CHỖ NGAY
                                                    </Typography>
                                                    <Typography variant="button" display="block" style={{ fontSize: 14 }}>
                                                        Đặt ngày chưa cần thanh toán
                                                    </Typography>

                                                </Button>
                                            </div>
                                            <Button style={{ color: "#DB251A", borderColor: "#DB251A", width: "100%", marginTop: 20 }} variant="outlined" >
                                                <Typography variant="button" style={{ fontSize: 16 }}>
                                                    Hotline hỗ trợ: <span style={{ fontSize: 16, fontWeight: "bold" }}>0964397779</span>
                                                </Typography>
                                            </Button>
                                            <div style={{ marginTop: 20 }}>
                                                <div style={{ display: "flex", }}>
                                                    <img src="/images/icons/hotline.png" style={{ height: 60 }} />
                                                    <div style={{ fontSize: 16, marginLeft: 20, }}>
                                                        <div style={{ fontWeight: "bold" }}>Để lại số điện thoại</div>
                                                        <div>Chúng tôi sẽ gọi tư vấn</div>
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: 10, display: "flex" }}>
                                                    <input
                                                        value={dataSP.phone}
                                                        onChange={(e) => {
                                                            setDataSP({
                                                                ...dataSP,
                                                                phone: e.target.value
                                                            })
                                                        }}
                                                        placeholder="Nhập vào số điện thoại" style={{ height: 30, border: "1px solid #e8e8e8", borderRadius: 5 }} type="text" />
                                                    <Button
                                                        onClick={() => {
                                                            handleSupport()
                                                        }}
                                                        sx={{ backgroundColor: "#291868", height: 30, marginLeft: 1 }} variant="contained">
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
            </section>

            <Footer />
        </body>
    )
}
export default Detail;
