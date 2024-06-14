"use client"
import { Box, Button, IconButton, Pagination, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ListIcon from '@mui/icons-material/List';
import FlightIcon from '@mui/icons-material/Flight';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import Edit from '@mui/icons-material/Edit';
import TourOption from '../../components/forms/tour/tour-options';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '@/app/redux-store/hook';
import { deleteTourAsync, getTourAsync, getTourList, updatePromotionAsync } from '@/app/redux-store/tour/slice';
import ViewDetails from '../../components/forms/tour/view-detail';
interface TourItem {
    id: number;
    title: string;
    tour_option: string;
    start_date: string;
    end_date: string;
    slot: number;
    itinerary: string;
    area: string;
    promotion: number;
}
const Tour = () => {
    const dispatch = useAppDispatch()
    const tourList: TourItem[] = useAppSelector(getTourList);
    const [tourListState, setTourListState] = useState<TourItem[]>([]);
    useEffect(() => {
        const asyncCall = async () => {
            await dispatch(getTourAsync())
        }
        asyncCall()
    }, [])
    useEffect(() => {
        if (tourList) {
            setTourListState(tourList);
        }
    }, [tourList]);
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
    const [showTravelOptions, setShowTravelOptions] = useState(false);
    const [showTravel, setShowTravel] = useState([false, false]);

    const toggleTravel = (index: any) => {
        const newShowTravel = [...showTravel];
        newShowTravel[index] = !newShowTravel[index];
        setShowTravel(newShowTravel);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const newsListArray = Array.isArray(tourListState) ? tourListState : [];
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

    const [isOpen, setIsOpen] = useState(false);

    const openOption = () => {
        setIsOpen(true);
    };
    const closeOption = () => {
        setIsOpen(false);
    };

    const [isOpenV, setIsOpenV] = useState(false);
    const [travel, setTravel] = useState("");

    const openView = (travel: any) => {
        setIsOpenV(true);
        setTravel(travel)
    };
    const closeView = () => {
        setIsOpenV(false);
    };

    const filterTourList = (area: string) => {
        const filteredList = tourList.filter((tour) => {
            return tour.area === area;
        });
        setTourListState(filteredList);
    };
    const filterPromotionTourList = (promotion: number) => {
        const filteredList = tourList.filter((tour) => {
            return tour.promotion === promotion;
        });
        setTourListState(filteredList);
    };
    const allList = () => {
        setTourListState(tourList);
    }
    const truncateText = (text: any, maxLength: any) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };

    const handleDelete = async (id: number) => {
        const isConfirmed = window.confirm("Bạn có muốn xóa không tour này không ?");
        if (isConfirmed) {
            await dispatch(deleteTourAsync(id));
            await dispatch(getTourAsync())
        }
    }
    const handleUpdatePromotion = async (promotion: number, id: number) => {
        let alertMessage: string = "";
        if (promotion === 0) {
            alertMessage = "Thêm vào Tour ưu đãi";
        } else {
            alertMessage = "Xóa khỏi Tour ưu đãi";
        }
        const confirmed = window.confirm(alertMessage);
        if (confirmed) {
            let newPromotion: number;
            if (promotion === 1) {
                newPromotion = 0;
            } else {
                newPromotion = 1;
            }

            await dispatch(updatePromotionAsync({ newPromotion, id }));

            console.log(promotion, newPromotion, id);

            await dispatch(getTourAsync());
        } else {
            console.log("Promotion update cancelled.");
        }
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
                            >Thêm mới Tour</Button>
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
                                                filterTourList("Miền Bắc")
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
                                                filterTourList("Miền Trung")
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
                                                filterTourList("Miền Nam")
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
                                onClick={() => {
                                    filterTourList("Châu Á")
                                }}><FlightIcon style={{ marginRight: 10, }} />Du lịch nước ngoài</Button>
                        </div>
                        <div style={{
                            backgroundColor: "#fff",
                            borderRadius: 20,
                            height: 45,
                            marginLeft: 10,
                            marginRight: 20,
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
                                onClick={() => { filterPromotionTourList(1) }}
                            ><StarIcon style={{ marginRight: 10, }} />Tour Ưu đãi</Button>
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
                    }}>Danh sách Tour</span>
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
                            <th style={{ width: "4%", textAlign: "start" }}>ID</th>
                            <th style={{ width: "9%", textAlign: "start" }}>Title</th>
                            <th style={{ width: "10%", textAlign: "start" }}>Ngày đi</th>
                            <th style={{ width: "10%", textAlign: "start" }}>Ngày về</th>
                            <th style={{ width: "10%", textAlign: "start" }}>Điểm đi</th>
                            <th style={{ width: "10%", textAlign: "start" }}>Điểm đến</th>
                            <th style={{ width: "5%", textAlign: "start" }}>Slot</th>
                            <th style={{ width: "8%", textAlign: "center" }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(currentNewsList) && currentNewsList.length > 0 && (
                            currentNewsList.map((travel: any, index: number) => (
                                <tr key={index}>
                                    <td style={{ width: "4%", textAlign: "start" }}>{truncateText(travel.id, 13)}</td>
                                    <td style={{ width: "9%", textAlign: "start" }}>{truncateText(travel.title, 8)}</td>
                                    <td style={{ width: "10%", textAlign: "start" }}>{truncateText(travel.start_date, 13)}</td>
                                    <td style={{ width: "10%", textAlign: "start" }}>{truncateText(travel.end_date, 13)}</td>
                                    <td style={{ width: "10%", textAlign: "start" }}>{truncateText(travel.start_location, 13)}</td>
                                    <td style={{ width: "10%", textAlign: "start" }}>{truncateText(travel.end_location, 13)}</td>
                                    <td style={{ width: "5%", textAlign: "start" }}>{truncateText(travel.slot, 13)}</td>
                                    <td style={{ display: "flex", justifyContent: "center" }}>
                                        <IconButton
                                            sx={{ color: "#0085DB" }}
                                            onClick={() => {
                                                openView(travel)
                                            }}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            sx={{ color: "#0085DB" }}
                                            onClick={() => {
                                                handleDelete(travel.id)
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton
                                            sx={{ color: "#0085DB" }}
                                            onClick={() => {
                                                handleUpdatePromotion(travel.promotion, travel.id)
                                            }}>
                                            {travel.promotion == 1 ? <StarIcon /> : <StarBorderIcon />}
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
                        {Array.isArray(tourListState) && tourListState.length > 0 ? (
                            <div>
                                {tourListState.map((travel: any, index: number) => (
                                    <div key={index}>
                                        <div style={{ backgroundColor: "white", height: 50, border: "1px solid #F6F9FC", marginLeft: 10, marginRight: 10, marginTop: 10, display: "flex", justifyContent: "space-between" }} onClick={() => toggleTravel(index)}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <div style={{ marginRight: 10, marginLeft: 10, fontWeight: "bold" }}>{truncateText(travel.title, 40)}</div>
                                                <div>({travel.date_start},{travel.date_end})</div>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <ArrowDropDownRoundedIcon />
                                                </div>
                                            </div>
                                        </div>
                                        {showTravel[index] &&
                                            <div style={{ marginLeft: 10, marginRight: 10, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", padding: 5, marginTop: 5, marginBottom: 10, borderRadius: 10, display: "flex", justifyContent: "space-between", height: 210 }}>
                                                <div style={{ width: "50%" }}>
                                                    <Typography fontWeight="bold">ID</Typography>
                                                    <Typography fontWeight="bold">Title</Typography>
                                                    <Typography fontWeight="bold">Ngày đi</Typography>
                                                    <Typography fontWeight="bold">Ngày về</Typography>
                                                    <Typography fontWeight="bold">Điểm đi</Typography>
                                                    <Typography fontWeight="bold">Điểm đến</Typography>
                                                    <Typography fontWeight="bold">Slot</Typography>
                                                    <Typography fontWeight="bold">Hình ảnh</Typography>

                                                </div>
                                                <div style={{ width: "50%" }}>

                                                    <Typography sx={{ display: "flex", justifyContent: "space-between" }}>{travel.ID}
                                                        <IconButton sx={{ color: "#0085DB" }}>
                                                            <Edit />
                                                        </IconButton>
                                                    </Typography>
                                                    <Typography>{truncateText(travel.title, 18)}</Typography>
                                                    <Typography>{travel.date_start}</Typography>
                                                    <Typography>{travel.date_end}</Typography>
                                                    <Typography>{travel.diemDi}</Typography>
                                                    <Typography>{travel.diemDen}</Typography>
                                                    <Typography>{travel.slot}</Typography>
                                                    <Typography>
                                                        <img src={travel.imgSrc} alt="" style={{ height: 30 }} />
                                                    </Typography>

                                                </div>
                                            </div>}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>Không có dữ liệu</div>
                        )}
                        <Box display="flex" justifyContent="center" mt={3}>
                            <Pagination
                                count={totalPageCount}
                                shape="rounded"
                                variant="outlined"
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </Box>
                    </div>
                }
                <TourOption open={isOpen} closeForm={closeOption} />
                <ViewDetails open={isOpenV} closeForm={closeView} travel={travel} />
            </div>

        </div >
    );
};

export default Tour;
