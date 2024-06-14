"use client"
import { Box, Button, IconButton, Pagination, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ListIcon from '@mui/icons-material/List';
import FlightIcon from '@mui/icons-material/Flight';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import Edit from '@mui/icons-material/Edit';
import TourOption from '../../components/forms/tour/tour-options';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '@/app/redux-store/hook';
import { deleteTourAsync, getTourAsync, getTourList } from '@/app/redux-store/tour/slice';
import ViewDetails from '../../components/forms/tour/view-detail';
import { deleteLocationAsync, getLocationAsync, getLocationList } from '@/app/redux-store/location/slice';
import LocationOption from '../../components/forms/location/location-options';
import UpdateLocation from '../../components/forms/location/update_location';
interface LocationItem {
    id: number;
    name: string;
    area: string;
    tour_option: string;
}
const Tour = () => {
    const dispatch = useAppDispatch()
    const locationList: LocationItem[] = useAppSelector(getLocationList);
    const [locationListState, setLocationListState] = useState<LocationItem[]>([]);

    useEffect(() => {
        const asyncCall = async () => {
            await dispatch(getLocationAsync())
        }
        asyncCall()
    }, [])
    useEffect(() => {
        if (locationList) {
            setLocationListState(locationList);
        }
    }, [locationList]);
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
    const [showTravelOptions, setShowTravelOptions] = useState(false);
    const [showTravelOptionsNN, setShowTravelOptionsNN] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const newsListArray = Array.isArray(locationListState) ? locationListState : [];
    const totalPageCount = Math.ceil(newsListArray.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentNewsList = newsListArray.slice(startIndex, endIndex);
    const filterTourList = (tour_option: string, area: string) => {
        const filteredList = locationList.filter((tour) => {
            return tour.area === area;
        });


        setLocationListState(filteredList);
    };
    const allList = () => {
        setLocationListState(locationList);
    };

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        setCurrentPage(page);
    };
    const [isOpen, setIsOpen] = useState(false);

    const openOption = () => {
        setIsOpen(true);
    };
    const closeOption = () => {
        setIsOpen(false);
    };
    const [isOpenUD, setIsOpenUD] = useState(false);

    const closeOptionUD = () => {
        setIsOpenUD(false);
    };
    const [location, setLocation] = useState("");

    const openOptionUD = (location: any) => {
        setIsOpenUD(true);
        setLocation(location)
    };
    const handleDelete = async (id: number) => {
        await dispatch(deleteLocationAsync(id));
        await dispatch(getLocationAsync())

    }
    return (
        <div style={{
            marginTop: lgUp ? 30 : 10, display: "flex", flexDirection: lgUp ? "row" : "column",
            height: 570,
            overflow: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0, 0, 0, 0.1) transparent",
        }} >
            <div style={{
                width: lgUp ? "20%" : "100%", backgroundColor: "white",
                borderTopLeftRadius: 10, borderTopRightRadius: lgUp ? 0 : 10, borderBottomLeftRadius: 10, borderBottomRightRadius: lgUp ? 0 : 10,
                borderRight: "1px solid #e3e3e3"
            }}>
                <div >
                    <div style={{ borderBottom: "1px solid #e3e3e3" }}>
                        <div style={{
                            backgroundColor: "#0085DB",
                            marginLeft: 20,
                            marginRight: 20,
                            marginTop: 20,
                            borderRadius: 20,
                            marginBottom: 15,
                        }}>
                            <Button sx={{
                                fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                                fontSize: 16,
                                height: 35,
                                fontWeight: 400,
                                color: "#fff",
                                width: "100%",
                                borderRadius: 10,
                                display: "flex",
                                justifyContent: "center",
                                "&:hover": {
                                    backgroundColor: "#005892",
                                }
                            }}
                                onClick={openOption}
                            >Thêm mới</Button>
                        </div>
                        <div style={{
                            backgroundColor: "#fff",
                            borderRadius: 20,
                            height: 45,
                            marginLeft: 20,
                            marginRight: 20,
                            marginTop: 15,
                            marginBottom: 15,
                        }}>
                            <Button sx={{
                                fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                                fontSize: 14,
                                height: 45,
                                fontWeight: 400,
                                color: "#291868",
                                width: "100%",
                                borderRadius: 3,
                                display: "flex",
                                justifyContent: "start",
                                "&:hover": {
                                    backgroundColor: "#F6F9FC",
                                }

                            }}
                                onClick={() => {
                                    allList()
                                }}><ListIcon style={{ marginRight: 10 }} />Tất cả</Button>
                        </div>
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <span style={{
                            fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                            fontWeight: "bold",
                            display: "flex",
                            justifyContent: "start",
                            marginLeft: 30,
                        }}>Danh mục</span>
                        <div style={{
                            backgroundColor: "#fff",
                            borderRadius: 20,
                            height: 45,
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 15,
                        }}>
                            <Button sx={{
                                fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                                fontSize: 14,
                                height: 45,
                                fontWeight: 400,
                                color: "#291868",
                                width: "100%",
                                borderRadius: 3,
                                display: "flex",

                                justifyContent: "start",
                                "&:hover": {
                                    backgroundColor: "#F6F9FC",
                                }
                            }}
                                onClick={() => setShowTravelOptions(!showTravelOptions)}
                            ><FlightIcon style={{ marginRight: 10, }} />Du lịch trong nước  <ArrowDropDownRoundedIcon /> </Button>
                        </div>
                        <div style={{ transition: "showTravelOptions 0.3s ease-in-out", }}>
                            {showTravelOptions && (
                                <>
                                    <div style={{
                                        backgroundColor: "#fff",
                                        borderRadius: 20,
                                        height: 45,
                                        marginLeft: 10,
                                        marginRight: 10,
                                        marginTop: 5,
                                    }}>
                                        <Button sx={{
                                            fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                                            fontSize: 14,
                                            height: 45,
                                            fontWeight: 400,
                                            color: "#291868",
                                            width: "100%",
                                            borderRadius: 3,
                                            display: "flex",
                                            justifyContent: "start",
                                            "&:hover": {
                                                backgroundColor: "#F6F9FC",
                                            }
                                        }}
                                            onClick={() => {
                                                filterTourList("Trong Nước", "Miền Bắc")
                                            }}><FiberManualRecordOutlinedIcon style={{ marginRight: 10, marginLeft: 15, fontSize: 15 }} />Du lịch Miền Bắc</Button>
                                    </div>
                                    <div style={{
                                        backgroundColor: "#fff",
                                        borderRadius: 20,
                                        height: 45,
                                        marginLeft: 10,
                                        marginRight: 10,
                                        marginTop: 5,
                                    }}>
                                        <Button sx={{
                                            fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                                            fontSize: 14,
                                            height: 45,
                                            fontWeight: 400,
                                            color: "#291868",
                                            width: "100%",
                                            borderRadius: 3,
                                            display: "flex",
                                            justifyContent: "start",
                                            "&:hover": {
                                                backgroundColor: "#F6F9FC",
                                            }

                                        }}
                                            onClick={() => {
                                                filterTourList("Trong Nước", "Miền Trung")
                                            }}><FiberManualRecordOutlinedIcon style={{ marginRight: 10, marginLeft: 15, fontSize: 15 }} />Du lịch Miền Trung</Button>
                                    </div>
                                    <div style={{
                                        backgroundColor: "#fff",
                                        borderRadius: 20,
                                        height: 45,
                                        marginLeft: 10,
                                        marginRight: 10,
                                        marginTop: 5,
                                    }}>
                                        <Button sx={{
                                            fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                                            fontSize: 14,
                                            height: 45,
                                            fontWeight: 400,
                                            color: "#291868",
                                            width: "100%",
                                            borderRadius: 3,
                                            display: "flex",
                                            justifyContent: "start",
                                            "&:hover": {
                                                backgroundColor: "#F6F9FC",
                                            }

                                        }}
                                            onClick={() => {
                                                filterTourList("Trong Nước", "Miền Nam")
                                            }}><FiberManualRecordOutlinedIcon style={{ marginRight: 10, marginLeft: 15, fontSize: 15 }} />Du lịch Miền Nam</Button>
                                    </div>
                                </>
                            )}
                        </div>

                        <div style={{
                            backgroundColor: "#fff",
                            borderRadius: 20,
                            height: 45,
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 5,
                        }}>
                            <Button sx={{
                                fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                                fontSize: 14,
                                height: 45,
                                fontWeight: 400,
                                color: "#291868",
                                width: "100%",
                                borderRadius: 3,
                                display: "flex",
                                justifyContent: "start",
                                "&:hover": {
                                    backgroundColor: "#F6F9FC",
                                }

                            }}
                                onClick={() => setShowTravelOptionsNN(!showTravelOptionsNN)}
                            ><FlightIcon style={{ marginRight: 10, }} />Du lịch nước ngoài</Button>
                        </div>
                        <div style={{ transition: "showTravelOptions 0.3s ease-in-out", }}>
                            {showTravelOptionsNN && (
                                <>
                                    <div style={{
                                        backgroundColor: "#fff",
                                        borderRadius: 20,
                                        height: 45,
                                        marginLeft: 10,
                                        marginRight: 10,
                                        marginTop: 5,
                                    }}>
                                        <Button sx={{
                                            fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                                            fontSize: 14,
                                            height: 45,
                                            fontWeight: 400,
                                            color: "#291868",
                                            width: "100%",
                                            borderRadius: 3,
                                            display: "flex",
                                            justifyContent: "start",
                                            "&:hover": {
                                                backgroundColor: "#F6F9FC",
                                            }
                                        }}
                                            onClick={() => {
                                                filterTourList("Nước Ngoài", "Châu Á")
                                            }}><FiberManualRecordOutlinedIcon style={{ marginRight: 10, marginLeft: 15, fontSize: 15 }} />Du lịch Châu Á</Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{
                backgroundColor: "white", width: lgUp ? "80%" : "100%",
                marginTop: lgUp ? 0 : 10,
                borderTopLeftRadius: lgUp ? 0 : 10,
                borderTopRightRadius: 10,
            }}>
                <div style={{
                    borderBottom: "1px solid #e3e3e3",
                    paddingTop: lgUp ? 20 : 5, paddingBottom: lgUp ? 20 : 5, paddingLeft: 20,

                }}>
                    <span style={{
                        fontSize: 20,
                        fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                        fontWeight: "bold"
                    }}>Danh sách điểm đến</span>
                </div>
                {lgUp ? <table style={{
                    width: "98%",
                    fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                    borderCollapse: "collapse",
                    overflowY: "auto",
                    display: "block",
                    tableLayout: "fixed",
                    paddingLeft: 10, paddingRight: 10, paddingTop: 40, paddingBottom: 40,
                    marginLeft: 10, marginTop: 10,
                    borderRadius: 10,
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
                }}>
                    <thead style={{ borderBottom: "1px solid #e3e3e3", }}>
                        <tr>
                            <th style={{ width: 250, textAlign: "start" }}>ID</th>
                            <th style={{ width: 250, textAlign: "start" }}>Địa điểm</th>
                            <th style={{ width: 250, textAlign: "start" }}>Khu vực</th>
                            <th style={{ width: 250, textAlign: "start" }}>Loại Tour</th>
                            <th style={{ width: 250, textAlign: "start" }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(currentNewsList) && currentNewsList.length > 0 && (
                            currentNewsList.map((location: any, index: number) => (
                                <tr key={index}>
                                    <td style={{ width: 250, textAlign: "start" }}>{location.id}</td>
                                    <td style={{ width: 250, textAlign: "start" }}>{location.name}</td>
                                    <td style={{ width: 250, textAlign: "start" }}>{location.area}</td>
                                    <td style={{ width: 250, textAlign: "start" }}>{location.tour_option}</td>
                                    <td style={{ display: "flex", marginLeft: 5 }}>
                                        <IconButton
                                            sx={{ color: "#0085DB" }}
                                            onClick={() => {
                                                openOptionUD(location)
                                            }}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            sx={{ color: "#0085DB" }}
                                            onClick={() => {
                                                handleDelete(location.id)
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>
                    <Box display="flex" justifyContent="center" mt={3}>
                        <Pagination
                            count={totalPageCount}
                            shape="rounded"
                            variant="outlined"
                            page={currentPage}
                            onChange={handlePageChange}
                        />
                    </Box>
                </table> :

                    <div style={{ display: "flex", flexDirection: "column", paddingBottom: 20, fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif" }}>


                    </div>
                }
            </div>
            <LocationOption open={isOpen} closeForm={closeOption} />
            <UpdateLocation open={isOpenUD} closeForm={closeOptionUD} location={location} />
        </div >
    );
};

export default Tour;
