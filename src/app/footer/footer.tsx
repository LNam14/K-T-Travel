import { getCookie } from "cookies-next";
import { useState } from "react";
import FormLogin from "../component/forms/login/login";

const Footer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const token: any = getCookie("token");
    const openForm = () => {
        if (token) {

            window.location.replace("/admin/pages/dashboard");
        } else {
            setIsOpen(true);
        }
    };
    const closeForm = () => {
        setIsOpen(false);
    };
    return (
        <footer className="pt-20 pb-4">
            <div className="section-shape top-0" style={{ backgroundImage: "url(https://htmldesigntemplates.com/html/travelin/images/shape8.png)" }}></div>

            <div className="footer-upper pb-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 pe-4">
                            <div className="footer-about">
                                <img style={{ height: 70 }} src="/images/logo/LogoTrang.png" />
                                <ul style={{ marginTop: 50, display: "flex", flexDirection: "column" }}>
                                    <li className="white"><strong>Hotline:</strong>0964397779</li>
                                    <li className="white"><strong>Tel:</strong> (0262) 3 927 927</li>
                                    <li className="white"><strong>Địa chỉ:</strong>13 Phan Bội Châu, Phường Thắng Lợi, Tp. Buôn Ma Thuột, tỉnh Đắk Lắk</li>
                                    <li className="white"><strong>Email:</strong> <a href="https://htmldesigntemplates.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="167f7870795642647760737a7f783875797b">kttravel@gmail.com</a></li>
                                    <li className="white"><strong>Website:</strong> www.Travelin.com</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-12 mb-4">
                            <div className="footer-links">
                                <h3 className="white">Liên kết nhanh</h3>
                                <ul>
                                    <li><a href="#">Về chúng tôi</a></li>
                                    <li><a href="#">Chính sách bảo mật</a></li>
                                    <li><a href="#">Điều khoản &amp; điều kiện</a></li>
                                    <li><a href="#">Chính sách hoàn trả</a></li>
                                    <li><a onClick={openForm}>Đăng nhập</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-6 col-sm-12 mb-4">
                            <div className="footer-links">
                                <h3 className="white">Tour Trong Nước</h3>
                                <ul>
                                    <li onClick={() => {
                                        localStorage.setItem('location', JSON.stringify("Nha Trang"));
                                    }}><a href="/pages/tour">Du lịch Nha Trang</a></li>
                                    <li onClick={() => {
                                        localStorage.setItem('location', JSON.stringify("Sapa"));
                                    }}><a href="/pages/tour">Du lịch Sapa</a></li>
                                    <li onClick={() => {
                                        localStorage.setItem('location', JSON.stringify("Hà Nội"));
                                    }}><a href="/pages/tour">Du lịch Hà Nội</a></li>
                                    <li onClick={() => {
                                        localStorage.setItem('location', JSON.stringify("Hà Giang"));
                                    }}><a href="/pages/tour">Du lịch Hà Giang</a></li>
                                    <li onClick={() => {
                                        localStorage.setItem('location', JSON.stringify("Phú Quốc"));
                                    }}><a href="/pages/tour">Du lịch Phú Quốc</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-12 mb-4">
                            <div className="footer-links">
                                <h3 className="white">Tour nước ngoài</h3>
                                <ul>
                                    <li onClick={() => {
                                        localStorage.setItem('location', JSON.stringify("Hàn Quốc"));
                                    }}><a href="/pages/tour">Du lịch Hàn Quốc</a></li>
                                    <li onClick={() => {
                                        localStorage.setItem('location', JSON.stringify("Nhật Bản"));
                                    }}><a href="/pages/tour">Du lịch Nhật Bản</a></li>
                                    <li onClick={() => {
                                        localStorage.setItem('location', JSON.stringify("Trung Quốc"));
                                    }}><a href="/pages/tour">Du lịch Trung Quốc</a></li>
                                    <li onClick={() => {
                                        localStorage.setItem('location', JSON.stringify("Singapore"));
                                    }}><a href="/pages/tour">Du lịch Singapore</a></li>
                                    <li onClick={() => {
                                        localStorage.setItem('location', JSON.stringify("Thái Lan"));
                                    }}><a href="/pages/tour">Du lịch Thái Lan</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-payment">
                <div className="container">
                    <div className="row footer-pay align-items-center justify-content-between text-lg-start text-center">
                        <div className="col-lg-8 footer-payment-nav mb-4">
                            <ul >
                                <li className="me-2">We Support:</li>
                                <li className="me-2"><i className="fab fa-cc-mastercard fs-4"></i></li>
                                <li className="me-2"><i className="fab fa-cc-paypal fs-4"></i></li>
                                <li className="me-2"><i className="fab fa-cc-stripe fs-4"></i></li>
                                <li className="me-2"><i className="fab fa-cc-visa fs-4"></i></li>
                                <li className="me-2"><i className="fab fa-cc-discover fs-4"></i></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container">
                    <div className="copyright-inner rounded p-3 d-md-flex align-items-center justify-content-between">
                        <div className="copyright-text">
                            <p className="m-0 white">© 2024 All rights reserved by Takatech</p>
                        </div>
                        <div className="social-links">
                            <ul>
                                <li><a href="https://www.facebook.com/takatechsoft"><i className="fab fa-facebook" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i className="fab fa-twitter" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i className="fab fa-linkedin" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <FormLogin open={isOpen} closeForm={closeForm} />
            <div id="particles-js"></div>
            <div className="float-contact">
                <div style={{ marginTop: 10, backgroundColor: "white", borderRadius: 6 }}>
                    <a href="https://zalo.me/0366946417" target="blank">
                        <img
                            alt="K&T Travel"
                            src="https://seeklogo.com/images/Z/zalo-logo-B0A0B2B326-seeklogo.com.png"
                            style={{ width: 40, height: 40 }}
                        />
                    </a>
                </div>
                <div style={{ marginTop: 10, marginBottom: 66 }}>
                    <a href="tel:0964397779" target="blank">
                        <img
                            alt="K&T Travel"
                            src="https://cdn-icons-png.flaticon.com/128/724/724664.png"
                            style={{ width: 40, height: 40 }}
                        />
                    </a>
                </div>
                {/* <div style={{ marginTop: 10 }}>
                    <a href="#" target="blank">
                        <img
                            alt="K&T Travel"
                            src="https://cdn-icons-png.flaticon.com/128/10024/10024466.png"
                            style={{ width: 40, height: 40 }}
                        />
                    </a>
                </div> */}
            </div>

            <div id="back-to-top">
                <a href="#"></a>
            </div>
        </footer>
    )
}
export default Footer;