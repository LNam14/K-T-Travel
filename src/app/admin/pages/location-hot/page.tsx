"use client"

import { useAppDispatch, useAppSelector } from "@/app/redux-store/hook";
import { createLocationHotAsync, deleteLocationHotAsync, getLocationHotAsync, getLocationHotList } from "@/app/redux-store/location-hot/slice";
import { SingleImageDropzone } from "@/component/single-image";
import { useEdgeStore } from "@/lib/edgestore";
import { Box, Button, IconButton, Pagination, Tab, Tabs, useMediaQuery } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from "react";
import { getLocationAsync, getLocationList } from "@/app/redux-store/location/slice";
interface LocationItem {
    id: number;
    name: string;
    tour_option: string;
    image_url: string;
}
interface LooseObject {
    [key: string]: any;
}

const LocationHot = () => {
    const dispatch = useAppDispatch();
    const locationL: LocationItem[] = useAppSelector(getLocationList);
    const locationList: LocationItem[] = useAppSelector(getLocationHotList);
    const [locationListState, setLocationListState] = useState<LocationItem[]>([]);
    const [locationTN, setLocationTN] = useState<LocationItem[]>([]);
    const [locationNN, setLocationNN] = useState<LocationItem[]>([]);
    useEffect(() => {
        const asyncCall = async () => {
            await dispatch(getLocationHotAsync())
            await dispatch(getLocationAsync())
        }
        asyncCall()
    }, [])


    useEffect(() => {
        if (Array.isArray(locationList)) {
            const tourInTN = locationList.filter(location => location.tour_option === "Trong Nước");
            setLocationTN(tourInTN);
            const tourInNN = locationList.filter(location => location.tour_option === "Nước Ngoài");
            setLocationNN(tourInNN);
        } else {
            console.error("locationList is not an array", locationList);
        }
    }, [locationList]);

    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
    const [file, setFile] = useState<File>();
    const [progress, setProgress] = useState<
        'PENDING' | 'COMPLETE' | 'ERROR' | number
    >('PENDING');
    const [uploadRes, setUploadRes] = useState<{
        url: string;
        filename: string;
    }>();
    const { edgestore } = useEdgeStore();

    const handleSelect = (tour_option: string) => {
        const location = locationL.filter((location) => {
            return location.tour_option == tour_option
        })
        setLocationListState(location)
        setData(prevData => ({
            ...prevData,
            tour_option: tour_option
        }))
    }
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageNN, setCurrentPageNN] = useState(1);
    const itemsPerPage = 5;
    const newsListArray = Array.isArray(locationTN) ? locationTN : [];
    const totalPageCount = Math.ceil(newsListArray.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentNewsList = newsListArray.slice(startIndex, endIndex);


    const itemsPerPageNN = 5;
    const newsListArrayNN = Array.isArray(locationNN) ? locationNN : [];
    const totalPageCountNN = Math.ceil(newsListArrayNN.length / itemsPerPageNN);
    const startIndexNN = (currentPage - 1) * itemsPerPageNN;
    const endIndexNN = startIndexNN + itemsPerPageNN;
    const currentNewsListNN = newsListArrayNN.slice(startIndexNN, endIndexNN);
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        setCurrentPage(page);
    };
    const handlePageChangeNN = (
        event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        setCurrentPageNN(page);
    };
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (event: any, newIndex: any) => {
        setTabIndex(newIndex);
    };
    const renderTable = (list: LocationItem[]) => (
        <table style={{
            width: "98%",
            fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
            borderCollapse: "collapse",
            overflowY: "auto",
            display: "block",
            tableLayout: "fixed",
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 30,
            paddingBottom: 40,
            marginLeft: 10,
            marginTop: 10,
            borderRadius: 10,
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
        }}>
            <thead style={{ borderBottom: "1px solid #e3e3e3" }}>
                <tr>
                    <th style={{ width: 250, textAlign: "start" }}>ID</th>
                    <th style={{ width: 250, textAlign: "start" }}>Địa điểm</th>
                    <th style={{ width: 250, textAlign: "start" }}>Loại Tour</th>
                    <th style={{ width: 250, textAlign: "start" }}>Hình ảnh</th>
                    <th style={{ width: 250, textAlign: "start" }}>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item: LocationItem, index: number) => (
                    <tr key={index}>
                        <td style={{ width: 250, textAlign: "start" }}>{item.id}</td>
                        <td style={{ width: 250, textAlign: "start" }}>{item.name}</td>
                        <td style={{ width: 250, textAlign: "start" }}>{item.tour_option}</td>
                        <td style={{ width: 250, textAlign: "start" }}>
                            <img style={{ width: 120, height: 60 }} src={item.image_url} alt={item.name} />
                        </td>
                        <td style={{ display: "flex", marginLeft: 5 }}>
                            <IconButton sx={{ color: "#0085DB" }} onClick={() => handleDelete(item.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </td>
                    </tr>
                ))}
            </tbody>
            <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                    count={tabIndex === 0 ? totalPageCount : totalPageCountNN}
                    shape="rounded"
                    variant="outlined"
                    page={tabIndex === 0 ? currentPage : currentPageNN}
                    onChange={tabIndex === 0 ? handlePageChange : handlePageChangeNN}
                />
            </Box>
        </table>
    );
    const [data, setData] = useState<LooseObject>({
        tour_option: "",
        image_url: "",
        name: ""
    });
    const handleSave = async () => {
        await dispatch(createLocationHotAsync({ data }));
        await dispatch(getLocationHotAsync())
        setFile(undefined);
        setProgress('PENDING');
        setData({
            ...data,
            tour_option: "",
            name: "",
            image_url: "",
        })
        const selectElement = document.querySelector('select');
        if (selectElement) {
            selectElement.value = "";
        }
        handleSelect("")
    }

    const handleDelete = async (id: number) => {
        await dispatch(deleteLocationHotAsync(id))
        await dispatch(getLocationHotAsync())
    }

    return (
        <div style={{
            marginTop: lgUp ? 30 : 10, display: "flex", flexDirection: lgUp ? "row" : "column",
            height: 570,
            overflow: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0, 0, 0, 0.1) transparent",
            fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
        }} >
            <div style={{
                width: lgUp ? "40%" : "100%", backgroundColor: "white",
                borderTopLeftRadius: 10, borderTopRightRadius: lgUp ? 0 : 10, borderBottomLeftRadius: 10, borderBottomRightRadius: lgUp ? 0 : 10,
                borderRight: "1px solid #e3e3e3"
            }}>
                <div style={{
                    display: "flex", borderTopLeftRadius: 10, height: 50,
                    fontSize: 20, fontWeight: "bold", justifyContent: "center", paddingTop: 20, backgroundColor: "#4287f5"
                }}>
                    Thêm Địa Điểm Nổi Bật
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    paddingTop: 20,
                    flexWrap: "wrap"
                }}>
                    <div style={{ display: "flex", width: "90%", flexDirection: "column" }}>
                        Chọn Tour
                        <select onChange={(e) => {
                            handleSelect(e.target.value)
                        }} style={{ border: "1px solid #dbdbdb" }}>
                            <option value="">Chọn loại Tour</option>
                            <option value="Trong Nước">Tour Trong Nước</option>
                            <option value="Nước Ngoài">Tour Nước Ngoài</option>
                        </select>
                    </div>
                    <div style={{ display: "flex", width: "90%", flexDirection: "column" }}>
                        Chọn địa điểm
                        <select
                            onChange={(e) => {
                                setData(prevData => ({
                                    ...prevData,
                                    name: e.target.value
                                }))
                            }}
                            value={data.name || ""}
                            style={{ border: "1px solid #dbdbdb" }}>
                            <option>Chọn địa điểm</option>
                            {locationListState.map((item, index) => (
                                <option key={index}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                </div>
                <div style={{ display: "flex", flexDirection: "column", marginTop: 50, textAlign: "center", marginLeft: 10, marginRight: 10, }}>
                    {/* <SingleImageDropzone
                        height={150}
                        width="100%"
                        value={file}
                        onChange={setFile}
                        disabled={progress !== 'PENDING'}
                        dropzoneOptions={{
                            maxSize: 1024 * 1024 * 1,
                        }}
                    /> */}
                    <Button
                        variant="contained"
                        className="mt-2"
                        onClick={async () => {
                            if (file) {
                                try {
                                    const res = await edgestore.publicFiles.upload({
                                        file,
                                        onProgressChange: async (newProgress) => {
                                            setProgress(newProgress);
                                            if (newProgress === 100) {
                                                await new Promise((resolve) => setTimeout(resolve, 1000));
                                                setProgress('COMPLETE');
                                            }
                                        },
                                    });
                                    setUploadRes({
                                        url: res.url,
                                        filename: file.name,
                                    });
                                    setData(prevData => ({
                                        ...prevData,
                                        image_url: res.url
                                    }))
                                } catch (err) {
                                    setProgress('ERROR');
                                }
                            }
                        }}
                        disabled={!file || progress !== 'PENDING'}
                    >
                        {progress === 'PENDING'
                            ? 'Upload'
                            : progress === 'COMPLETE'
                                ? 'Done'
                                : typeof progress === 'number'
                                    ? `Uploading (${Math.round(progress)}%)`
                                    : 'Error'}
                    </Button>
                    {progress === "COMPLETE" ? <div style={{ display: "flex", justifyContent: "space-around", marginTop: 20 }}>
                        <Button variant="contained" sx={{ width: 150 }} onClick={handleSave}>Thêm mới</Button>
                        <Button variant="contained" sx={{ width: 150 }} onClick={() => {
                            setFile(undefined);
                            setProgress('PENDING');
                            setData({
                                ...data,
                                tour_option: "",
                                name: "",
                                image_url: "",
                            })
                            const selectElement = document.querySelector('select');
                            if (selectElement) {
                                selectElement.value = "";
                            }
                            handleSelect("")
                        }}>Hủy</Button>

                    </div> : null}
                </div>
            </div>


            <div style={{
                backgroundColor: "white",
                width: lgUp ? "80%" : "100%",
                marginTop: lgUp ? 0 : 10,
                borderTopLeftRadius: lgUp ? 0 : 10,
                borderTopRightRadius: 10,
            }}>
                <div style={{
                    borderBottom: "1px solid #e3e3e3",
                    paddingTop: lgUp ? 20 : 5,
                    paddingBottom: lgUp ? 20 : 5,
                    paddingLeft: 20,
                }}>
                    <span style={{
                        fontSize: 20,
                        fontFamily: "__Plus_Jakarta_Sans_ff1394, __Plus_Jakarta_Sans_Fallback_ff1394, Helvetica, Arial, sans-serif",
                        fontWeight: "bold"
                    }}>Danh sách điểm đến</span>
                </div>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="destination tabs">
                    <Tab label="Trong Nước" />
                    <Tab label="Nước Ngoài" />
                </Tabs>
                <Box hidden={tabIndex !== 0}>
                    {renderTable(currentNewsList)}
                </Box>
                <Box hidden={tabIndex !== 1}>
                    {renderTable(currentNewsListNN)}
                </Box>
            </div>
        </div >
    );

};

export default LocationHot;
