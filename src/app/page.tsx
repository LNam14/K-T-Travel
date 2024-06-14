"use client";

import Slider from 'react-slick';
import SurfingIcon from '@mui/icons-material/Surfing';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux-store/hook';
import { getLocationHotAsync, getLocationHotList } from './redux-store/location-hot/slice';
import { getTourAsync, getTourList } from './redux-store/tour/slice';
import { getLocationAsync, getLocationList } from './redux-store/location/slice';
import Header from './header/header';
import Footer from './footer/footer';
import { useMediaQuery } from '@mui/material';
interface LocationItem {
  id: number;
  name: string;
  area: string;
  tour_option: string;
}
interface LocationHotItem {
  id: number;
  name: string;
  tour_option: string;
  image_url: string;
}

interface TourItem {
  id: number;
  title: string;
  tour_option: string;
  start_date: string;
  end_date: string;
  slot: number;
  itinerary: string;
  area: string;
  start_location: string;
  image: {
    id: number;
    image_url: string;
    id_tour: number;
  }[];
  promotion: number;
}
const Dashboard = () => {
  const dispatch = useAppDispatch();

  const locationL: LocationItem[] = useAppSelector(getLocationHotList);
  const locationList: LocationItem[] = useAppSelector(getLocationList);
  const tourList: TourItem[] = useAppSelector(getTourList);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const [tourPromotion, setTourPromotion] = useState<TourItem[]>([]);
  const [locationListState, setLocationListState] = useState<LocationItem[]>([]);
  const [locationHotTN, setLocationHotTN] = useState<LocationHotItem[]>([]);
  const [locationHotNN, setLocationHotNN] = useState<LocationHotItem[]>([]);
  const [tourTN, setTourTN] = useState<TourItem[]>([]);
  const [tourNN, setTourNN] = useState<TourItem[]>([]);
  useEffect(() => {
    const asyncCall = async () => {
      await dispatch(getTourAsync())
      await dispatch(getLocationHotAsync())
      await dispatch(getLocationAsync())
    }
    asyncCall()
  }, [])
  useEffect(() => {
    if (locationL) {
      const tourInTN: any = locationL.filter(tour => tour.tour_option === "Trong Nước");
      setLocationHotTN(tourInTN);
      const tourInNN: any = locationL.filter(tour => tour.tour_option === "Nước Ngoài");
      setLocationHotNN(tourInNN);
    }
  }, [locationL]);
  useEffect(() => {
    if (tourList) {
      const tourInTN = tourList.filter(tour => tour.tour_option === "Trong Nước");
      setTourTN(tourInTN);
      const tourInNN = tourList.filter(tour => tour.tour_option === "Nước Ngoài");
      setTourNN(tourInNN);
      const tourInPromotion = tourList.filter(tour => tour.promotion == 1);
      setTourPromotion(tourInPromotion);
    }
  }, [tourList]);
  const handleSelect = (tour_option: string) => {
    const location = locationList.filter((location) => {
      return location.tour_option == tour_option
    })
    setLocationListState(location)
  }
  const [name, setName] = useState("");
  const settings = {
    slidesToShow: lgUp ? 3 : 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dot: false,
    arrows: false,
  };
  const settings1 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dot: false,
    arrows: false,
  };
  const settingsNN = {
    slidesToShow: lgUp ? 3 : 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dot: true,
    arrows: false,
  };
  const settingsTN = {
    slidesToShow: lgUp ? 3 : 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dot: true,
    arrows: false,
  };
  const settingsP = {
    slidesToShow: lgUp ? 3 : 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dot: true,
    arrows: false,
  };

  console.log("name", name);

  return (
    <html>
      <body>
        <Header />
        <div style={{ marginTop: lgUp ? 0 : 50 }}>
          <Slider {...settings1} >
            <img
              loading="lazy"
              src='./images/banner/Banner-01.jpg'
              width="2560" height="839" alt="" className="img-fluid" />
            <img
              loading="lazy"
              src='./images/banner/Banner-02.jpg'
              width="2560" height="839" alt="" className="img-fluid" />
            <img
              loading="lazy"
              src='./images/banner/Banner-03.jpg'
              width="2560" height="839" alt="" className="img-fluid" />
            <img
              loading="lazy"
              src='./images/banner/Banner-04.jpg'
              width="2560" height="839" alt="" className="img-fluid" />
            <img
              loading="lazy"
              src='./images/banner/Banner-05.jpg'
              width="2560" height="839" alt="" className="img-fluid" />
          </Slider>
        </div>
        <div className="form-main">

          <div className="container pt-4">
            <div className="row align-items-center form-content rounded position-relative ms-5 me-5 ">
              <div className="col-lg-2 p-0" style={{ marginTop: -10 }}>
                <h4 className="form-title form-title1 text-center p-4 py-4 white mb-0 rounded-start d-lg-flex align-items-center" style={{ backgroundColor: "#291868" }}>
                  <SurfingIcon style={{ fontSize: 24 }} />Find Your Holidays</h4>
              </div>
              <div className="col-lg-10 px-4">
                <div className="form-content-in d-lg-flex align-items-center">
                  <div className="form-group me-2">
                    <div className="input-box">
                      <select className="niceSelect" style={{ height: 40 }} onChange={(e) => {
                        handleSelect(e.target.value)
                      }}>
                        <option value="">Chọn Loại Tour</option>
                        <option value="Trong Nước">Tour Trong Nước</option>
                        <option value="Nước Ngoài">Tour Nước Ngoài</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group me-2">
                    <div className="input-box">
                      <select className="niceSelect" style={{ height: 40 }}>
                        <option value="">Chọn Điểm Đi</option>
                        <option value="1">Buôn Ma Thuột</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group me-2">
                    <div className="input-box">
                      <select className="niceSelect" style={{ height: 40 }} onChange={(e) => {
                        setName(e.target.value)
                      }}>
                        <option value="">Chọn Điểm Đến</option>
                        {locationListState.map((item, index) => (
                          <option key={index} value={item.name}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group mb-0 text-center"
                    onClick={() => {
                      localStorage.setItem('location', JSON.stringify(name));
                    }}>
                    <a href="/pages/tour" className="nir-btn w-100" style={{ backgroundColor: "#291868" }}><i className="fa fa-search mr-2"></i>Tìm Kiếm Tour</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {tourPromotion.length > 0 ?
          (
            <section className="trending pb-9">
              <div className="container">
                <div className="section-title mb-6 w-75 mx-auto text-center" >
                  <h4 className="mb-1 theme1">promotion</h4>
                  <h3 style={{ fontSize: 32 }} className="mb-1"><span className="theme">Tour ưu đãi</span></h3>
                </div>
                <div className="trend-box">
                  <div className="row">
                    {tourPromotion.length === 1 ? (
                      <div>
                        {tourPromotion.map((item, index) => (
                          <div key={index} className="col-lg-4 mb-4" onDoubleClick={() => {
                            localStorage.setItem('tour', JSON.stringify(item));
                            window.location.href = "/pages/detail";
                          }}>
                            <div className="trend-item1 rounded box-shadow bg-white" style={{ cursor: "pointer" }} >
                              <div className="trend-image position-relative">
                                {item.image && item.image.length > 0 && (
                                  <img style={{ height: lgUp ? 250 : 370 }} src={item.image[0].image_url} alt="image" />
                                )}
                                <div className="trend-content1 p-4">
                                  <h5 className="white mb-1"><i className="flaticon-location-pin"></i>{item.title}</h5>
                                  <h3 className="mb-1 white"><a href="https://htmldesigntemplates.com/html/travelin/tour-grid.html" className="white">
                                    Từ: <strong>{item.start_location}</strong></a></h3>
                                  <div className="entry-meta d-flex align-items-center justify-content-between">
                                    <div className="entry-author d-flex align-items-center">
                                      <p className="mb-0 white"> Còn: <span className="white fw-bold fs-5"> {item.slot} chỗ </span></p>
                                    </div>
                                    <div className="entry-author">
                                      <CalendarMonthIcon style={{ color: "white", marginBottom: 5, marginRight: 5 }} />
                                      <span className="fw-bold white">Ngày đi: {item.start_date}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="overlay"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Slider {...settingsP}>
                        {tourPromotion.map((item, index) => (
                          <div key={index} className="col-lg-4 mb-4" onDoubleClick={() => {
                            localStorage.setItem('tour', JSON.stringify(item));
                            window.location.href = "/pages/detail";
                          }}>
                            <div className="trend-item1 rounded box-shadow bg-white" style={{ cursor: "pointer" }} >
                              <div className="trend-image position-relative">
                                {item.image && item.image.length > 0 && (
                                  <img style={{ height: lgUp ? 370 : 250 }} src={item.image[0].image_url} alt="image" />
                                )}
                                <div className="trend-content1 p-4">
                                  <h5 className="white mb-1"><i className="flaticon-location-pin"></i>{item.title}</h5>
                                  <h3 className="mb-1 white"><a href="https://htmldesigntemplates.com/html/travelin/tour-grid.html" className="white">
                                    Từ: {item.start_location}</a></h3>
                                  <div className="entry-meta d-flex align-items-center justify-content-between">
                                    <div className="entry-author d-flex align-items-center">
                                      <p className="mb-0 white"> Còn: <span className="white fw-bold fs-5"> {item.slot} chỗ </span></p>
                                    </div>
                                    <div className="entry-author">
                                      <CalendarMonthIcon style={{ color: "white", marginBottom: 5, marginRight: 5 }} />
                                      <span className="fw-bold white">Ngày đi: {item.start_date}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="overlay"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    )}
                  </div>
                </div>
              </div>
            </section>) : (<></>)}
        {tourTN.length > 0 ? (
          <section className="trending bg-grey pt-10 pb-6">
            <div className="section-shape top-0" style={{ backgroundImage: "url(https://htmldesigntemplates.com/html/travelin/images/shape8.png)" }}></div>
            <div className="container">
              <div className="section-title mb-6 w-75 mx-auto text-center">
                <h4 className="mb-1 theme1">tourism</h4>
                <h3 style={{ fontSize: 32 }} className="mb-1"><span className="theme">Tour trong nước</span></h3>
              </div>
              <div className="trend-box">
                <div className="row item-slider">
                  {tourTN.length === 1 ? (
                    <div>
                      {tourTN.map((item, index) => (
                        <div key={index} className="col-lg-4 col-md-6 col-sm-6 mb-4" onDoubleClick={() => {
                          localStorage.setItem('tour', JSON.stringify(item));
                          window.location.href = "/pages/detail";
                        }}>
                          <div className="trend-item rounded box-shadow bg-white" style={{ cursor: "pointer" }} >
                            <div className="trend-image position-relative">
                              {item.image && item.image.length > 0 && (
                                <img style={{ height: 220 }} src={item.image[0].image_url} alt="image" />
                              )}
                              <div className="color-overlay"></div>
                            </div>
                            <div className="trend-content p-4 pt-5 position-relative">
                              <h5 className="theme mb-1"><i className="flaticon-location-pin"></i> {item.title}</h5>
                              <h3 className="mb-0"><a>Từ: <span className="theme fw-bold">{item.start_location}</span></a></h3>
                              <p className=" border-b pb-2 mb-2"></p>
                              <div className="entry-meta">
                                <div className="entry-author d-flex align-items-center">
                                  <p className="mb-0"><span className="theme fw-bold fs-6"> Ngày đi: {item.start_date} | Ngày về: {item.end_date}</span></p>
                                </div>
                                <p className="mb-0"><span className="theme fw-bold fs-6"> Số chỗ còn nhận: <span style={{ fontSize: 18, color: "red" }}>{item.slot}</span></span></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Slider {...settingsTN}>
                      {tourTN.map((item, index) => (
                        <div key={index} className="col-lg-4 col-md-6 col-sm-6 mb-4" onDoubleClick={() => {
                          localStorage.setItem('tour', JSON.stringify(item));
                          window.location.href = "/pages/detail";
                        }}>
                          <div className="trend-item rounded box-shadow bg-white" style={{ cursor: "pointer" }} >
                            <div className="trend-image position-relative">
                              {item.image && item.image.length > 0 && (
                                <img style={{ height: 220 }} src={item.image[0].image_url} alt="image" />
                              )}
                              <div className="color-overlay"></div>
                            </div>
                            <div className="trend-content p-4 pt-5 position-relative">
                              <h5 className="theme mb-1"><i className="flaticon-location-pin"></i> {item.title}</h5>
                              <h3 className="mb-0"><a href="#">Từ: <span className="theme fw-bold">{item.start_location}</span></a></h3>
                              <p className=" border-b pb-2 mb-2"></p>
                              <div className="entry-meta">
                                <div className="entry-author d-flex align-items-center">
                                  <p className="mb-0"><span className="theme fw-bold fs-6"> Ngày đi: {item.start_date} | Ngày về: {item.end_date}</span></p>
                                </div>
                                <p className="mb-0"><span className="theme fw-bold fs-6"> Số chỗ còn nhận: <span style={{ fontSize: 18, color: "red" }}>{item.slot}</span></span></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  )}
                </div>
              </div>
            </div>
          </section>) : (<></>)}
        {tourNN.length > 0 ? (
          <section className="trending bg-grey pt-10 pb-6">
            <div className="section-shape top-0" style={{ backgroundImage: "url(https://htmldesigntemplates.com/html/travelin/images/shape8.png)" }}></div>
            <div className="container">
              <div className="section-title mb-6 w-75 mx-auto text-center">
                <h4 className="mb-1 theme1">tourism</h4>
                <h3 style={{ fontSize: 32 }} className="mb-1"><span className="theme">Tour nước ngoài</span></h3>
              </div>
              <div className="trend-box">
                <div className="row item-slider">
                  {tourNN.length === 1 ? (
                    <div>
                      {tourNN.map((item, index) => (
                        <div key={index} className="col-lg-4 col-md-6 col-sm-6 mb-4" onDoubleClick={() => {
                          localStorage.setItem('tour', JSON.stringify(item));
                          window.location.href = "/pages/detail";
                        }}>
                          <div className="trend-item rounded box-shadow bg-white" style={{ cursor: "pointer" }} >
                            <div className="trend-image position-relative">
                              {item.image && item.image.length > 0 && (
                                <img style={{ height: 220 }} src={item.image[0].image_url} alt="image" />
                              )}
                              <div className="color-overlay"></div>
                            </div>
                            <div className="trend-content p-4 pt-5 position-relative">
                              <h5 className="theme mb-1"><i className="flaticon-location-pin"></i> {item.title}</h5>
                              <h3 className="mb-0"><a href="#">Từ: <span className="theme fw-bold">{item.start_location}</span></a></h3>
                              <p className=" border-b pb-2 mb-2"></p>
                              <div className="entry-meta">
                                <div className="entry-author d-flex align-items-center">
                                  <p className="mb-0"><span className="theme fw-bold fs-6"> Ngày đi: {item.start_date} | Ngày về: {item.end_date}</span></p>
                                </div>
                                <p className="mb-0"><span className="theme fw-bold fs-6"> Số chỗ còn nhận: <span style={{ fontSize: 18, color: "red" }}>{item.slot}</span></span></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Slider {...settingsNN}>
                      {tourNN.map((item, index) => (
                        <div key={index} className="col-lg-4 col-md-6 col-sm-6 mb-4" onDoubleClick={() => {
                          localStorage.setItem('tour', JSON.stringify(item));
                          window.location.href = "/pages/detail";
                        }}>
                          <div className="trend-item rounded box-shadow bg-white" style={{ cursor: "pointer" }} >
                            <div className="trend-image position-relative">
                              {item.image && item.image.length > 0 && (
                                <img style={{ height: 220 }} src={item.image[0].image_url} alt="image" />
                              )}
                              <div className="color-overlay"></div>
                            </div>
                            <div className="trend-content p-4 pt-5 position-relative">
                              <h5 className="theme mb-1"><i className="flaticon-location-pin"></i> {item.title}</h5>
                              <h3 className="mb-0"><a href="#">Từ: <span className="theme fw-bold">{item.start_location}</span></a></h3>
                              <p className=" border-b pb-2 mb-2"></p>
                              <div className="entry-meta">
                                <div className="entry-author d-flex align-items-center">
                                  <p className="mb-0"><span className="theme fw-bold fs-6"> Ngày đi: {item.start_date} | Ngày về: {item.end_date}</span></p>
                                </div>
                                <p className="mb-0"><span className="theme fw-bold fs-6"> Số chỗ còn nhận: <span style={{ fontSize: 18, color: "red" }}>{item.slot}</span></span></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  )}
                </div>
              </div>
            </div>
          </section>) : (<></>)}
        <section className="trending pb-3 pt-20">
          <div className="section-shape top-0" style={{ backgroundImage: "url(https://htmldesigntemplates.com/html/travelin/images/shape2.png)" }}></div>
          <div className="container">
            {locationHotTN.length > 0 ? (
              <div>
                <div className="section-title mb-6 w-75 mx-auto text-center">
                  <h4 className="mb-1 theme1">outstanding</h4>
                  <h3 style={{ fontSize: 32 }} className="mb-1"><span className="theme">Điểm đến nổi bật Trong Nước</span></h3>
                </div>
                {locationHotTN.length === 1 ? (
                  <div>
                    {
                      locationHotTN.map((item, index) => (
                        <div className="p-0 views-row" key={index}
                          onDoubleClick={() => {
                            localStorage.setItem('location', JSON.stringify(item.name));
                            window.location.href = "/pages/tour";
                          }}>
                          <div className="views-field views-field-nothing"><span
                            className="field-content">
                            <div className="diadiemthuvi-item"> <a>
                              <div className="diadiem-content position-relative">
                                <div className="diadiem-hinhanh">
                                  <img loading="lazy"
                                    src={item.image_url}
                                    width="1090" height="781" alt=""
                                    className="img-fluid image-style-wide" />
                                  <div className="diadiem-title position-absolute">{item.name}</div>
                                </div>
                              </div>
                            </a></div>
                          </span></div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <Slider {...settings}>
                    {locationHotTN.map((item, index) => (
                      <div className="p-0 views-row" key={index}
                        onDoubleClick={() => {
                          localStorage.setItem('location', JSON.stringify(item.name));
                          window.location.href = "/pages/tour";
                        }}>
                        <div className="views-field views-field-nothing"><span
                          className="field-content">
                          <div className="diadiemthuvi-item"> <a>
                            <div className="diadiem-content position-relative">
                              <div className="diadiem-hinhanh">
                                <img loading="lazy"
                                  src={item.image_url}
                                  width="1090" height="781" alt=""
                                  className="img-fluid image-style-wide" />
                                <div className="diadiem-title position-absolute">{item.name}</div>
                              </div>
                            </div>
                          </a></div>
                        </span></div>
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
            ) : (<></>)}
            {locationHotNN.length > 0 ? (
              <div style={{ marginTop: 100 }}>
                <div className="section-title mb-6 w-75 mx-auto text-center">
                  <h4 className="mb-1 theme1">outstanding</h4>
                  <h3 style={{ fontSize: 32 }} className="mb-1"><span className="theme">Điểm đến nổi bật nước ngoài</span></h3>
                </div>
                {locationHotNN.length === 1 ? (
                  <div >
                    {
                      locationHotNN.map((item, index) => (
                        <div className="p-0 views-row" key={index}
                          onDoubleClick={() => {
                            localStorage.setItem('location', JSON.stringify(item.name));
                            window.location.href = "/pages/tour";
                          }}>
                          <div className="views-field views-field-nothing"><span
                            className="field-content">
                            <div className="diadiemthuvi-item"> <a>
                              <div className="diadiem-content position-relative">
                                <div className="diadiem-hinhanh">
                                  <img loading="lazy"
                                    src={item.image_url}
                                    width="300" height="781" alt=""
                                    className="img-fluid image-style-wide" />
                                  <div className="diadiem-title position-absolute">{item.name}</div>
                                </div>
                              </div>
                            </a></div>
                          </span></div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <Slider {...settings}>
                    {locationHotNN.map((item, index) => (
                      <div className="p-0 views-row" key={index}
                        onDoubleClick={() => {
                          localStorage.setItem('location', JSON.stringify(item.name));
                          window.location.href = "/pages/tour";
                        }}>
                        <div className="views-field views-field-nothing"><span
                          className="field-content">
                          <div className="diadiemthuvi-item"> <a>
                            <div className="diadiem-content position-relative">
                              <div className="diadiem-hinhanh">
                                <img loading="lazy"
                                  src={item.image_url}
                                  width="1090" height="781" alt=""
                                  className="img-fluid image-style-wide" />
                                <div className="diadiem-title position-absolute">{item.name}</div>
                              </div>
                            </div>
                          </a></div>
                        </span></div>
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
            ) : (<></>)}
          </div>
        </section>

        <section className="our-partner pt-20 pb-5">
          <div className="section-shape top-0" style={{ backgroundImage: "url(https://htmldesigntemplates.com/html/travelin/images/shape-pat.png)" }}></div>
          <div className="container">
            <div className="section-title mb-6 w-75 mx-auto text-center">
              <h4 className="mb-1 theme1">Our Partners</h4>
              <h3 style={{ fontSize: 32 }} className="mb-1"><span className="theme">Đối tác của chúng tôi</span></h3>
            </div>
            <div className="row align-items-center partner-in partner-slider">
              <div className="col-md-3 col-sm-6">
                <div className="partner-item p-4 py-2 rounded bg-lgrey">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Logo-ngan-hang_7_resize.webp/600px-Logo-ngan-hang_7_resize.webp.png?20220725070857" />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="partner-item p-4 py-2 rounded bg-lgrey">
                  <img src="https://inkythuatso.com/uploads/thumbnails/800/2021/11/logo-tpbank-inkythuatso-01-10-15-48-05.jpg" />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="partner-item p-4 py-2 rounded bg-lgrey">
                  <img src="https://wikiland.vn/wp-content/uploads/logo-bac-a-1000x319.png" />
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="partner-item p-4 py-2 rounded bg-lgrey">
                  <img src="https://cdn.tuoitre.vn/thumb_w/1200/471584752817336320/2023/2/23/logo-vietcombank-inkythuatso-10-10-41-18-16771235759271889182462.jpg" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />

      </body>
    </html >
  );
};
export default Dashboard;
