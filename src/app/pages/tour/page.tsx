"use client";

import { useEffect, useState } from "react";
import Header from "@/app/header/header";
import Footer from "@/app/footer/footer";
import { useAppDispatch, useAppSelector } from "@/app/redux-store/hook";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { getTourAsync, getTourList } from "@/app/redux-store/tour/slice";
import { Box, Pagination } from "@mui/material";
import { getLocationAsync, getLocationList } from "@/app/redux-store/location/slice";
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
    end_location: string;
    image: {
        id: number;
        image_url: string;
        id_tour: number;
    }[];
    promotion: number;
}
interface LocationItem {
    id: number;
    name: string;
    area: string;
    tour_option: string;
}
const Detail = () => {
    const dispatch = useAppDispatch();
    const tourList: TourItem[] = useAppSelector(getTourList);
    const locationList: LocationItem[] = useAppSelector(getLocationList);
    const [locationName, setLocationName] = useState<any>(null);
    const [tourAll, setTourAll] = useState<TourItem[]>([]);
    const [locationListState, setLocationListState] = useState<LocationItem[]>([]);
    useEffect(() => {
        const asyncCall = async () => {
            await dispatch(getTourAsync())
            await dispatch(getLocationAsync())
        }
        asyncCall()
    }, [])
    useEffect(() => {
        const storedNewsItem = localStorage.getItem("location");
        if (storedNewsItem) {
            setLocationName(JSON.parse(storedNewsItem));
        }
    }, []);
    useEffect(() => {
        if (locationList) {
            const locationNameList: any = locationList.filter(location => location.name === locationName);
            setLocationListState(locationNameList)
        }
    }, [locationList]);
    useEffect(() => {
        if (tourList && locationName) {
            const tourInTN = tourList.filter(item => item.end_location === locationName);
            setTourAll(tourInTN);
        }
    }, [tourList, locationName]);

    console.log("locationListState", locationListState);


    const [isGrid, setIsGrid] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = isGrid ? 6 : 5;
    const newsListArray = Array.isArray(tourAll) ? tourAll : [];
    const totalPageCount = Math.ceil(newsListArray.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentNewsList = newsListArray.slice(startIndex, endIndex);
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        setCurrentPage(page);
    };
    return (
        <body>
            <Header />
            <section className="breadcrumb-main pb-14 pt-14" style={{ backgroundImage: "url(https://htmldesigntemplates.com/html/travelin/images/bg/bg1.jpg)" }}>
                <div className="section-shape section-shape1 top-inherit bottom-0" style={{ backgroundImage: "url(https://htmldesigntemplates.com/html/travelin/images/shape8.png)" }}></div>
                <div className="breadcrumb-outer">
                    <div className="container">
                        {locationListState.map((item, index) => (
                            <div className="breadcrumb-content text-center" key={index}>
                                <h1 style={{ fontSize: 40 }} className="mb-3">Tour {item.tour_option}</h1>
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb" style={{ fontSize: 20, display: "flex", justifyContent: "center", alignItems: "center", listStyle: "none", padding: 0, margin: 0 }}>
                                        <li className="breadcrumb-item active" aria-current="page">Du lịch {item.area}</li>
                                        <li className="breadcrumb-item"><a style={{ color: "white" }}>Du lịch {item.name}</a></li>
                                    </ul>
                                </nav>
                            </div>
                        ))}

                    </div>
                </div>
                <div className="dot-overlay"></div>
            </section>
            <section className="trending pt-6 pb-0 bg-lgrey">
                <div className="container">
                    <div className="list-results d-flex align-items-center justify-content-between">
                        <div className="list-results-sort">
                            <p className="m-0">Showing {startIndex + 1}-{endIndex} of {tourAll.length} results</p>
                        </div>
                        <div className="click-menu d-flex align-items-center justify-content-between">
                            <div className={`change-list ${!isGrid && "f-active"} me-2`} onClick={() => { setIsGrid(false) }}><a><i className="fa fa-bars rounded"></i></a></div>
                            <div className={`change-list ${isGrid && "f-active"} me-2`} onClick={() => { setIsGrid(true) }}><a><i className="fa fa-th rounded"></i></a></div>
                            {/* <div className="sortby d-flex align-items-center justify-content-between ml-2">
                                <select className="niceSelect">
                                    <option value="1">Sort By</option>
                                    <option value="2">Average rating</option>
                                    <option value="3">Price: low to high</option>
                                    <option value="4">Price: high to low</option>
                                </select>
                            </div> */}
                        </div>
                    </div>
                    {!isGrid ? (
                        <div className="destination-list">
                            {currentNewsList.map((item, index) => (
                                <div className="trend-full bg-white rounded box-shadow overflow-hidden p-3 mb-3" key={index}>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-3">
                                            <div className="trend-item2 rounded">
                                                {item.image && item.image.length > 0 && (
                                                    <img src={item.image[0].image_url} />
                                                )}
                                                <div className="color-overlay"></div>
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6">
                                            <div className="trend-content position-relative text-md-start text-center">
                                                {/* <small>6+ Hours | Full Day Tours</small> */}
                                                <h3 className="mb-1"><a>{item.title}</a></h3>
                                                <h6 className="theme mb-0"><FmdGoodIcon />  Tour {item.tour_option}</h6>
                                                <p className="mt-4 mb-0" style={{ color: "#291868" }}>Từ: <span style={{ fontSize: 18, fontWeight: "bold", }}>{item.start_location}</span></p>
                                                <p className="mt-1 mb-0" style={{ color: "#291868" }}>Ngày đi: <span style={{ fontSize: 18, fontWeight: "bold", }}>{item.start_date}</span></p>
                                                <p className="mt-1 mb-0" style={{ color: "#291868" }}>Ngày về: <span style={{ fontSize: 18, fontWeight: "bold", }}>{item.end_date}</span></p>
                                                <p className="mt-1 mb-0" style={{ color: "#291868" }}>Slot: <span style={{ fontSize: 18, fontWeight: "bold", }}>{item.slot}</span></p>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3">
                                            <div className="trend-content text-md-end text-center">
                                                <div className="rating">
                                                    <span className="fa fa-star checked"></span>
                                                    <span className="fa fa-star checked"></span>
                                                    <span className="fa fa-star checked"></span>
                                                    <span className="fa fa-star checked"></span>
                                                    <span className="fa fa-star checked"></span>
                                                </div>
                                                <small>100 Reviews</small>
                                                <div className="trend-price my-2">
                                                    <span className="mb-0">...</span>

                                                    <h3 className="mb-0">...</h3>
                                                    <small>..................................</small>
                                                </div>
                                                <a href="/pages/detail" className="nir-btn"
                                                    onClick={() => {
                                                        localStorage.setItem('tour', JSON.stringify(item));
                                                    }}>Xem chi tiết</a>
                                            </div>
                                        </div>
                                    </div>
                                </div >
                            ))}

                            <Box display="flex" justifyContent="center" mt={3}>
                                <Pagination
                                    count={totalPageCount}
                                    shape="rounded"
                                    variant="outlined"
                                    page={currentPage}
                                    onChange={handlePageChange}
                                />
                            </Box>
                        </div >
                    ) : (
                        <div className="row" >
                            {currentNewsList.map((item, index) => (
                                <div className="col-lg-4 col-md-6 mb-4" key={index}>
                                    <div className="trend-item rounded box-shadow">
                                        <div className="trend-image position-relative">
                                            {item.image && item.image.length > 0 && (
                                                <img style={{ height: 230 }} src={item.image[0].image_url} />
                                            )}
                                            <div className="color-overlay"></div>
                                        </div>
                                        <div className="trend-content p-4 pt-5 position-relative">
                                            <h5 className="theme mb-1"><i className="flaticon-location-pin"></i>{item.tour_option}</h5>
                                            <div style={{ height: 100 }}>
                                                <h3 className="mb-1" ><a href="tour-single.html">{item.title}</a></h3>
                                                <div className="rating-main d-flex align-items-center pb-2">
                                                    <div className="rating">
                                                        <span className="fa fa-star checked"></span>
                                                        <span className="fa fa-star checked"></span>
                                                        <span className="fa fa-star checked"></span>
                                                        <span className="fa fa-star checked"></span>
                                                        <span className="fa fa-star checked"></span>
                                                    </div>
                                                    <span className="ms-2">(12)</span>
                                                </div>
                                            </div>
                                            <p className=" border-b pb-2 mb-2">Từ: <span style={{ color: "#291868", fontSize: 18, fontWeight: "bold" }}>{item.start_location}</span></p>
                                            <div className="entry-meta">
                                                <div className="entry-author d-flex align-items-center">
                                                    <p className="mb-0">Ngày đi:<span className="theme fw-bold ">{item.start_date} </span> | Ngày về: <span className="theme fw-bold ">{item.start_date} </span></p>
                                                </div>
                                            </div>
                                            <p className="pb-2 mb-2">Slot: <span style={{ color: "#291868", fontSize: 18, fontWeight: "bold" }}>{item.slot}</span></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Box display="flex" justifyContent="center" mt={3}>
                                <Pagination
                                    count={totalPageCount}
                                    shape="rounded"
                                    variant="outlined"
                                    page={currentPage}
                                    onChange={handlePageChange}
                                />
                            </Box>
                        </div >
                    )}
                </div >
            </section >

            <Footer />
        </body >
    )
}
export default Detail;
